'use client';

import { useActionState } from 'react';
import type { GameActivity } from '@/types/database';
import type { ActivityFormState } from './actions';

export default function ActivityForm({
  action,
  activity,
  submitLabel,
}: {
  action: (state: ActivityFormState, formData: FormData) => Promise<ActivityFormState>;
  activity?: GameActivity;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="ct-form">
      {state?.error && <div className="hd-app-banner hd-app-banner--error">{state.error}</div>}
      <div className="ct-field-group">
        <label htmlFor="title" className="ct-label">Title</label>
        <input id="title" name="title" required defaultValue={activity?.title} className="ct-input" />
      </div>
      <div className="ct-field-group">
        <label htmlFor="slug" className="ct-label">Slug (optional — generated from title if blank)</label>
        <input id="slug" name="slug" defaultValue={activity?.slug} className="ct-input" placeholder="auto-generated" />
      </div>
      <div className="ct-row-two">
        <div className="ct-field-group">
          <label htmlFor="type" className="ct-label">Type</label>
          <select id="type" name="type" defaultValue={activity?.type ?? 'lesson'} className="ct-input">
            <option value="lesson">Lesson</option>
            <option value="quiz">Quiz</option>
            <option value="interactive">Interactive</option>
          </select>
        </div>
        <div className="ct-field-group">
          <label htmlFor="xp_value" className="ct-label">XP Value</label>
          <input
            id="xp_value"
            name="xp_value"
            type="number"
            min="0"
            step="1"
            defaultValue={activity?.xp_value ?? 10}
            className="ct-input"
          />
        </div>
      </div>
      <div className="ct-field-group">
        <label htmlFor="content_url" className="ct-label">
          Content URL (for interactive activities — link to the external experience)
        </label>
        <input
          id="content_url"
          name="content_url"
          defaultValue={activity?.content_url ?? ''}
          className="ct-input"
          placeholder="https://…"
        />
      </div>
      <div className="ct-field-group">
        <label htmlFor="description" className="ct-label">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={activity?.description ?? ''}
          className="ct-input hd-app-textarea"
        />
      </div>
      <div className="ct-field-group">
        <label className="ct-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={activity?.is_published ?? false}
            style={{ width: 'auto' }}
          />
          Published (visible on /activities)
        </label>
      </div>
      <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
