import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const SITE = 'https://healthdecodedinitiative.org';

const STATIC_ROUTES = ['/', '/about/us', '/programs', '/events', '/news', '/contact', '/privacy', '/terms'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('news_posts')
    .select('slug, published_at')
    .eq('status', 'published');

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE}${route}`,
  }));

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${SITE}/news/${post.slug}`,
    lastModified: post.published_at ?? undefined,
  }));

  return [...staticEntries, ...postEntries];
}
