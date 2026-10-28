// Events page: upcoming DB events with sign-up, plus a scrollable row of past events.
import { createClient } from '@/lib/supabase/server';
import EventSignupButton from './EventSignupButton';
import PastEventsScroller from '@/components/PastEventsScroller';
import { PAST_EVENTS } from '@/lib/past-events';

export const metadata = {
  title: 'Events',
};

export default async function EventsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const now = new Date().toISOString();

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', now)
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
        <h1 className="hd-app-heading">Events</h1>
        <p className="hd-app-subtitle">Sign up for upcoming workshops and volunteer opportunities.</p>

        {/* Upcoming Events */}
        <div className="hd-app-card">
          {!upcomingEvents || upcomingEvents.length === 0 ? (
            <p className="hd-app-empty">No upcoming events right now — check back soon.</p>
          ) : (
            upcomingEvents.map((event) => (
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

        {/* Past Events */}
        <section className="past-events-section">
          <div className="past-events-section__header">
            <div>
              <h2 className="hd-app-heading">Past Events</h2>
              <p className="hd-app-subtitle">
                Highlights and recaps from our workshops, community events, and outreach sessions.
              </p>
            </div>
          </div>
          <PastEventsScroller events={PAST_EVENTS} />
        </section>
      </div>
    </div>
  );
}
