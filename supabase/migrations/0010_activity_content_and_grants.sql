-- Quiz mechanics groundwork: a flexible content column, plus a fix for a grant
-- gap in 0006.

-- ── content column ────────────────────────────────────────────────────────
-- Format-specific structured content for an activity, keyed by the activity's
-- type. For type='quiz' it holds the question bank + pass threshold:
--   {
--     "pass_threshold": 0.7,
--     "questions": [
--       { "id": "q1", "prompt": "...", "options": ["Myth","Fact"],
--         "answer_index": 0, "explanation": "..." }
--     ]
--   }
-- The same column is intended to carry other formats later (Document Detective
-- hotspots, Cost Calculator scenarios, etc.) with a different shape per type, so
-- no per-format tables are introduced. Grading always happens server-side; the
-- answer_index/explanation fields are never sent to the browser before submit.
alter table public.game_activities
  add column content jsonb;

-- ── grant gap fix (0006) ──────────────────────────────────────────────────
-- 0006 granted `authenticated` only SELECT on game_activities and badges, but
-- the admin CRUD Server Actions (createActivity/updateActivity/deleteActivity/
-- toggleActivityPublish, createBadge/updateBadge/deleteBadge) write through the
-- caller's authenticated session and rely on the is_admin() RLS policies to
-- gate access. Without the DML grants those writes fail with 42501 regardless
-- of RLS — the recurring "RLS was right, GRANT was missing" bug. RLS still
-- restricts these to admins; the grant just permits the role to touch the table
-- at all. Matches the events/news pattern.
grant insert, update, delete on public.game_activities to authenticated;
grant insert, update, delete on public.badges to authenticated;
