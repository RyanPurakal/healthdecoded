// Admin: service-hour verification queue. Shows pending entries with
// approve/reject, plus recently reviewed entries for reference.
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ServiceHour, Profile, Event } from '@/types/database';
import ReviewButtons from './ReviewButtons';

export const metadata = {
  title: 'Service Hours',
};

type ServiceHourRow = ServiceHour & { profiles: Profile | null; events: Event | null };

export default async function AdminServiceHoursPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('service_hours')
    .select('*, profiles(*), events(*)')
    .order('submitted_at', { ascending: false });

  const entries = (data ?? []) as unknown as ServiceHourRow[];
  const pending = entries.filter((e) => e.status === 'pending');
  const reviewed = entries.filter((e) => e.status !== 'pending');

  const admin = createAdminClient();
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map(usersPage?.users.map((u) => [u.id, u.email ?? '—']) ?? []);

  function personLabel(entry: ServiceHourRow) {
    return entry.profiles?.full_name || emailById.get(entry.user_id) || entry.user_id;
  }

  return (
    <>
      <div className="hd-app-card">
        <p className="hd-app-card-title">Pending Verification</p>
        {pending.length === 0 ? (
          <p className="hd-app-empty">No pending service-hour entries.</p>
        ) : (
          pending.map((entry) => (
            <div className="hd-app-row" key={entry.id}>
              <div>
                <div className="hd-app-row-title">
                  {personLabel(entry)} — {Number(entry.hours)} hrs
                </div>
                <div className="hd-app-row-meta">
                  {entry.events?.title ?? entry.description ?? 'Manual entry'}
                  {' · '}
                  {new Date(entry.submitted_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </div>
              </div>
              <ReviewButtons entryId={entry.id} />
            </div>
          ))
        )}
      </div>

      {reviewed.length > 0 && (
        <div className="hd-app-card">
          <p className="hd-app-card-title">Reviewed</p>
          {reviewed.map((entry) => (
            <div className="hd-app-row" key={entry.id}>
              <div>
                <div className="hd-app-row-title">
                  {personLabel(entry)} — {Number(entry.hours)} hrs
                </div>
                <div className="hd-app-row-meta">
                  {entry.events?.title ?? entry.description ?? 'Manual entry'}
                </div>
              </div>
              <span className={`hd-app-status hd-app-status--${entry.status === 'verified' ? 'attended' : 'cancelled'}`}>
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
