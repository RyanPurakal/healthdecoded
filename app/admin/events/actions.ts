'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type EventFormState = { error?: string } | null;

export async function createEvent(_prev: EventFormState, formData: FormData): Promise<EventFormState> {
  const supabase = await createClient();

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const eventDate = String(formData.get('event_date') ?? '');
  const location = String(formData.get('location') ?? '').trim();

  if (!title || !eventDate) {
    return { error: 'Title and date & time are required.' };
  }

  const { error } = await supabase.from('events').insert({
    title,
    description: description || null,
    event_date: new Date(eventDate).toISOString(),
    location: location || null,
  });

  if (error) {
    return { error: 'Could not create the event. Please try again.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function updateEvent(
  eventId: string,
  _prev: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const supabase = await createClient();

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const eventDate = String(formData.get('event_date') ?? '');
  const location = String(formData.get('location') ?? '').trim();

  if (!title || !eventDate) {
    return { error: 'Title and date & time are required.' };
  }

  const { error } = await supabase
    .from('events')
    .update({
      title,
      description: description || null,
      event_date: new Date(eventDate).toISOString(),
      location: location || null,
    })
    .eq('id', eventId);

  if (error) {
    return { error: 'Could not save changes. Please try again.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function deleteEvent(eventId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('events').delete().eq('id', eventId);

  if (error) {
    return { error: 'Could not delete the event.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/events');
  return {};
}
