// Learning activities: published game_activities with per-user completion state.
// Public to browse; completing one requires sign-in (enforced in the action).
import { createClient } from '@/lib/supabase/server';
import type { GameActivity } from '@/types/database';
import ActivityRow from './ActivityRow';

export const metadata = {
  title: 'Activities',
};

export default async function ActivitiesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // RLS restricts this select to published rows for non-admins.
  const { data: activities } = await supabase
    .from('game_activities')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  let completedIds = new Set<string>();
  if (user) {
    const { data: completions } = await supabase
      .from('activity_completions')
      .select('activity_id')
      .eq('user_id', user.id);
    completedIds = new Set((completions ?? []).map((c) => c.activity_id));
  }

  const list = (activities ?? []) as GameActivity[];

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Learn &amp; Earn</p>
        <h1 className="hd-app-heading">Activities</h1>
        <p className="hd-app-subtitle">
          Complete lessons and quizzes to earn XP and badges. More interactive games coming soon.
        </p>

        <div className="hd-app-card">
          {list.length === 0 ? (
            <p className="hd-app-empty">No activities published yet — check back soon.</p>
          ) : (
            list.map((activity) => (
              <ActivityRow
                key={activity.id}
                // Never ship `content` (quiz answer keys) to the client — the
                // list only needs metadata; quizzes are graded server-side.
                activity={{ ...activity, content: null }}
                isSignedIn={Boolean(user)}
                completed={completedIds.has(activity.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
