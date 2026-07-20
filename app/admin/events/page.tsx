import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deleteEvent } from './actions';

export const metadata = {
  title: 'Manage Events',
};

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('*').order('event_date', { ascending: false });

  return (
    <div className="hd-app-card">
      <div className="hd-app-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
        <p className="hd-app-card-title" style={{ marginBottom: 0 }}>All Events</p>
        <Link href="/admin/events/new" className="ct-btn ct-btn-filled">
          New Event
        </Link>
      </div>

      {!events || events.length === 0 ? (
        <p className="hd-app-empty">No events yet.</p>
      ) : (
        events.map((event) => {
          const deleteEventForId = deleteEvent.bind(null, event.id);
          return (
            <div className="hd-app-row" key={event.id}>
              <div>
                <div className="hd-app-row-title">{event.title}</div>
                <div className="hd-app-row-meta">
                  {new Date(event.event_date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                  {event.location ? ` · ${event.location}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Link href={`/admin/events/${event.id}/edit`} className="hd-app-row-meta">
                  Edit
                </Link>
                <form action={deleteEventForId}>
                  <button type="submit" className="hd-app-row-meta" style={{ color: '#c53030', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
