'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { UserRole } from '@/types/database';

const VALID_ROLES: UserRole[] = ['ambassador', 'volunteer', 'admin'];

export async function updateUserRole(userId: string, newRole: string): Promise<{ error?: string }> {
  if (!VALID_ROLES.includes(newRole as UserRole)) {
    return { error: 'Invalid role.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in.' };
  }

  // Never trust the client for the authorization check — re-verify the
  // caller's own role server-side before allowing the write.
  const { data: callerProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (callerProfile?.role !== 'admin') {
    return { error: 'Only admins can change roles.' };
  }

  // The write goes through the service-role client, not the caller's session:
  // `role` is intentionally NOT in the authenticated column-UPDATE allowlist
  // (migration 0007), so authenticated can no longer set role at all — which is
  // what prevents a normal user from self-promoting on their own profile row.
  // Authorization is fully enforced by the admin check above.
  const admin = createAdminClient();
  const { error } = await admin
    .from('profiles')
    .update({ role: newRole as UserRole })
    .eq('id', userId);

  if (error) {
    return { error: 'Could not update role.' };
  }

  revalidatePath('/admin/users');
  return {};
}
