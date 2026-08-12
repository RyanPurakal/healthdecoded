'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { ServiceHourStatus } from '@/types/database';

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, error: 'You must be signed in.' as const };

  // Re-derive the caller's role server-side — never trust the client.
  const { data: callerProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (callerProfile?.role !== 'admin') {
    return { supabase, user, error: 'Only admins can review service hours.' as const };
  }

  return { supabase, user };
}

async function setStatus(entryId: string, status: Extract<ServiceHourStatus, 'verified' | 'rejected'>) {
  const { supabase, user, error } = await requireAdmin();
  if (error) return { error };

  const { error: updateError } = await supabase
    .from('service_hours')
    .update({
      status,
      verified_by: user!.id,
      verified_at: new Date().toISOString(),
    })
    .eq('id', entryId);

  if (updateError) {
    return { error: 'Could not update this entry.' };
  }

  revalidatePath('/admin/service-hours');
  return {};
}

export async function verifyServiceHours(entryId: string): Promise<{ error?: string }> {
  return setStatus(entryId, 'verified');
}

export async function rejectServiceHours(entryId: string): Promise<{ error?: string }> {
  return setStatus(entryId, 'rejected');
}
