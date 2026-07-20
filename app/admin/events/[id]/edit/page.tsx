import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateEvent } from '../../actions';
import EventForm from '../../EventForm';

export const metadata = {
  title: 'Edit Event',
};

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from('events').select('*').eq('id', id).single();

  if (!event) notFound();

  const updateEventForId = updateEvent.bind(null, id);

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Edit Event</p>
      <EventForm action={updateEventForId} event={event} submitLabel="Save Changes" />
    </div>
  );
}
