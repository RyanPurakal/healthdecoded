'use client';

import { useState, useTransition } from 'react';
import { deleteEvent } from './actions';

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <button
        type="button"
        disabled={pending}
        className="hd-app-row-meta"
        style={{ color: '#c53030', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await deleteEvent(eventId);
            if (result?.error) setError(result.error);
          })
        }
      >
        {pending ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span className="hd-app-row-meta" style={{ color: '#c53030' }}>{error}</span>}
    </div>
  );
}
