'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const eventDate = String(formData.get('event_date') ?? '');
  const location = String(formData.get('location') ?? '').trim();

  if (!title || !eventDate) return;

  await supabase.from('events').insert({
    title,
    description: description || null,
    event_date: new Date(eventDate).toISOString(),
    location: location || null,
  });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function updateEvent(eventId: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const eventDate = String(formData.get('event_date') ?? '');
  const location = String(formData.get('location') ?? '').trim();

  if (!title || !eventDate) return;

  await supabase
    .from('events')
    .update({
      title,
      description: description || null,
      event_date: new Date(eventDate).toISOString(),
      location: location || null,
    })
    .eq('id', eventId);

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();
  await supabase.from('events').delete().eq('id', eventId);
  revalidatePath('/admin/events');
  revalidatePath('/events');
}
