import { createClient } from '@/lib/supabase/server';

const SITE = 'https://healthdecodedinitiative.org';

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function excerpt(body: string, length = 300) {
  const plain = body.replace(/[#*_`>[\]]/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > length ? `${plain.slice(0, length)}…` : plain;
}

export async function GET() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('news_posts')
    .select('title, slug, body, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const items = (posts ?? [])
    .map((post) => {
      const url = `${SITE}/news/${post.slug}`;
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(excerpt(post.body))}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Health Decoded News</title>
    <link>${SITE}/news</link>
    <description>Updates from Health Decoded ambassadors, volunteers, and the team.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
