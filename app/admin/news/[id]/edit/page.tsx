import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updatePost } from '../../actions';
import NewsForm from '../../NewsForm';

export const metadata = {
  title: 'Edit Post',
};

export default async function EditNewsPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('news_posts').select('*').eq('id', id).single();

  if (!post) notFound();

  const updatePostForId = updatePost.bind(null, id);

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Edit Post</p>
      <NewsForm action={updatePostForId} post={post} submitLabel="Save Changes" />
    </div>
  );
}
