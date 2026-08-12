'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteActivity, toggleActivityPublish } from './actions';

export default function ActivityRowActions({
  activityId,
  isPublished,
}: {
  activityId: string;
  isPublished: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span className={`hd-app-status hd-app-status--${isPublished ? 'published' : 'draft'}`}>
          {isPublished ? 'published' : 'draft'}
        </span>
        <button
          type="button"
          disabled={pending}
          className="hd-app-row-meta"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const result = await toggleActivityPublish(activityId, !isPublished);
              if (result?.error) setError(result.error);
            })
          }
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <Link href={`/admin/activities/${activityId}/edit`} className="hd-app-row-meta">
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
              const result = await deleteActivity(activityId);
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
