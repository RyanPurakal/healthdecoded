'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function completeDeletionRequest(requestId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in.' };
  }

  const { data: callerProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (callerProfile?.role !== 'admin') {
    return { error: 'Only admins can do this.' };
  }

  // This only flips a status flag — it does not delete any auth.users or
  // profiles data. Actual data removal is a manual Supabase dashboard step.
  const { error } = await supabase
    .from('deletion_requests')
    .update({ status: 'completed' })
    .eq('id', requestId);

  if (error) {
    return { error: 'Could not update request.' };
  }

  revalidatePath('/admin/deletion-requests');
  return {};
}
