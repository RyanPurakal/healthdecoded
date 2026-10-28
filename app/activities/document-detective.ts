// Pure Document Detective logic — no 'use server', no I/O — importable by the
// grading Server Action, the (server) play page, and a plain Node test. Types
// are imported type-only so this file has zero runtime imports.
import type { DocDetectiveContent, DocDetectiveQuestion } from '@/types/database';

export type SanitizedDocQuestion = { id: string; prompt: string };

// The browser gets the whole document (it contains no answers) plus questions
// with the answer_region stripped out.
export type SanitizedDocDetective = {
  document: DocDetectiveContent['document'];
  questions: SanitizedDocQuestion[];
};

export type DocQuestionResult = {
  id: string;
  selectedRegion: string | null;
  correctRegion: string;
  isCorrect: boolean;
  explanation: string;
};

export type DocDetectiveResult = {
  total: number;
  correct: number;
  score: number; // 0..1
  passed: boolean;
  results: DocQuestionResult[];
};

/** Every region id referenced by the document (table cells + footnotes). */
export function collectRegionIds(content: DocDetectiveContent): Set<string> {
  const ids = new Set<string>();
  for (const row of content.document.table.rows) {
    for (const cell of row.cells) if (cell.region) ids.add(cell.region);
  }
  for (const fn of content.document.footnotes) if (fn.region) ids.add(fn.region);
  return ids;
}

export function sanitizeDocDetective(content: DocDetectiveContent): SanitizedDocDetective {
  return {
    document: content.document,
    questions: content.questions.map((q) => ({ id: q.id, prompt: q.prompt })),
  };
}

// answers maps question id -> clicked region id. Missing/unknown = unanswered.
export function gradeDocDetective(
  content: DocDetectiveContent,
  answers: Record<string, string>
): DocDetectiveResult {
  const regionIds = collectRegionIds(content);
  const questions = content.questions;
  const total = questions.length;

  const results: DocQuestionResult[] = questions.map((q) => {
    const raw = answers[q.id];
    const selectedRegion = typeof raw === 'string' && regionIds.has(raw) ? raw : null;
    return {
      id: q.id,
      selectedRegion,
      correctRegion: q.answer_region,
      isCorrect: selectedRegion === q.answer_region,
      explanation: q.explanation,
    };
  });

  const correct = results.filter((r) => r.isCorrect).length;
  const score = total > 0 ? correct / total : 0;
  return { total, correct, score, passed: score >= content.pass_threshold, results };
}

// Runtime validation for admin-supplied JSON. Beyond shape checks, it verifies
// every question's answer_region actually exists in the document (referential
// integrity), which is the easiest mistake to make when authoring by hand.
export function parseDocDetectiveContent(raw: string): { content?: DocDetectiveContent; error?: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: 'Content is not valid JSON.' };
  }
  if (typeof parsed !== 'object' || parsed === null) return { error: 'Content must be a JSON object.' };
  const obj = parsed as Record<string, unknown>;

  const threshold = obj.pass_threshold;
  if (typeof threshold !== 'number' || threshold <= 0 || threshold > 1) {
    return { error: 'pass_threshold must be a number between 0 and 1.' };
  }

  const doc = obj.document as Record<string, unknown> | undefined;
  if (!doc || typeof doc !== 'object') return { error: 'Missing "document".' };
  if (typeof doc.title !== 'string' || !doc.title.trim()) return { error: 'document.title is required.' };
  if (!Array.isArray(doc.meta)) return { error: 'document.meta must be an array.' };
  const table = doc.table as Record<string, unknown> | undefined;
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
    return { error: 'document.table needs columns[] and rows[].' };
  }
  if (!Array.isArray(doc.footnotes)) return { error: 'document.footnotes must be an array.' };

  // Gather region ids that actually exist in the rendered document.
  const regionIds = new Set<string>();
  for (const row of table.rows as { cells?: { region?: string }[] }[]) {
    for (const cell of row.cells ?? []) if (typeof cell.region === 'string') regionIds.add(cell.region);
  }
  for (const fn of doc.footnotes as { region?: string }[]) {
    if (typeof fn.region === 'string') regionIds.add(fn.region);
  }

  if (!Array.isArray(obj.questions) || obj.questions.length === 0) {
    return { error: 'questions must be a non-empty array.' };
  }
  const seen = new Set<string>();
  const questions: DocDetectiveQuestion[] = [];
  for (let i = 0; i < obj.questions.length; i++) {
    const q = obj.questions[i] as Record<string, unknown>;
    const where = `question ${i + 1}`;
    if (typeof q?.id !== 'string' || !q.id.trim()) return { error: `${where}: missing "id".` };
    if (seen.has(q.id)) return { error: `${where}: duplicate id "${q.id}".` };
    seen.add(q.id);
    if (typeof q.prompt !== 'string' || !q.prompt.trim()) return { error: `${where}: missing "prompt".` };
    if (typeof q.answer_region !== 'string' || !q.answer_region.trim())
      return { error: `${where}: missing "answer_region".` };
    if (!regionIds.has(q.answer_region))
      return { error: `${where}: answer_region "${q.answer_region}" is not a clickable region in the document.` };
    if (typeof q.explanation !== 'string' || !q.explanation.trim())
      return { error: `${where}: missing "explanation".` };
    questions.push({ id: q.id, prompt: q.prompt, answer_region: q.answer_region, explanation: q.explanation });
  }

  return { content: parsed as DocDetectiveContent };
}
