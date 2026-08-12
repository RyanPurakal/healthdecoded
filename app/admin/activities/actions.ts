'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { parseQuizContent } from '@/app/activities/quiz';
import type { ActivityType, ActivityContent } from '@/types/database';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  base: string,
  excludeId?: string
) {
  const slug = base || 'activity';
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    let query = supabase.from('game_activities').select('id').eq('slug', candidate);
    if (excludeId) query = query.neq('id', excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
  }
  return `${slug}-${Date.now()}`;
}

const ACTIVITY_TYPES: ActivityType[] = ['lesson', 'quiz', 'interactive'];

function parseType(value: FormDataEntryValue | null): ActivityType {
  const v = String(value ?? '');
  return (ACTIVITY_TYPES as string[]).includes(v) ? (v as ActivityType) : 'lesson';
}

export type ActivityFormState = { error?: string } | null;

function readForm(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const contentUrl = String(formData.get('content_url') ?? '').trim();
  const type = parseType(formData.get('type'));
  const xpRaw = Number(formData.get('xp_value'));
  const xpValue = Number.isFinite(xpRaw) && xpRaw >= 0 ? Math.floor(xpRaw) : 0;
  const isPublished = formData.get('is_published') === 'on' || formData.get('is_published') === 'true';
  const slugInput = String(formData.get('slug') ?? '').trim();
  const contentRaw = String(formData.get('content') ?? '').trim();
  return { title, description, contentUrl, type, xpValue, isPublished, slugInput, contentRaw };
}

// Quiz activities carry a validated question bank in `content`; other types
// don't use it (yet), so their content is null.
function resolveContent(
  type: ActivityType,
  contentRaw: string
): { content?: ActivityContent | null; error?: string } {
  if (type !== 'quiz') return { content: null };
  if (!contentRaw) return { error: 'Quiz activities need Content JSON with questions.' };
  const { content, error } = parseQuizContent(contentRaw);
  if (error) return { error: `Content: ${error}` };
  return { content };
}

export async function createActivity(
  _prev: ActivityFormState,
  formData: FormData
): Promise<ActivityFormState> {
  const supabase = await createClient();
  const { title, description, contentUrl, type, xpValue, isPublished, slugInput, contentRaw } = readForm(formData);

  if (!title) {
    return { error: 'Title is required.' };
  }

  const { content, error: contentError } = resolveContent(type, contentRaw);
  if (contentError) return { error: contentError };

  const slug = await uniqueSlug(supabase, slugify(slugInput || title));

  const { error } = await supabase.from('game_activities').insert({
    title,
    slug,
    type,
    description: description || null,
    xp_value: xpValue,
    content_url: contentUrl || null,
    content,
    is_published: isPublished,
  });

  if (error) {
    return { error: 'Could not create the activity. Please try again.' };
  }

  revalidatePath('/admin/activities');
  revalidatePath('/activities');
  redirect('/admin/activities');
}

export async function updateActivity(
  activityId: string,
  _prev: ActivityFormState,
  formData: FormData
): Promise<ActivityFormState> {
  const supabase = await createClient();
  const { title, description, contentUrl, type, xpValue, isPublished, slugInput, contentRaw } = readForm(formData);

  if (!title) {
    return { error: 'Title is required.' };
  }

  const { content, error: contentError } = resolveContent(type, contentRaw);
  if (contentError) return { error: contentError };

  const { data: existing } = await supabase
    .from('game_activities')
    .select('slug')
    .eq('id', activityId)
    .single();

  const slug =
    slugify(slugInput || title) === existing?.slug
      ? existing.slug
      : await uniqueSlug(supabase, slugify(slugInput || title), activityId);

  const { error } = await supabase
    .from('game_activities')
    .update({
      title,
      slug,
      type,
      description: description || null,
      xp_value: xpValue,
      content_url: contentUrl || null,
      content,
      is_published: isPublished,
    })
    .eq('id', activityId);

  if (error) {
    return { error: 'Could not save changes. Please try again.' };
  }

  revalidatePath('/admin/activities');
  revalidatePath('/activities');
  redirect('/admin/activities');
}

export async function deleteActivity(activityId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('game_activities').delete().eq('id', activityId);

  if (error) {
    return { error: 'Could not delete the activity.' };
  }

  revalidatePath('/admin/activities');
  revalidatePath('/activities');
  return {};
}

export async function toggleActivityPublish(
  activityId: string,
  nextPublished: boolean
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('game_activities')
    .update({ is_published: nextPublished })
    .eq('id', activityId);

  if (error) {
    return { error: 'Could not update the activity status.' };
  }

  revalidatePath('/admin/activities');
  revalidatePath('/activities');
  return {};
}
