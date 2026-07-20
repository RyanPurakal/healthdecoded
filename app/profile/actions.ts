'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export async function updateProfile(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to edit your profile.' };
  }

  const fullName = String(formData.get('full_name') ?? '').trim();
  const schoolOrOrg = String(formData.get('school_or_org') ?? '').trim();
  const grade = String(formData.get('grade') ?? '').trim();
  const bio = String(formData.get('bio') ?? '').trim();
  const avatarFile = formData.get('avatar');

  let avatarUrl: string | undefined;

  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (!avatarFile.type.startsWith('image/')) {
      return { error: 'Avatar must be an image file.' };
    }
    if (avatarFile.size > MAX_AVATAR_BYTES) {
      return { error: 'Avatar image must be under 5MB.' };
    }

    const extension = avatarFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${user.id}/avatar.${extension}`;
    const bytes = Buffer.from(await avatarFile.arrayBuffer());

    // Storage RLS (avatars_insert_own_folder / avatars_update_own_folder)
    // enforces that this user can only write inside their own folder —
    // this client carries their session, so auth.uid() resolves correctly.
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, bytes, { contentType: avatarFile.type, upsert: true });

    if (uploadError) {
      return { error: `Could not upload avatar: ${uploadError.message}` };
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(path);
    // Cache-bust so the new avatar shows immediately even though the path is stable.
    avatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;
  }

  // .eq('id', user.id) uses the server-verified id from auth.getUser(), not
  // anything client-supplied — a user can never target another profile row.
  // RLS (profiles_update_own_or_admin) enforces the same thing independently.
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName || null,
      school_or_org: schoolOrOrg || null,
      grade: grade || null,
      bio: bio || null,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq('id', user.id);

  if (updateError) {
    return { error: 'Could not save profile changes.' };
  }

  revalidatePath('/profile');
  revalidatePath('/', 'layout');

  return {};
}

export async function exportMyData(): Promise<{ data?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in.' };
  }

  // Every query below is scoped to the server-verified user.id from
  // auth.getUser() — never anything client-supplied.
  const [{ data: profile }, { data: registrations }, { data: activity }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('event_registrations').select('*').eq('user_id', user.id),
    supabase.from('activity_logs').select('*').eq('user_id', user.id),
  ]);

  const payload = {
    exported_at: new Date().toISOString(),
    account: { id: user.id, email: user.email },
    profile,
    event_registrations: registrations ?? [],
    activity_logs: activity ?? [],
  };

  return { data: JSON.stringify(payload, null, 2) };
}

export async function requestAccountDeletion(): Promise<{ error?: string; alreadyPending?: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in.' };
  }

  const { data: existing } = await supabase
    .from('deletion_requests')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .maybeSingle();

  if (existing) {
    return { alreadyPending: true };
  }

  const { error } = await supabase.from('deletion_requests').insert({
    user_id: user.id,
    user_email: user.email ?? '',
  });

  if (error) {
    return { error: 'Could not submit deletion request.' };
  }

  revalidatePath('/profile');
  return {};
}
