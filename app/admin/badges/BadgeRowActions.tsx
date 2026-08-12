'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteBadge } from './actions';

export default function BadgeRowActions({ badgeId }: { badgeId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href={`/admin/badges/${badgeId}/edit`} className="hd-app-row-meta">
          Edit
        </Link>
        <button
          type="button"
          disabled={pending}
          className="hd-app-row-meta"
          style={{ color: '#c53030', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const result = await deleteBadge(badgeId);
              if (result?.error) setError(result.error);
            })
          }
        >
          Delete
        </button>
      </div>
      {error && <span className="hd-app-row-meta" style={{ color: '#c53030' }}>{error}</span>}
    </div>
  );
}
