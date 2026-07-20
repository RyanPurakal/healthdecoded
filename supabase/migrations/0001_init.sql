-- Health Decoded — phase one schema: auth profiles, events, event registrations,
-- activity logs, news posts. Gamification is a later phase and is intentionally
-- absent here.

create extension if not exists "pgcrypto";

-- ── profiles ──────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'volunteer' check (role in ('ambassador', 'volunteer', 'admin')),
  school_or_org text,
  created_at timestamptz not null default now()
);

-- ── events ────────────────────────────────────────────────────────────────
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

create index events_event_date_idx on public.events (event_date);

-- ── event_registrations ──────────────────────────────────────────────────
create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'registered' check (status in ('registered', 'attended', 'cancelled')),
  registered_at timestamptz not null default now(),
  unique (event_id, user_id)
);

create index event_registrations_event_id_idx on public.event_registrations (event_id);
create index event_registrations_user_id_idx on public.event_registrations (user_id);

-- ── activity_logs ─────────────────────────────────────────────────────────
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  action text not null,
  event_id uuid references public.events (id) on delete set null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index activity_logs_user_id_idx on public.activity_logs (user_id);

-- ── news_posts ────────────────────────────────────────────────────────────
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  body text not null,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index news_posts_status_published_at_idx on public.news_posts (status, published_at desc);

-- ── auto-create a profile row when a new auth user signs up ────────────────
-- Runs as SECURITY DEFINER so it bypasses RLS; this is the only path that
-- inserts into profiles (no client-facing insert policy is defined below).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── is_admin() helper ────────────────────────────────────────────────────
-- SECURITY DEFINER so policies that call it don't recurse back through
-- profiles' own RLS (which would otherwise self-reference and fail).
create function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.activity_logs enable row level security;
alter table public.news_posts enable row level security;

-- profiles: users read/update their own row; admins read/update all.
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- events: public read; admin write.
create policy "events_select_public"
  on public.events for select
  using (true);

create policy "events_insert_admin"
  on public.events for insert
  with check (public.is_admin());

create policy "events_update_admin"
  on public.events for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "events_delete_admin"
  on public.events for delete
  using (public.is_admin());

-- event_registrations: users read/write their own rows; admins read/write all.
create policy "event_registrations_select_own_or_admin"
  on public.event_registrations for select
  using (auth.uid() = user_id or public.is_admin());

create policy "event_registrations_insert_own_or_admin"
  on public.event_registrations for insert
  with check (auth.uid() = user_id or public.is_admin());

create policy "event_registrations_update_own_or_admin"
  on public.event_registrations for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

create policy "event_registrations_delete_own_or_admin"
  on public.event_registrations for delete
  using (auth.uid() = user_id or public.is_admin());

-- activity_logs: users read their own; admins read all. No client-side
-- writes at all — inserts only happen server-side via the service role
-- client, which bypasses RLS entirely, so no insert/update/delete policy
-- is defined for the authenticated/anon roles.
create policy "activity_logs_select_own_or_admin"
  on public.activity_logs for select
  using (auth.uid() = user_id or public.is_admin());

-- news_posts: public read where published; admin full access.
create policy "news_posts_select_published_or_admin"
  on public.news_posts for select
  using (status = 'published' or public.is_admin());

create policy "news_posts_insert_admin"
  on public.news_posts for insert
  with check (public.is_admin());

create policy "news_posts_update_admin"
  on public.news_posts for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "news_posts_delete_admin"
  on public.news_posts for delete
  using (public.is_admin());
