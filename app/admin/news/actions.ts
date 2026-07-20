'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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
  let slug = base || 'post';
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    let query = supabase.from('news_posts').select('id').eq('slug', candidate);
    if (excludeId) query = query.neq('id', excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
  }
  return `${slug}-${Date.now()}`;
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/admin/news');

  const title = String(formData.get('title') ?? '').trim();
  const body = String(formData.get('body') ?? '');
  const coverImageUrl = String(formData.get('cover_image_url') ?? '').trim();
  const status = formData.get('status') === 'published' ? 'published' : 'draft';
  const slugInput = String(formData.get('slug') ?? '').trim();

  if (!title || !body) return;

  const slug = await uniqueSlug(supabase, slugify(slugInput || title));

  await supabase.from('news_posts').insert({
    title,
    slug,
    body,
    cover_image_url: coverImageUrl || null,
    status,
    author_id: user.id,
    published_at: status === 'published' ? new Date().toISOString() : null,
  });

  revalidatePath('/admin/news');
  revalidatePath('/news');
  redirect('/admin/news');
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get('title') ?? '').trim();
  const body = String(formData.get('body') ?? '');
  const coverImageUrl = String(formData.get('cover_image_url') ?? '').trim();
  const status = formData.get('status') === 'published' ? 'published' : 'draft';
  const slugInput = String(formData.get('slug') ?? '').trim();

  if (!title || !body) return;

  const { data: existing } = await supabase
    .from('news_posts')
    .select('status, published_at, slug')
    .eq('id', postId)
    .single();

  const slug =
    slugify(slugInput || title) === existing?.slug
      ? existing.slug
      : await uniqueSlug(supabase, slugify(slugInput || title), postId);

  const publishedAt =
    status === 'published' ? existing?.published_at ?? new Date().toISOString() : existing?.published_at ?? null;

  await supabase
    .from('news_posts')
    .update({
      title,
      slug,
      body,
      cover_image_url: coverImageUrl || null,
      status,
      published_at: publishedAt,
    })
    .eq('id', postId);

  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath(`/news/${slug}`);
  redirect('/admin/news');
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  await supabase.from('news_posts').delete().eq('id', postId);
  revalidatePath('/admin/news');
  revalidatePath('/news');
}

export async function togglePublish(postId: string, nextStatus: 'draft' | 'published') {
  const supabase = await createClient();
  await supabase
    .from('news_posts')
    .update({
      status: nextStatus,
      published_at: nextStatus === 'published' ? new Date().toISOString() : null,
    })
    .eq('id', postId);
  revalidatePath('/admin/news');
  revalidatePath('/news');
}
