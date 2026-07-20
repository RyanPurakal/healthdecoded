'use client';

import { useState, useTransition } from 'react';
import { completeDeletionRequest } from './actions';

export default function CompleteButton({ requestId }: { requestId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return <span className="hd-app-status hd-app-status--attended">Completed</span>;
  }

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="ct-btn ct-btn-outline"
        onClick={() =>
          startTransition(async () => {
            const result = await completeDeletionRequest(requestId);
            if (result?.error) {
              setError(result.error);
            } else {
              setDone(true);
            }
          })
        }
      >
        {pending ? 'Saving…' : 'Mark as Completed'}
      </button>
      {error && <p className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 4 }}>{error}</p>}
    </div>
  );
}
