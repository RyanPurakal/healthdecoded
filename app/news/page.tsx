// News page: member posts and external health news, filterable by category via ?category= param.
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'News',
};

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  member: 'From Our Team',
  external: 'Health News',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = 'all' } = await searchParams;
  const activeCategory = ['all', 'member', 'external'].includes(category) ? category : 'all';

  const supabase = await createClient();
  let query = supabase
    .from('news_posts')
    .select('id, title, slug, cover_image_url, published_at, news_category')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (activeCategory !== 'all') {
    query = query.eq('news_category', activeCategory);
  }

  const { data: posts } = await query;

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Health Decoded</p>
        <h1 className="hd-app-heading">News</h1>
        <p className="hd-app-subtitle">Updates from our team, ambassadors, and the broader health world.</p>

        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              href={key === 'all' ? '/news' : `/news?category=${key}`}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--st-rule)',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: activeCategory === key ? 700 : 400,
                background: activeCategory === key ? 'var(--st-accent)' : 'transparent',
                color: activeCategory === key ? '#fff' : 'var(--st-muted)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hd-app-card">
          {!posts || posts.length === 0 ? (
            <p className="hd-app-empty">No posts published yet in this category.</p>
          ) : (
            posts.map((post) => (
              <div className="hd-app-row" key={post.id}>
                <div>
                  <Link href={`/news/${post.slug}`} className="hd-app-row-title">
                    {post.title}
                  </Link>
                  <div className="hd-app-row-meta" style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                    {post.published_at && (
                      <span>
                        {new Date(post.published_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </span>
                    )}
                    {activeCategory === 'all' && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 3,
                        fontSize: 11,
                        fontWeight: 600,
                        background: post.news_category === 'external' ? 'var(--st-rule)' : 'color-mix(in srgb, var(--st-accent) 12%, transparent)',
                        color: post.news_category === 'external' ? 'var(--st-muted)' : 'var(--st-accent)',
                      }}>
                        {post.news_category === 'external' ? 'Health News' : 'Our Team'}
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/news/${post.slug}`} className="hd-app-row-meta">
                  Read →
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
