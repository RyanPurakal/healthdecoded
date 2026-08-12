'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deletePost, togglePublish } from './actions';
import type { NewsPostStatus } from '@/types/database';

export default function NewsRowActions({
  postId,
  status,
}: {
  postId: string;
  status: NewsPostStatus;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const nextStatus: NewsPostStatus = status === 'published' ? 'draft' : 'published';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span className={`hd-app-status hd-app-status--${status}`}>{status}</span>
        <button
          type="button"
          disabled={pending}
          className="hd-app-row-meta"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const result = await togglePublish(postId, nextStatus);
              if (result?.error) setError(result.error);
            })
          }
        >
          {status === 'published' ? 'Unpublish' : 'Publish'}
        </button>
        <Link href={`/admin/news/${postId}/edit`} className="hd-app-row-meta">
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
              const result = await deletePost(postId);
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
