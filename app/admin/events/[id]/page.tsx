// Per-event check-in: list registrants and mark them attended.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { EventRegistration, Profile } from '@/types/database';
import AttendButton from './AttendButton';

export const metadata = {
  title: 'Event Check-in',
};

type RegistrationRow = EventRegistration & { profiles: Profile | null };

export default async function EventCheckinPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase.from('events').select('*').eq('id', id).single();
  if (!event) notFound();

  const { data } = await supabase
    .from('event_registrations')
    .select('*, profiles(*)')
    .eq('event_id', id)
    .order('registered_at', { ascending: true });

  const registrations = (data ?? []) as unknown as RegistrationRow[];

  const admin = createAdminClient();
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map(usersPage?.users.map((u) => [u.id, u.email ?? '—']) ?? []);

  return (
    <div className="hd-app-card">
      <div className="hd-app-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
        <div>
          <p className="hd-app-card-title" style={{ marginBottom: 4 }}>{event.title}</p>
          <p className="hd-app-row-meta">
            {new Date(event.event_date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>
        <Link href="/admin/events" className="hd-app-row-meta">← All events</Link>
      </div>

      {registrations.length === 0 ? (
        <p className="hd-app-empty">No one has registered for this event yet.</p>
      ) : (
        registrations.map((reg) => (
          <div className="hd-app-row" key={reg.id}>
            <div>
              <div className="hd-app-row-title">{reg.profiles?.full_name || 'Unnamed'}</div>
              <div className="hd-app-row-meta">{emailById.get(reg.user_id) ?? '—'}</div>
            </div>
            {reg.status === 'registered' ? (
              <AttendButton registrationId={reg.id} />
            ) : (
              <span className={`hd-app-status hd-app-status--${reg.status}`}>{reg.status}</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
