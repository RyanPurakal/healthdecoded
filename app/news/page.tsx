// News page: posts written by the Health Decoded team and members.
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'News',
};

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('news_posts')
    .select('id, title, slug, cover_image_url, published_at')
    .eq('status', 'published')
    .eq('news_category', 'member')
    .order('published_at', { ascending: false });

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Health Decoded</p>
        <h1 className="hd-app-heading">News</h1>
        <p className="hd-app-subtitle">Updates from our team and ambassadors.</p>

        <div className="hd-app-card">
          {!posts || posts.length === 0 ? (
            <p className="hd-app-empty">No posts published yet.</p>
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
