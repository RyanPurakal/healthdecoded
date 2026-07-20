'use client';

import { useState, useTransition } from 'react';
import { exportMyData } from './actions';

export default function DataExportButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="ct-btn ct-btn-outline"
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await exportMyData();
            if (result?.error || !result?.data) {
              setError(result?.error ?? 'Could not export data.');
              return;
            }
            const blob = new Blob([result.data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'health-decoded-my-data.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          })
        }
      >
        {pending ? 'Preparing…' : 'Download My Data'}
      </button>
      {error && <p className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 6 }}>{error}</p>}
    </div>
  );
}
