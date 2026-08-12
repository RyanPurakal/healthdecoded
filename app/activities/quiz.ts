// Pure quiz logic — no 'use server', no I/O — so it can be imported by the
// grading Server Action, the (server) quiz page, and a plain Node test alike.
// Types are imported type-only so this file has zero runtime imports.
import type { QuizContent, QuizQuestion } from '@/types/database';

// What the browser is allowed to see: prompt + options only. The correct index
// and explanation stay server-side until the user submits.
export type SanitizedQuestion = {
  id: string;
  prompt: string;
  options: string[];
};

export type QuestionResult = {
  id: string;
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
};

export type QuizResult = {
  total: number;
  correct: number;
  score: number; // 0..1
  passed: boolean;
  results: QuestionResult[];
};

export function sanitizeQuestions(content: QuizContent): SanitizedQuestion[] {
  return content.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options }));
}

// answers maps question id -> selected option index. Missing/invalid = unanswered.
export function gradeQuiz(content: QuizContent, answers: Record<string, number>): QuizResult {
  const questions = content.questions;
  const total = questions.length;

  const results: QuestionResult[] = questions.map((q) => {
    const raw = answers[q.id];
    const selectedIndex = Number.isInteger(raw) && raw >= 0 && raw < q.options.length ? raw : null;
    return {
      id: q.id,
      selectedIndex,
      correctIndex: q.answer_index,
      isCorrect: selectedIndex === q.answer_index,
      explanation: q.explanation,
    };
  });

  const correct = results.filter((r) => r.isCorrect).length;
  const score = total > 0 ? correct / total : 0;
  const passed = score >= content.pass_threshold;

  return { total, correct, score, passed, results };
}

// Runtime validation for admin-supplied JSON (the content field is free-form
// jsonb, so validate before trusting it). Returns a typed QuizContent or an
// error message suitable for surfacing in the admin form.
export function parseQuizContent(raw: string): { content?: QuizContent; error?: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: 'Content is not valid JSON.' };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { error: 'Content must be a JSON object.' };
  }
  const obj = parsed as Record<string, unknown>;

  const threshold = obj.pass_threshold;
  if (typeof threshold !== 'number' || threshold <= 0 || threshold > 1) {
    return { error: 'pass_threshold must be a number between 0 and 1.' };
  }

  if (!Array.isArray(obj.questions) || obj.questions.length === 0) {
    return { error: 'questions must be a non-empty array.' };
  }

  const seenIds = new Set<string>();
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < obj.questions.length; i++) {
    const q = obj.questions[i] as Record<string, unknown>;
    const where = `question ${i + 1}`;
    if (typeof q?.id !== 'string' || !q.id.trim()) return { error: `${where}: missing "id".` };
    if (seenIds.has(q.id)) return { error: `${where}: duplicate id "${q.id}".` };
    seenIds.add(q.id);
    if (typeof q.prompt !== 'string' || !q.prompt.trim()) return { error: `${where}: missing "prompt".` };
    if (!Array.isArray(q.options) || q.options.length < 2)
      return { error: `${where}: needs at least 2 options.` };
    if (!q.options.every((o) => typeof o === 'string' && o.trim()))
      return { error: `${where}: every option must be a non-empty string.` };
    if (
      typeof q.answer_index !== 'number' ||
      !Number.isInteger(q.answer_index) ||
      q.answer_index < 0 ||
      q.answer_index >= q.options.length
    )
      return { error: `${where}: "answer_index" must point at one of the options.` };
    if (typeof q.explanation !== 'string' || !q.explanation.trim())
      return { error: `${where}: missing "explanation".` };

    questions.push({
      id: q.id,
      prompt: q.prompt,
      options: q.options as string[],
      answer_index: q.answer_index,
      explanation: q.explanation,
    });
  }

  const format = typeof obj.format === 'string' ? obj.format : undefined;
  return { content: { format, pass_threshold: threshold, questions } };
}
