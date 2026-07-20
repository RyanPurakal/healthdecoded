'use client';

import { useState, useTransition } from 'react';
import { requestAccountDeletion } from './actions';

export default function DeletionRequestButton() {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="hd-app-row-meta">
        Deletion request submitted. A Health Decoded admin will follow up.
      </p>
    );
  }

  if (!confirming) {
    return (
      <button type="button" className="ct-btn ct-btn-outline" onClick={() => setConfirming(true)}>
        Request Account Deletion
      </button>
    );
  }

  return (
    <div>
      <p className="hd-app-row-meta" style={{ marginBottom: 10 }}>
        This notifies Health Decoded admins to delete your account and data. Are you sure?
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          disabled={pending}
          className="ct-btn ct-btn-filled"
          onClick={() =>
            startTransition(async () => {
              const result = await requestAccountDeletion();
              if (result?.error) {
                setMessage(result.error);
              } else if (result?.alreadyPending) {
                setMessage('You already have a pending deletion request.');
                setSubmitted(true);
              } else {
                setSubmitted(true);
              }
            })
          }
        >
          {pending ? 'Submitting…' : 'Yes, Request Deletion'}
        </button>
        <button
          type="button"
          disabled={pending}
          className="ct-btn ct-btn-outline"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </button>
      </div>
      {message && <p className="hd-app-row-meta" style={{ marginTop: 8 }}>{message}</p>}
    </div>
  );
}
