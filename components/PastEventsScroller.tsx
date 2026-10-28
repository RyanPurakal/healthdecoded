// Two-column grid of past event cards inside a vertically scrollable panel.

import type { PastEvent } from '@/lib/past-events';

export default function PastEventsScroller({ events }: { events: PastEvent[] }) {
  return (
    <div className="past-events" tabIndex={0} aria-label="Past events">
      <div className="past-events__grid">
        {events.map((e) => (
          <article className="past-event-card" key={e.id}>
            <div className="past-event-card__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt={e.title} loading="lazy" />
            </div>
            <div className="past-event-card__body">
              <p className="past-event-card__date">{e.date}</p>
              <h3 className="past-event-card__title">{e.title}</h3>
              {e.host && <p className="past-event-card__host">{e.host}</p>}
              <p className="past-event-card__desc">{e.description}</p>
              <a className="past-event-card__link" href={e.instagramUrl} target="_blank" rel="noopener noreferrer">
                View post →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
