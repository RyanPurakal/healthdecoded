// Opt-in XP leaderboard. Only profiles with show_on_leaderboard = true appear.
// Read through the service-role client selecting ONLY first name + avatar + XP —
// profiles RLS otherwise limits a user to their own row, and we deliberately
// avoid exposing any other profile fields for what is a youth-facing list.
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const metadata = {
  title: 'Leaderboard',
};

function firstName(fullName: string | null) {
  return fullName?.trim().split(/\s+/)[0] || 'Anonymous';
}

function initial(fullName: string | null) {
  return firstName(fullName).charAt(0).toUpperCase();
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admin = createAdminClient();
  const { data: entries } = await admin
    .from('profiles')
    .select('id, full_name, avatar_url, total_xp')
    .eq('show_on_leaderboard', true)
    .order('total_xp', { ascending: false })
    .limit(100);

  const list = entries ?? [];

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Learn &amp; Earn</p>
        <h1 className="hd-app-heading">Leaderboard</h1>
        <p className="hd-app-subtitle">
          Top XP among members who opted in. Turn on visibility from your profile to join.
        </p>

        <div className="hd-app-card">
          {list.length === 0 ? (
            <p className="hd-app-empty">No one has opted in yet. Be the first!</p>
          ) : (
            list.map((entry, index) => (
              <div
                className="hd-app-row"
                key={entry.id}
                style={entry.id === user?.id ? { background: '#f6f6f4' } : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="hd-app-row-meta" style={{ width: 24, textAlign: 'right' }}>
                    {index + 1}
                  </span>
                  {entry.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={entry.avatar_url} alt="" className="hd-avatar" />
                  ) : (
                    <div className="hd-avatar hd-avatar--placeholder">{initial(entry.full_name)}</div>
                  )}
                  <span className="hd-app-row-title">
                    {firstName(entry.full_name)}
                    {entry.id === user?.id ? ' (you)' : ''}
                  </span>
                </div>
                <span className="hd-app-row-meta">{entry.total_xp} XP</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
