'use client';

import { useState, useTransition } from 'react';
import { markAttended } from '../checkin-actions';

export default function AttendButton({ registrationId }: { registrationId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <button
        type="button"
        disabled={pending}
        className="ct-btn ct-btn-outline"
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await markAttended(registrationId);
            if (result?.error) setError(result.error);
          })
        }
      >
        {pending ? 'Saving…' : 'Mark Attended'}
      </button>
      {error && <span className="hd-app-row-meta" style={{ color: '#c53030' }}>{error}</span>}
    </div>
  );
}
