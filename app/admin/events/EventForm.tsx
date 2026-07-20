import type { Event } from '@/types/database';

function toLocalInputValue(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventForm({
  action,
  event,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  event?: Event;
  submitLabel: string;
}) {
  return (
    <form action={action} className="ct-form">
      <div className="ct-field-group">
        <label htmlFor="title" className="ct-label">Title</label>
        <input id="title" name="title" required defaultValue={event?.title} className="ct-input" />
      </div>
      <div className="ct-row-two">
        <div className="ct-field-group">
          <label htmlFor="event_date" className="ct-label">Date &amp; Time</label>
          <input
            id="event_date"
            name="event_date"
            type="datetime-local"
            required
            defaultValue={toLocalInputValue(event?.event_date)}
            className="ct-input"
          />
        </div>
        <div className="ct-field-group">
          <label htmlFor="location" className="ct-label">Location</label>
          <input id="location" name="location" defaultValue={event?.location ?? ''} className="ct-input" />
        </div>
      </div>
      <div className="ct-field-group">
        <label htmlFor="description" className="ct-label">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={event?.description ?? ''}
          className="ct-input hd-app-textarea"
        />
      </div>
      <button type="submit" className="ct-btn ct-btn-filled">
        {submitLabel}
      </button>
    </form>
  );
}
