'use client';

import { useState, useTransition } from 'react';
import { verifyServiceHours, rejectServiceHours } from './actions';

export default function ReviewButtons({ entryId }: { entryId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(action: (id: string) => Promise<{ error?: string }>) {
    startTransition(async () => {
      setError(null);
      const result = await action(entryId);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          disabled={pending}
          className="ct-btn ct-btn-filled"
          onClick={() => run(verifyServiceHours)}
        >
          Verify
        </button>
        <button
          type="button"
          disabled={pending}
          className="hd-app-row-meta"
          style={{ color: '#c53030', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => run(rejectServiceHours)}
        >
          Reject
        </button>
      </div>
      {error && <span className="hd-app-row-meta" style={{ color: '#c53030' }}>{error}</span>}
    </div>
  );
}
