-- Instagram → events auto-sync: stores Instagram media auto-matched to an
-- event by the /api/cron/sync-instagram job, so past events can show a
-- photo gallery pulled from the org's Instagram account.

create table public.event_instagram_posts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  ig_media_id text not null unique,
  media_type text not null,
  media_url text not null,
  permalink text not null,
  caption text,
  posted_at timestamptz not null,
  matched_method text not null check (matched_method in ('caption', 'date_proximity')),
  created_at timestamptz not null default now()
);

create index event_instagram_posts_event_id_idx on public.event_instagram_posts (event_id);

alter table public.event_instagram_posts enable row level security;

-- public read, same as events itself
create policy "event_instagram_posts_select_public"
  on public.event_instagram_posts for select
  to authenticated, anon
  using (true);

-- writes only ever happen via the service-role cron job
grant select on public.event_instagram_posts to authenticated, anon;
grant select, insert, update, delete on public.event_instagram_posts to service_role;
