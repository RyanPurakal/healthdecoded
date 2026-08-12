'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Badge } from '@/types/database';

/**
 * Mark an activity complete for the current user, then award XP and any newly
 * earned badges. All the mutation happens through the service-role client so
 * the flow doesn't depend on the caller being able to write these tables —
 * activity_completions and user_badges have no client-facing insert policy, and
 * total_xp must never be client-writable directly.
 *
 * Idempotent: a repeat completion of the same activity is a no-op (the unique
 * (user_id, activity_id) constraint also guards this at the DB level), so XP is
 * never double-counted. Real "did they actually do it" verification is deferred
 * to the follow-up interactive pass.
 */
export async function completeActivity(activityId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to complete an activity.' };
  }

  // Read the activity through the caller's client so RLS confirms it exists and
  // is published (unpublished activities aren't selectable by non-admins).
  const { data: activity } = await supabase
    .from('game_activities')
    .select('id, xp_value, is_published')
    .eq('id', activityId)
    .single();

  if (!activity || !activity.is_published) {
    return { error: 'That activity is not available.' };
  }

  const admin = createAdminClient();

  // Already completed? Bail before awarding anything again.
  const { data: existing } = await admin
    .from('activity_completions')
    .select('id')
    .eq('user_id', user.id)
    .eq('activity_id', activityId)
    .maybeSingle();

  if (existing) {
    return {};
  }

  const { error: insertError } = await admin.from('activity_completions').insert({
    user_id: user.id,
    activity_id: activityId,
  });

  if (insertError) {
    return { error: 'Could not record your progress. Please try again.' };
  }

  // Bump total_xp. Read-modify-write is fine here — completions are low-volume
  // and single-user, so there's no realistic contention.
  const { data: profile } = await admin
    .from('profiles')
    .select('total_xp')
    .eq('id', user.id)
    .single();

  const newTotalXp = (profile?.total_xp ?? 0) + (activity.xp_value ?? 0);

  await admin.from('profiles').update({ total_xp: newTotalXp }).eq('id', user.id);

  await awardBadges(admin, user.id, newTotalXp);

  revalidatePath('/activities');
  revalidatePath('/leaderboard');
  revalidatePath('/profile');
  return {};
}

/**
 * Check every badge against the user's current stats and insert any they've
 * newly qualified for. Runs on the service-role client. Insert conflicts on the
 * unique (user_id, badge_id) constraint are ignored, so this is safe to re-run.
 */
async function awardBadges(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  totalXp: number
) {
  const [{ data: badges }, { count: completionCount }, { data: earned }] = await Promise.all([
    admin.from('badges').select('*'),
    admin
      .from('activity_completions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId),
    admin.from('user_badges').select('badge_id').eq('user_id', userId),
  ]);

  if (!badges || badges.length === 0) return;

  const earnedIds = new Set((earned ?? []).map((b) => b.badge_id));
  const completions = completionCount ?? 0;

  const qualifies = (badge: Badge) => {
    if (badge.criteria_type === 'xp_threshold') return totalXp >= badge.criteria_value;
    if (badge.criteria_type === 'activity_count') return completions >= badge.criteria_value;
    return false;
  };

  const toAward = badges
    .filter((badge) => !earnedIds.has(badge.id) && qualifies(badge))
    .map((badge) => ({ user_id: userId, badge_id: badge.id }));

  if (toAward.length === 0) return;

  // onConflict do-nothing guards against a race where the same badge is inserted twice.
  await admin.from('user_badges').upsert(toAward, { onConflict: 'user_id,badge_id', ignoreDuplicates: true });
}
