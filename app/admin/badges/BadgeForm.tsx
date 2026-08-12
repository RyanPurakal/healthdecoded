'use client';

import { useActionState } from 'react';
import type { Badge } from '@/types/database';
import type { BadgeFormState } from './actions';

export default function BadgeForm({
  action,
  badge,
  submitLabel,
}: {
  action: (state: BadgeFormState, formData: FormData) => Promise<BadgeFormState>;
  badge?: Badge;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="ct-form">
      {state?.error && <div className="hd-app-banner hd-app-banner--error">{state.error}</div>}
      <div className="ct-row-two">
        <div className="ct-field-group">
          <label htmlFor="name" className="ct-label">Name</label>
          <input id="name" name="name" required defaultValue={badge?.name} className="ct-input" />
        </div>
        <div className="ct-field-group">
          <label htmlFor="icon" className="ct-label">Icon (emoji or identifier)</label>
          <input id="icon" name="icon" defaultValue={badge?.icon ?? ''} className="ct-input" placeholder="🏅" />
        </div>
      </div>
      <div className="ct-field-group">
        <label htmlFor="description" className="ct-label">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={badge?.description ?? ''}
          className="ct-input hd-app-textarea"
        />
      </div>
      <div className="ct-row-two">
        <div className="ct-field-group">
          <label htmlFor="criteria_type" className="ct-label">Criteria Type</label>
          <select
            id="criteria_type"
            name="criteria_type"
            defaultValue={badge?.criteria_type ?? 'xp_threshold'}
            className="ct-input"
          >
            <option value="xp_threshold">Total XP reaches</option>
            <option value="activity_count">Activities completed reaches</option>
          </select>
        </div>
        <div className="ct-field-group">
          <label htmlFor="criteria_value" className="ct-label">Criteria Value</label>
          <input
            id="criteria_value"
            name="criteria_value"
            type="number"
            min="0"
            step="1"
            defaultValue={badge?.criteria_value ?? 100}
            className="ct-input"
          />
        </div>
      </div>
      <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
