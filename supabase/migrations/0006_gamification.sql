-- Gamification foundation: learning activities, XP, badges, and an opt-in
-- leaderboard. This is groundwork — the interactive games themselves (quizzes,
-- EOB Detective-style content) come in a follow-up pass. XP accrual and badge
-- awards are handled server-side in Server Actions (see app/activities/actions.ts),
-- NOT database triggers, so the logic stays easy to debug and adjust for now.

-- ── profiles: gamification fields ─────────────────────────────────────────
-- total_xp is bumped only by the completion Server Action (via the service-role
-- client). show_on_leaderboard is opt-in (default false) — the leaderboard is
-- youth-facing, so nobody appears there until they choose to.
alter table public.profiles
  add column total_xp integer not null default 0,
  add column show_on_leaderboard boolean not null default false;

-- ── game_activities ───────────────────────────────────────────────────────
-- A catalog of learning activities. 'interactive' types may link out to an
-- external experience (content_url, e.g. decodedactivities); 'lesson'/'quiz'
-- are self-contained scaffolding for now.
create table public.game_activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  type text not null default 'lesson' check (type in ('lesson', 'quiz', 'interactive')),
  description text,
  xp_value integer not null default 0 check (xp_value >= 0),
  content_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index game_activities_published_idx on public.game_activities (is_published);

-- ── activity_completions ──────────────────────────────────────────────────
-- One row per user per activity. Inserted only by the completion Server Action
-- (service role) — no client-facing insert policy, mirroring activity_logs.
create table public.activity_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  activity_id uuid not null references public.game_activities (id) on delete cascade,
  completed_at timestamptz not null default now(),
  score numeric,
  unique (user_id, activity_id)
);

create index activity_completions_user_id_idx on public.activity_completions (user_id);
create index activity_completions_activity_id_idx on public.activity_completions (activity_id);

-- ── badges ────────────────────────────────────────────────────────────────
-- Catalog of earnable badges. icon is a simple identifier/emoji for now (not a
-- file upload). criteria_type + criteria_value are evaluated server-side after
-- each completion.
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  criteria_type text not null check (criteria_type in ('xp_threshold', 'activity_count')),
  criteria_value integer not null default 0 check (criteria_value >= 0),
  created_at timestamptz not null default now()
);

-- ── user_badges ───────────────────────────────────────────────────────────
-- Awarded badges. Inserted only by the completion Server Action (service role).
create table public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

create index user_badges_user_id_idx on public.user_badges (user_id);

-- ── RLS ───────────────────────────────────────────────────────────────────
alter table public.game_activities enable row level security;
alter table public.activity_completions enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- game_activities: public read where published; admin full access. Same shape
-- as news_posts.
create policy "game_activities_select_published_or_admin"
  on public.game_activities for select
  using (is_published or public.is_admin());

create policy "game_activities_insert_admin"
  on public.game_activities for insert
  with check (public.is_admin());

create policy "game_activities_update_admin"
  on public.game_activities for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "game_activities_delete_admin"
  on public.game_activities for delete
  using (public.is_admin());

-- activity_completions: users read their own; admins read all. No client-side
-- writes — inserts happen only via the service-role client in the completion
-- Server Action (which also bumps total_xp and awards badges atomically-ish),
-- so no insert/update/delete policy is defined for authenticated/anon.
create policy "activity_completions_select_own_or_admin"
  on public.activity_completions for select
  using (auth.uid() = user_id or public.is_admin());

-- badges: catalog is world-readable (so everyone can see what's earnable);
-- admin write.
create policy "badges_select_public"
  on public.badges for select
  using (true);

create policy "badges_insert_admin"
  on public.badges for insert
  with check (public.is_admin());

create policy "badges_update_admin"
  on public.badges for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "badges_delete_admin"
  on public.badges for delete
  using (public.is_admin());

-- user_badges: users read their own; admins read all. Writes only via service
-- role (the completion Server Action). The public leaderboard reads opted-in
-- profiles through the service-role client too, so no cross-user select policy
-- is needed here.
create policy "user_badges_select_own_or_admin"
  on public.user_badges for select
  using (auth.uid() = user_id or public.is_admin());

-- ── GRANTs ────────────────────────────────────────────────────────────────
-- Raw SQL migrations skip the auto-grants the Table Editor UI applies, so base
-- table access must be granted explicitly alongside RLS — the same gap that bit
-- profiles/events earlier in this project. RLS restricts WHICH rows; these
-- GRANTs allow touching the table at all.
--
-- game_activities & badges are publicly readable, so anon gets select too.
grant select on public.game_activities to anon, authenticated;
grant select, insert, update, delete on public.game_activities to service_role;

grant select on public.activity_completions to authenticated;
grant select, insert, update, delete on public.activity_completions to service_role;

grant select on public.badges to anon, authenticated;
grant select, insert, update, delete on public.badges to service_role;

grant select on public.user_badges to authenticated;
grant select, insert, update, delete on public.user_badges to service_role;
