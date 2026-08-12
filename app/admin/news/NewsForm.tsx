'use client';

import { useActionState } from 'react';
import type { NewsPost } from '@/types/database';
import type { NewsFormState } from './actions';

export default function NewsForm({
  action,
  post,
  submitLabel,
}: {
  action: (state: NewsFormState, formData: FormData) => Promise<NewsFormState>;
  post?: NewsPost;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="ct-form">
      {state?.error && <div className="hd-app-banner hd-app-banner--error">{state.error}</div>}
      <div className="ct-field-group">
        <label htmlFor="title" className="ct-label">Title</label>
        <input id="title" name="title" required defaultValue={post?.title} className="ct-input" />
      </div>
      <div className="ct-field-group">
        <label htmlFor="slug" className="ct-label">Slug (optional — generated from title if blank)</label>
        <input id="slug" name="slug" defaultValue={post?.slug} className="ct-input" placeholder="auto-generated" />
      </div>
      <div className="ct-field-group">
        <label htmlFor="cover_image_url" className="ct-label">Cover Image URL</label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          defaultValue={post?.cover_image_url ?? ''}
          className="ct-input"
          placeholder="https://…"
        />
      </div>
      <div className="ct-field-group">
        <label htmlFor="body" className="ct-label">Body (Markdown)</label>
        <textarea
          id="body"
          name="body"
          required
          defaultValue={post?.body}
          className="ct-input hd-app-textarea"
          style={{ minHeight: 320 }}
        />
      </div>
      <div className="ct-field-group">
        <label htmlFor="status" className="ct-label">Status</label>
        <select id="status" name="status" defaultValue={post?.status ?? 'draft'} className="ct-input">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
