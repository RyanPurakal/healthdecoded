'use client';

import { useState, useTransition } from 'react';
import type { Badge } from '@/types/database';
import { setLeaderboardVisibility } from './actions';

export type EarnedBadge = Badge & { awarded_at: string };

export default function GamificationSection({
  totalXp,
  showOnLeaderboard,
  badges,
}: {
  totalXp: number;
  showOnLeaderboard: boolean;
  badges: EarnedBadge[];
}) {
  const [pending, startTransition] = useTransition();
  const [visible, setVisible] = useState(showOnLeaderboard);
  const [error, setError] = useState<string | null>(null);

  function toggle() {
    const next = !visible;
    setVisible(next); // optimistic
    setError(null);
    startTransition(async () => {
      const result = await setLeaderboardVisibility(next);
      if (result?.error) {
        setError(result.error);
        setVisible(!next); // revert
      }
    });
  }

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Learning Progress</p>

      <div className="hd-app-row">
        <span className="hd-app-row-title">Total XP</span>
        <span className="hd-app-status hd-app-status--admin">{totalXp} XP</span>
      </div>

      <div className="hd-app-row">
        <div>
          <div className="hd-app-row-title">Show me on the leaderboard</div>
          <div className="hd-app-row-meta">
            Displays your first name, avatar, and XP publicly. Off by default.
          </div>
          {error && (
            <div className="hd-app-row-meta" style={{ color: '#c53030', marginTop: 4 }}>
              {error}
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={pending}
          className={visible ? 'ct-btn ct-btn-filled' : 'ct-btn ct-btn-outline'}
          onClick={toggle}
        >
          {visible ? 'On' : 'Off'}
        </button>
      </div>

      <div className="hd-app-row" style={{ borderBottom: 'none' }}>
        <span className="hd-app-row-title">Badges</span>
        <span className="hd-app-row-meta">{badges.length} earned</span>
      </div>
      {badges.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              title={badge.description ?? undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid var(--st-rule)',
                borderRadius: 999,
                padding: '6px 14px',
              }}
            >
              <span style={{ fontSize: 20 }}>{badge.icon || '🏅'}</span>
              <span className="hd-app-row-title">{badge.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
