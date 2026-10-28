'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import type { DocDetectiveContent } from '@/types/database';
import { submitDocumentDetective, type SubmitDocDetectiveResult } from '../actions';
import type { SanitizedDocQuestion } from '../document-detective';

type Doc = DocDetectiveContent['document'];

// region id -> the text shown in that region (for echoing picks back to the user)
function regionTextMap(doc: Doc): Record<string, string> {
  const map: Record<string, string> = {};
  for (const row of doc.table.rows) for (const c of row.cells) if (c.region) map[c.region] = c.text;
  for (const fn of doc.footnotes) if (fn.region) map[fn.region] = fn.text;
  return map;
}

function DocumentView({
  doc,
  regionState,
}: {
  doc: Doc;
  // For a clickable region, return how to render/handle it; return null for static text.
  regionState: (regionId: string) => { bg?: string; color?: string; onClick?: () => void } | null;
}) {
  const cellStyle = (region?: string, emphasis?: boolean): React.CSSProperties => ({
    padding: '6px 10px',
    textAlign: 'right',
    fontWeight: emphasis ? 700 : 400,
    fontVariantNumeric: 'tabular-nums',
  });

  function renderRegion(text: string, region: string | undefined, emphasis?: boolean) {
    if (!region) return <span style={{ fontWeight: emphasis ? 700 : 400 }}>{text}</span>;
    const st = regionState(region);
    if (!st) return <span style={{ fontWeight: emphasis ? 700 : 400 }}>{text}</span>;
    return (
      <button
        type="button"
        onClick={st.onClick}
        disabled={!st.onClick}
        style={{
          border: '1px dashed var(--st-rule)',
          borderRadius: 4,
          padding: '2px 6px',
          background: st.bg ?? 'transparent',
          color: st.color ?? 'inherit',
          font: 'inherit',
          fontWeight: emphasis ? 700 : 400,
          cursor: st.onClick ? 'pointer' : 'default',
        }}
      >
        {text}
      </button>
    );
  }

  return (
    <div style={{ border: '1px solid var(--st-rule)', borderRadius: 6, padding: 16, background: '#fff' }}>
      <div className="hd-app-card-title" style={{ marginBottom: 8 }}>{doc.title}</div>
      <div style={{ marginBottom: 12 }}>
        {doc.meta.map((m) => (
          <div className="hd-app-row-meta" key={m.label}>
            {m.label}: {m.value}
          </div>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="hd-app-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {doc.table.columns.map((col, i) => (
                <th key={col} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '6px 10px' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doc.table.rows.map((row, ri) => (
              <tr key={ri} style={{ borderTop: '1px solid var(--st-rule)' }}>
                {row.cells.map((cell, ci) => (
                  <td key={ci} style={ci === 0 ? { ...cellStyle(cell.region, row.emphasis || cell.emphasis), textAlign: 'left' } : cellStyle(cell.region, row.emphasis || cell.emphasis)}>
                    {ci === 0 && !cell.region ? (
                      <span style={{ fontWeight: row.emphasis || cell.emphasis ? 700 : 400 }}>{cell.text}</span>
                    ) : (
                      renderRegion(cell.text, cell.region, row.emphasis || cell.emphasis)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12 }}>
        {doc.footnotes.map((fn, i) => (
          <div key={i} className="hd-app-row-meta" style={{ marginTop: 4, fontWeight: fn.emphasis ? 700 : 400 }}>
            {fn.region ? renderRegion(fn.text, fn.region, fn.emphasis) : fn.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocDetectiveRunner({
  activityId,
  document: doc,
  questions,
  passThreshold,
  xpValue,
  alreadyCompleted,
}: {
  activityId: string;
  document: Doc;
  questions: SanitizedDocQuestion[];
  passThreshold: number;
  xpValue: number;
  alreadyCompleted: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [result, setResult] = useState<SubmitDocDetectiveResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const textOf = useMemo(() => regionTextMap(doc), [doc]);
  const allAnswered = questions.every((q) => answers[q.id]);

  function pick(regionId: string) {
    const q = questions[activeIdx];
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.id]: regionId }));
    // Advance to the next unanswered question, if any.
    const nextUnanswered = questions.findIndex((qq, i) => i > activeIdx && !answers[qq.id] && qq.id !== q.id);
    if (nextUnanswered !== -1) setActiveIdx(nextUnanswered);
  }

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await submitDocumentDetective(activityId, answers);
      if (res.error) setError(res.error);
      else setResult(res);
    });
  }

  function reset() {
    setAnswers({});
    setActiveIdx(0);
    setResult(null);
    setError(null);
  }

  // ── Results view ──────────────────────────────────────────────────────────
  if (result && result.results) {
    const pct = Math.round((result.score ?? 0) * 100);
    const correctRegions = new Set(result.results.map((r) => r.correctRegion));
    const wrongPicks = new Set(result.results.filter((r) => !r.isCorrect && r.selectedRegion).map((r) => r.selectedRegion!));

    return (
      <>
        <div className={`hd-app-banner ${result.passed ? 'hd-app-banner--success' : 'hd-app-banner--error'}`}>
          {result.passed
            ? `You passed — ${result.correct}/${result.total} (${pct}%). ${result.awardedXp ? `+${result.awardedXp} XP earned!` : (alreadyCompleted || result.alreadyCompleted) ? 'You already earned XP for this one.' : ''}`
            : `${result.correct}/${result.total} (${pct}%). You need ${Math.round(passThreshold * 100)}% — review the answers below and try again.`}
        </div>

        <DocumentView
          doc={doc}
          regionState={(id) => {
            if (correctRegions.has(id)) return { bg: '#e6f4ea', color: '#2f9e44' };
            if (wrongPicks.has(id)) return { bg: '#fbe9e9', color: '#c53030' };
            return { }; // shown, not clickable
          }}
        />

        <div className="hd-app-card" style={{ marginTop: 16 }}>
          {questions.map((q, i) => {
            const r = result.results!.find((x) => x.id === q.id);
            if (!r) return null;
            return (
              <div className="hd-app-row" key={q.id} style={{ display: 'block' }}>
                <div className="hd-app-row-title">{i + 1}. {q.prompt}</div>
                <div className="hd-app-row-meta" style={{ color: r.isCorrect ? '#2f9e44' : '#c53030', marginTop: 4 }}>
                  {r.isCorrect ? '✓' : '✗'} Your answer: {r.selectedRegion ? textOf[r.selectedRegion] : '(none)'}
                  {!r.isCorrect && <> · Correct: {textOf[r.correctRegion]}</>}
                </div>
                <div className="hd-app-row-meta" style={{ marginTop: 4 }}>{r.explanation}</div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {result.passed ? (
              <Link href="/activities" className="ct-btn ct-btn-filled">Back to activities</Link>
            ) : (
              <button type="button" className="ct-btn ct-btn-filled" onClick={reset}>Try again</button>
            )}
            <Link href="/activities" className="ct-btn ct-btn-outline">All activities</Link>
          </div>
        </div>
      </>
    );
  }

  // ── Play view ─────────────────────────────────────────────────────────────
  const activeQ = questions[activeIdx];
  const activePick = activeQ ? answers[activeQ.id] : undefined;

  return (
    <>
      {alreadyCompleted && (
        <div className="hd-app-banner hd-app-banner--success">
          You&apos;ve already completed this. Retaking it won&apos;t change your XP.
        </div>
      )}
      {error && <div className="hd-app-banner hd-app-banner--error">{error}</div>}

      <div className="hd-app-card" style={{ marginBottom: 16 }}>
        <div className="hd-app-row-title">Question {activeIdx + 1} of {questions.length}</div>
        <p className="hd-app-subtitle" style={{ margin: '4px 0 0' }}>{activeQ?.prompt}</p>
        <p className="hd-app-row-meta" style={{ marginTop: 4 }}>Tap the part of the document that answers this.</p>
      </div>

      <DocumentView
        doc={doc}
        regionState={(id) => ({
          bg: activePick === id ? 'var(--st-accent)' : undefined,
          color: activePick === id ? '#fff' : undefined,
          onClick: () => pick(id),
        })}
      />

      <div className="hd-app-card" style={{ marginTop: 16 }}>
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            className="hd-app-row"
            onClick={() => setActiveIdx(i)}
            style={{
              width: '100%',
              textAlign: 'left',
              background: i === activeIdx ? '#f6f6f4' : 'none',
              border: 'none',
              borderBottom: '1px solid var(--st-rule)',
              cursor: 'pointer',
            }}
          >
            <span className="hd-app-row-title">{i + 1}. {q.prompt}</span>
            <span className="hd-app-row-meta">{answers[q.id] ? textOf[answers[q.id]] : 'Not answered'}</span>
          </button>
        ))}
        <button
          type="button"
          className="ct-btn ct-btn-filled"
          style={{ marginTop: 16 }}
          disabled={pending || !allAnswered}
          onClick={submit}
        >
          {pending ? 'Checking…' : allAnswered ? `Submit (${xpValue} XP)` : 'Answer all questions'}
        </button>
      </div>
    </>
  );
}
