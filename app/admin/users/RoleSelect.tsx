'use client';

import { useState, useTransition } from 'react';
import { updateUserRole } from './actions';
import type { UserRole } from '@/types/database';

const ROLES: UserRole[] = ['ambassador', 'volunteer', 'admin'];

export default function RoleSelect({ userId, role }: { userId: string; role: UserRole }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(role);

  return (
    <div>
      <select
        value={value}
        disabled={pending}
        className="ct-input"
        style={{ padding: '6px 10px', fontSize: 13 }}
        onChange={(e) => {
          const next = e.target.value as UserRole;
          const previous = value;
          setValue(next);
          setError(null);
          startTransition(async () => {
            const result = await updateUserRole(userId, next);
            if (result?.error) {
              setError(result.error);
              setValue(previous);
            }
          });
        }}
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {error && <p className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 4 }}>{error}</p>}
    </div>
  );
}
