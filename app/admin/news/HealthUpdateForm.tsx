'use client';

import { useActionState } from 'react';
import { createHealthUpdate } from './actions';

function todayTitle() {
  return `Health Update: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

export default function HealthUpdateForm() {
  const [state, action, pending] = useActionState(createHealthUpdate, null);

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label className="hd-app-label" htmlFor="hu-title">Title</label>
        <input
          id="hu-title"
          name="title"
          type="text"
          className="hd-app-input"
          defaultValue={todayTitle()}
          required
        />
      </div>
      <div>
        <label className="hd-app-label" htmlFor="hu-body">Body</label>
        <textarea
          id="hu-body"
          name="body"
          className="hd-app-input"
          rows={10}
          placeholder="Paste your pre-formatted update here…"
          required
          style={{ resize: 'vertical' }}
        />
      </div>
      {state?.error && (
        <p style={{ color: '#c53030', fontSize: 13 }}>{state.error}</p>
      )}
      {state?.slug && (
        <p style={{ color: 'var(--st-accent)', fontSize: 13 }}>
          Saved as draft — <a href={`/admin/news/${state.slug}/edit`}>edit it here</a>.
        </p>
      )}
      <div>
        <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
          {pending ? 'Saving…' : 'Save as Draft'}
        </button>
      </div>
    </form>
  );
}
