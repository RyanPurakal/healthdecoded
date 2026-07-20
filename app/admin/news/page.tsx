import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deletePost, togglePublish } from './actions';

export const metadata = {
  title: 'Manage News',
};

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false });

  return (
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
        posts.map((post) => {
          const deletePostForId = deletePost.bind(null, post.id);
          const togglePublishForId = togglePublish.bind(null, post.id, post.status === 'published' ? 'draft' : 'published');
          return (
            <div className="hd-app-row" key={post.id}>
              <div>
                <div className="hd-app-row-title">{post.title}</div>
                <div className="hd-app-row-meta">/news/{post.slug}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className={`hd-app-status hd-app-status--${post.status}`}>{post.status}</span>
                <form action={togglePublishForId}>
                  <button type="submit" className="hd-app-row-meta" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                </form>
                <Link href={`/admin/news/${post.id}/edit`} className="hd-app-row-meta">
                  Edit
                </Link>
                <form action={deletePostForId}>
                  <button type="submit" className="hd-app-row-meta" style={{ color: '#c53030', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
