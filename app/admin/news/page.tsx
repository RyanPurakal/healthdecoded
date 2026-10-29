import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import NewsRowActions from './NewsRowActions';
import HealthUpdateForm from './HealthUpdateForm';

export const metadata = {
  title: 'Manage News',
};

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="hd-app-card">
        <div className="hd-app-row" style={{ borderBottom: '1px solid var(--st-rule)', paddingTop: 0 }}>
          <p className="hd-app-card-title" style={{ marginBottom: 0 }}>Quick Health Update</p>
        </div>
        <div style={{ padding: '16px 0' }}>
          <HealthUpdateForm />
        </div>
      </div>

    <div className="hd-app-card">
      <div className="hd-app-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
        <p className="hd-app-card-title" style={{ marginBottom: 0 }}>All Posts</p>
        <Link href="/admin/news/new" className="ct-btn ct-btn-filled">
          New Post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="hd-app-empty">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className="hd-app-row" key={post.id}>
            <div>
              <div className="hd-app-row-title">{post.title}</div>
              <div className="hd-app-row-meta">/news/{post.slug}</div>
            </div>
            <NewsRowActions postId={post.id} status={post.status} />
          </div>
        ))
      )}
    </div>
    </div>
  );
}
