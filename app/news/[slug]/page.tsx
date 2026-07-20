// Single published news post, rendered from markdown.
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('news_posts')
    .select('title')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  return { title: post?.title ?? 'News' };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('news_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        {post.published_at && (
          <p className="hd-app-eyebrow">
            {new Date(post.published_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
          </p>
        )}
        <h1 className="hd-app-heading">{post.title}</h1>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.title}
            style={{ width: '100%', height: 'auto', marginBottom: 32 }}
          />
        )}

        <div className="hd-app-card news-post-body">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
