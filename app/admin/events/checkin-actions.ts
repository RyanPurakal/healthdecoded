'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// events has no duration/end-time field, so attendance can't derive real
// hours from the event. Default each attended event to this many hours; an
// admin can reject/adjust in the verification queue. If a duration field is
// added to events later, use it here instead of this constant.
const DEFAULT_EVENT_HOURS = 2;

export async function markAttended(registrationId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in.' };
  }

  // Re-derive the caller's role server-side — never trust the client.
  const { data: callerProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (callerProfile?.role !== 'admin') {
    return { error: 'Only admins can check in registrants.' };
  }

  const { data: registration, error: fetchError } = await supabase
    .from('event_registrations')
    .select('id, user_id, event_id, status')
    .eq('id', registrationId)
    .single();

  if (fetchError || !registration) {
    return { error: 'Registration not found.' };
  }

  const { error: updateError } = await supabase
    .from('event_registrations')
    .update({ status: 'attended' })
    .eq('id', registrationId);

  if (updateError) {
    return { error: 'Could not update attendance.' };
  }

  // Auto-create a pending service_hours row for the attendee. This inserts a
  // row for another user, which the "insert your own" RLS policy forbids —
  // so it goes through the service-role client, which bypasses RLS. Guard
  // against duplicates if attendance is marked more than once.
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from('service_hours')
    .select('id')
    .eq('user_id', registration.user_id)
    .eq('event_id', registration.event_id)
    .maybeSingle();

  if (!existing) {
    await admin.from('service_hours').insert({
      user_id: registration.user_id,
      event_id: registration.event_id,
      hours: DEFAULT_EVENT_HOURS,
      description: 'Event attendance',
      status: 'pending',
    });
  }

  revalidatePath(`/admin/events/${registration.event_id}`);
  revalidatePath('/admin/service-hours');
  return {};
}
