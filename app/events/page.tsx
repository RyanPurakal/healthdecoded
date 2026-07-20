// Upcoming events list with a sign-up button per event.
import { createClient } from '@/lib/supabase/server';
import EventSignupButton from './EventSignupButton';

export const metadata = {
  title: 'Events',
};

export default async function EventsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true });

  let registeredEventIds = new Set<string>();
  if (user) {
    const { data: registrations } = await supabase
      .from('event_registrations')
      .select('event_id')
      .eq('user_id', user.id);
    registeredEventIds = new Set((registrations ?? []).map((r) => r.event_id));
  }

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Get Involved</p>
        <h1 className="hd-app-heading">Upcoming Events</h1>
        <p className="hd-app-subtitle">Sign up for workshops and volunteer opportunities.</p>

        <div className="hd-app-card">
          {!events || events.length === 0 ? (
            <p className="hd-app-empty">No upcoming events right now — check back soon.</p>
          ) : (
            events.map((event) => (
              <div className="hd-app-row" key={event.id}>
                <div>
                  <div className="hd-app-row-title">{event.title}</div>
                  <div className="hd-app-row-meta">
                    {new Date(event.event_date).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                    {event.location ? ` · ${event.location}` : ''}
                  </div>
                  {event.description && (
                    <div className="hd-app-row-meta" style={{ marginTop: 4 }}>
                      {event.description}
                    </div>
                  )}
                </div>
                <EventSignupButton
                  eventId={event.id}
                  isSignedIn={Boolean(user)}
                  isRegistered={registeredEventIds.has(event.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
