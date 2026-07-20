// Dashboard: signed-in user's profile, event registrations, and activity log.
// Access is gated by middleware.ts (redirects to /login if unauthenticated).
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import type { Event, EventRegistration, ActivityLog } from '@/types/database';

export const metadata = {
  title: 'Dashboard',
};

type RegistrationWithEvent = EventRegistration & { events: Event | null };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: profile, error: profileError }, { data: registrations }, { data: activity }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('event_registrations')
      .select('*, events(*)')
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false }),
    supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  // TEMP DIAGNOSTIC — remove once the role bug is confirmed fixed.
  console.log('[dashboard role display]', {
    userId: user.id,
    email: user.email,
    profile,
    profileError,
  });

  const typedRegistrations = (registrations ?? []) as unknown as RegistrationWithEvent[];
  const typedActivity = (activity ?? []) as ActivityLog[];

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Dashboard</p>
        <h1 className="hd-app-heading">
          {profile?.full_name ? `Welcome, ${profile.full_name}` : 'Welcome'}
        </h1>
        <p className="hd-app-subtitle">{user.email}</p>

        <div className="hd-app-card">
          <p className="hd-app-card-title">Profile</p>
          <div className="hd-app-row">
            <span className="hd-app-row-title">Role</span>
            <span className="hd-app-status hd-app-status--admin">{profile?.role ?? '—'}</span>
          </div>
          <div className="hd-app-row">
            <span className="hd-app-row-title">School / Organization</span>
            <span className="hd-app-row-meta">{profile?.school_or_org ?? 'Not set'}</span>
          </div>
          {profile?.role === 'admin' && (
            <div className="hd-app-row">
              <span className="hd-app-row-title">Admin tools</span>
              <Link href="/admin" className="hd-app-row-meta">Go to /admin →</Link>
            </div>
          )}
        </div>

        <div className="hd-app-card">
          <p className="hd-app-card-title">Your Event Registrations</p>
          {typedRegistrations.length === 0 ? (
            <p className="hd-app-empty">
              You haven&apos;t registered for any events yet. <Link href="/events">Browse events →</Link>
            </p>
          ) : (
            typedRegistrations.map((reg) => (
              <div className="hd-app-row" key={reg.id}>
                <div>
                  <div className="hd-app-row-title">{reg.events?.title ?? 'Untitled event'}</div>
                  <div className="hd-app-row-meta">
                    {reg.events?.event_date
                      ? new Date(reg.events.event_date).toLocaleDateString(undefined, {
                          dateStyle: 'medium',
                        })
                      : ''}
                  </div>
                </div>
                <span className={`hd-app-status hd-app-status--${reg.status}`}>{reg.status}</span>
              </div>
            ))
          )}
        </div>

        <div className="hd-app-card">
          <p className="hd-app-card-title">Your Activity Log</p>
          {typedActivity.length === 0 ? (
            <p className="hd-app-empty">No activity recorded yet.</p>
          ) : (
            typedActivity.map((log) => (
              <div className="hd-app-row" key={log.id}>
                <div className="hd-app-row-title">{log.action}</div>
                <div className="hd-app-row-meta">
                  {new Date(log.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
            ))
          )}
        </div>

        <form action={signOut} style={{ marginTop: 24 }}>
          <button type="submit" className="ct-btn ct-btn-outline">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
