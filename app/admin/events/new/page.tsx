import { createEvent } from '../actions';
import EventForm from '../EventForm';

export const metadata = {
  title: 'New Event',
};

export default function NewEventPage() {
  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">New Event</p>
      <EventForm action={createEvent} submitLabel="Create Event" />
    </div>
  );
}
