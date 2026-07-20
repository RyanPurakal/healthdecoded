import { createPost } from '../actions';
import NewsForm from '../NewsForm';

export const metadata = {
  title: 'New Post',
};

export default function NewNewsPostPage() {
  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">New Post</p>
      <NewsForm action={createPost} submitLabel="Save Post" />
    </div>
  );
}
