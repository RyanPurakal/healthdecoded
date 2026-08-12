'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { submitQuiz, type SubmitQuizResult } from '../actions';
import type { SanitizedQuestion } from '../quiz';

export default function QuizRunner({
  activityId,
  questions,
  passThreshold,
  xpValue,
  alreadyCompleted,
}: {
  activityId: string;
  questions: SanitizedQuestion[];
  passThreshold: number;
  xpValue: number;
  alreadyCompleted: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SubmitQuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await submitQuiz(activityId, answers);
      if (res.error) setError(res.error);
      else setResult(res);
    });
  }

  function reset() {
    setAnswers({});
    setResult(null);
    setError(null);
  }

  // ── Results view ──────────────────────────────────────────────────────────
  if (result && result.results) {
    const pct = Math.round((result.score ?? 0) * 100);
    const byId = new Map(result.results.map((r) => [r.id, r]));

    return (
      <div className="hd-app-card">
        <div className={`hd-app-banner ${result.passed ? 'hd-app-banner--success' : 'hd-app-banner--error'}`}>
          {result.passed ? (
            <>
              You passed — {result.correct}/{result.total} ({pct}%).{' '}
              {result.awardedXp ? `+${result.awardedXp} XP earned!` : alreadyCompleted || result.alreadyCompleted ? 'You already earned XP for this one.' : ''}
            </>
          ) : (
            <>
              {result.correct}/{result.total} ({pct}%). You need {Math.round(passThreshold * 100)}% to pass — review below and try again.
            </>
          )}
        </div>

        {questions.map((q, i) => {
          const r = byId.get(q.id);
          if (!r) return null;
          return (
            <div className="hd-app-row" key={q.id} style={{ display: 'block' }}>
              <div className="hd-app-row-title" style={{ marginBottom: 8 }}>
                {i + 1}. {q.prompt}
              </div>
              {q.options.map((opt, idx) => {
                const isCorrect = idx === r.correctIndex;
                const isChosen = idx === r.selectedIndex;
                const color = isCorrect ? '#2f9e44' : isChosen ? '#c53030' : 'var(--st-muted)';
                return (
                  <div key={idx} className="hd-app-row-meta" style={{ color, paddingLeft: 4 }}>
                    {isCorrect ? '✓' : isChosen ? '✗' : '·'} {opt}
                    {isChosen && !isCorrect ? ' (your answer)' : ''}
                  </div>
                );
              })}
              <div className="hd-app-row-meta" style={{ marginTop: 6 }}>{r.explanation}</div>
            </div>
          );
        })}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {result.passed ? (
            <Link href="/activities" className="ct-btn ct-btn-filled">Back to activities</Link>
          ) : (
            <button type="button" className="ct-btn ct-btn-filled" onClick={reset}>Try again</button>
          )}
          <Link href="/activities" className="ct-btn ct-btn-outline">All activities</Link>
        </div>
      </div>
    );
  }

  // ── Question form ─────────────────────────────────────────────────────────
  return (
    <div className="hd-app-card">
      {alreadyCompleted && (
        <div className="hd-app-banner hd-app-banner--success">
          You&apos;ve already completed this quiz. Retaking it won&apos;t change your XP.
        </div>
      )}
      {error && <div className="hd-app-banner hd-app-banner--error">{error}</div>}

      {questions.map((q, i) => (
        <div className="hd-app-row" key={q.id} style={{ display: 'block' }}>
          <div className="hd-app-row-title" style={{ marginBottom: 8 }}>
            {i + 1}. {q.prompt}
          </div>
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className="hd-app-row-meta"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', cursor: 'pointer' }}
            >
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === idx}
                onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                style={{ width: 'auto' }}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        type="button"
        className="ct-btn ct-btn-filled"
        style={{ marginTop: 20 }}
        disabled={pending || !allAnswered}
        onClick={submit}
      >
        {pending ? 'Checking…' : allAnswered ? `Submit (${xpValue} XP)` : 'Answer all questions'}
      </button>
    </div>
  );
}
