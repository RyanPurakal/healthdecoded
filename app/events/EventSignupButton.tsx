'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { registerForEvent } from './actions';

export default function EventSignupButton({
  eventId,
  isSignedIn,
  isRegistered,
}: {
  eventId: string;
  isSignedIn: boolean;
  isRegistered: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!isSignedIn) {
    return (
      <Link href={`/login?next=/events`} className="ct-btn ct-btn-outline">
        Sign In to Register
      </Link>
    );
  }

  if (isRegistered || done) {
    return <span className="hd-app-status hd-app-status--registered">Registered</span>;
  }

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="ct-btn ct-btn-filled"
        onClick={() =>
          startTransition(async () => {
            const result = await registerForEvent(eventId);
            if (result?.error) {
              setError(result.error);
            } else {
              setDone(true);
            }
          })
        }
      >
        {pending ? 'Signing Up…' : 'Sign Up'}
      </button>
      {error && (
        <p className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 6 }}>
          {error}
        </p>
      )}
    </div>
  );
}
