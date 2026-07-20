import { createClient } from '@/lib/supabase/server';
import type { Event, EventRegistration, Profile } from '@/types/database';

export const metadata = {
  title: 'All Registrations',
};

type RegistrationRow = EventRegistration & { events: Event | null; profiles: Profile | null };

export default async function AdminRegistrationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('event_registrations')
    .select('*, events(*), profiles(*)')
    .order('registered_at', { ascending: false });

  const registrations = (data ?? []) as unknown as RegistrationRow[];

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">All Registrations</p>
      {registrations.length === 0 ? (
        <p className="hd-app-empty">No registrations yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="hd-app-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Person</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.events?.title ?? '—'}</td>
                  <td>{reg.profiles?.full_name ?? reg.user_id}</td>
                  <td>{reg.profiles?.role ?? '—'}</td>
                  <td>
                    <span className={`hd-app-status hd-app-status--${reg.status}`}>{reg.status}</span>
                  </td>
                  <td>{new Date(reg.registered_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
