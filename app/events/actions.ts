'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function registerForEvent(eventId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to register for an event.' };
  }

  const { error } = await supabase.from('event_registrations').insert({
    event_id: eventId,
    user_id: user.id,
  });

  if (error) {
    if (error.code === '23505') {
      return { error: 'You are already registered for this event.' };
    }
    return { error: 'Could not register for this event. Try again.' };
  }

  // activity_logs has no client-facing insert policy — write via the
  // service-role client, per the "server actions/service role only" rule.
  const admin = createAdminClient();
  await admin.from('activity_logs').insert({
    user_id: user.id,
    action: 'event_registration',
    event_id: eventId,
  });

  revalidatePath('/events');
  revalidatePath('/dashboard');

  return {};
}
