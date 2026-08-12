'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Badge, QuizContent } from '@/types/database';
import { gradeQuiz, type QuestionResult } from './quiz';

/**
 * Shared completion tail: record the completion, add XP, and award any newly
 * earned badges — all on the service-role client so it doesn't depend on the
 * caller being able to write these tables (activity_completions and user_badges
 * have no client-facing insert policy, and total_xp is service_role-only).
 *
 * Idempotent: if the user already completed this activity it's a no-op and
 * returns alreadyCompleted, so XP is never double-counted. The unique
 * (user_id, activity_id) constraint backs this at the DB level too.
 */
async function recordCompletion(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  activity: { id: string; xp_value: number },
  score: number | null
): Promise<{ alreadyCompleted: boolean; error?: string }> {
  const { data: existing } = await admin
    .from('activity_completions')
    .select('id')
    .eq('user_id', userId)
    .eq('activity_id', activity.id)
    .maybeSingle();

  if (existing) {
    return { alreadyCompleted: true };
  }

  const { error: insertError } = await admin.from('activity_completions').insert({
    user_id: userId,
    activity_id: activity.id,
    score,
  });

  if (insertError) {
    return { alreadyCompleted: false, error: 'Could not record your progress. Please try again.' };
  }

  // Bump total_xp. Read-modify-write is fine — completions are low-volume and
  // single-user, so there's no realistic contention.
  const { data: profile } = await admin
    .from('profiles')
    .select('total_xp')
    .eq('id', userId)
    .single();

  const newTotalXp = (profile?.total_xp ?? 0) + (activity.xp_value ?? 0);
  await admin.from('profiles').update({ total_xp: newTotalXp }).eq('id', userId);

  await awardBadges(admin, userId, newTotalXp);

  return { alreadyCompleted: false };
}

/**
 * Mark a non-scored activity (lesson / interactive) complete for the current
 * user. Real "did they actually do it" verification is deferred; scored quizzes
 * go through submitQuiz instead.
 */
export async function completeActivity(activityId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to complete an activity.' };
  }

  const { data: activity } = await supabase
    .from('game_activities')
    .select('id, xp_value, is_published, type')
    .eq('id', activityId)
    .single();

  if (!activity || !activity.is_published) {
    return { error: 'That activity is not available.' };
  }

  // Quizzes must be graded, not click-completed.
  if (activity.type === 'quiz') {
    return { error: 'This is a quiz — complete it by answering the questions.' };
  }

  const admin = createAdminClient();
  const { error } = await recordCompletion(admin, user.id, activity, null);
  if (error) return { error };

  revalidatePath('/activities');
  revalidatePath('/leaderboard');
  revalidatePath('/profile');
  return {};
}

export type SubmitQuizResult = {
  error?: string;
  total?: number;
  correct?: number;
  score?: number; // 0..1
  passed?: boolean;
  awardedXp?: number;
  alreadyCompleted?: boolean;
  results?: QuestionResult[];
};

/**
 * Grade a quiz submission SERVER-SIDE and award XP only on a genuine pass. The
 * answer key never leaves the server — the quiz page sends the browser only
 * prompts + options, and grading happens here against the stored content. XP +
 * completion are recorded only when score >= pass_threshold, so a click or a
 * failing guess earns nothing; the user can retry until they pass.
 */
export async function submitQuiz(
  activityId: string,
  answers: Record<string, number>
): Promise<SubmitQuizResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to take a quiz.' };
  }

  const { data: activity } = await supabase
    .from('game_activities')
    .select('id, xp_value, is_published, type, content')
    .eq('id', activityId)
    .single();

  if (!activity || !activity.is_published || activity.type !== 'quiz') {
    return { error: 'That quiz is not available.' };
  }

  const content = activity.content as QuizContent | null;
  if (!content || !Array.isArray(content.questions) || content.questions.length === 0) {
    return { error: 'This quiz has no questions yet.' };
  }

  const graded = gradeQuiz(content, answers ?? {});

  let awardedXp = 0;
  let alreadyCompleted = false;

  if (graded.passed) {
    const admin = createAdminClient();
    const outcome = await recordCompletion(admin, user.id, activity, Math.round(graded.score * 100));
    if (outcome.error) return { error: outcome.error };
    alreadyCompleted = outcome.alreadyCompleted;
    awardedXp = outcome.alreadyCompleted ? 0 : activity.xp_value;

    revalidatePath('/activities');
    revalidatePath('/leaderboard');
    revalidatePath('/profile');
  }

  return {
    total: graded.total,
    correct: graded.correct,
    score: graded.score,
    passed: graded.passed,
    awardedXp,
    alreadyCompleted,
    results: graded.results,
  };
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

  await admin.from('user_badges').upsert(toAward, { onConflict: 'user_id,badge_id', ignoreDuplicates: true });
}
