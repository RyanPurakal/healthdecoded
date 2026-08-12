'use client';

import { useState, useTransition } from 'react';
import type { ServiceHour } from '@/types/database';
import { submitServiceHours } from './actions';

export default function ServiceHoursSection({ hours }: { hours: ServiceHour[] }) {
  const [adding, setAdding] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const verifiedTotal = hours.filter((h) => h.status === 'verified').reduce((sum, h) => sum + Number(h.hours), 0);
  const pendingTotal = hours.filter((h) => h.status === 'pending').reduce((sum, h) => sum + Number(h.hours), 0);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitServiceHours(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setAdding(false);
      }
    });
  }

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Service Hours</p>

      <div className="hd-app-row">
        <span className="hd-app-row-title">Verified</span>
        <span className="hd-app-row-meta">{verifiedTotal} hrs</span>
      </div>
      <div className="hd-app-row">
        <span className="hd-app-row-title">Pending</span>
        <span className="hd-app-row-meta">{pendingTotal} hrs</span>
      </div>

      {hours.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {hours.map((h) => (
            <div className="hd-app-row" key={h.id}>
              <div>
                <div className="hd-app-row-title">{Number(h.hours)} hrs — {h.description || 'No description'}</div>
                <div className="hd-app-row-meta">
                  {new Date(h.submitted_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </div>
              </div>
              <span className={`hd-app-status hd-app-status--${h.status === 'verified' ? 'attended' : h.status === 'rejected' ? 'cancelled' : 'registered'}`}>
                {h.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <form action={handleSubmit} className="ct-form" style={{ marginTop: 20 }}>
          {error && <div className="hd-app-banner hd-app-banner--error">{error}</div>}
          <div className="ct-field-group">
            <label htmlFor="hours" className="ct-label">Hours</label>
            <input id="hours" name="hours" type="number" step="0.25" min="0" required className="ct-input" />
          </div>
          <div className="ct-field-group">
            <label htmlFor="description" className="ct-label">What did you do?</label>
            <textarea id="description" name="description" required className="ct-input hd-app-textarea" />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" disabled={pending} className="ct-btn ct-btn-filled">
              {pending ? 'Submitting…' : 'Submit for Verification'}
            </button>
            <button
              type="button"
              disabled={pending}
              className="ct-btn ct-btn-outline"
              onClick={() => {
                setError(null);
                setAdding(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button type="button" className="ct-btn ct-btn-outline" style={{ marginTop: 20 }} onClick={() => setAdding(true)}>
          Log Hours Manually
        </button>
      )}
    </div>
  );
}
