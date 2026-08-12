'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { GameActivity } from '@/types/database';
import { completeActivity } from './actions';

const TYPE_LABEL: Record<GameActivity['type'], string> = {
  lesson: 'Lesson',
  quiz: 'Quiz',
  interactive: 'Interactive',
};

export default function ActivityRow({
  activity,
  isSignedIn,
  completed,
}: {
  activity: GameActivity;
  isSignedIn: boolean;
  completed: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(completed);
  const [error, setError] = useState<string | null>(null);

  function markComplete() {
    setError(null);
    startTransition(async () => {
      const result = await completeActivity(activity.id);
      if (result?.error) setError(result.error);
      else setDone(true);
    });
  }

  return (
    <div className="hd-app-row">
      <div>
        <div className="hd-app-row-title">{activity.title}</div>
        <div className="hd-app-row-meta">
          {TYPE_LABEL[activity.type]} · {activity.xp_value} XP
        </div>
        {activity.description && (
          <div className="hd-app-row-meta" style={{ marginTop: 4 }}>
            {activity.description}
          </div>
        )}
        {error && (
          <div className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 4 }}>
            {error}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {done ? (
          <>
            <span className="hd-app-status hd-app-status--attended">Completed</span>
            {activity.type === 'quiz' && (
              <Link href={`/activities/${activity.slug}`} className="hd-app-row-meta">
                Review
              </Link>
            )}
          </>
        ) : !isSignedIn ? (
          <a
            href={`/login?next=/activities${activity.type === 'quiz' ? `/${activity.slug}` : ''}`}
            className="ct-btn ct-btn-outline"
          >
            Sign in to start
          </a>
        ) : activity.type === 'quiz' ? (
          <Link href={`/activities/${activity.slug}`} className="ct-btn ct-btn-filled">
            Start quiz
          </Link>
        ) : activity.type === 'interactive' && activity.content_url ? (
          // Basic version: open the external experience, then mark complete on
          // return. Doesn't yet verify they actually finished it — that's the
          // follow-up interactive pass.
          <a
            href={activity.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ct-btn ct-btn-filled"
            onClick={markComplete}
          >
            {pending ? 'Opening…' : 'Start activity'}
          </a>
        ) : (
          <button type="button" disabled={pending} className="ct-btn ct-btn-filled" onClick={markComplete}>
            {pending ? 'Saving…' : 'Mark complete'}
          </button>
        )}
      </div>
    </div>
  );
}
