-- Account deletion requests. Request-based, not instant: inserting a row
-- here does not delete any data — actual auth.users/profile removal stays
-- a manual admin step in Supabase for now, deliberately not automated.

create table public.deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  user_email text not null,
  requested_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'completed')),
  notes text
);

create index deletion_requests_user_id_idx on public.deletion_requests (user_id);
create index deletion_requests_status_idx on public.deletion_requests (status);

alter table public.deletion_requests enable row level security;

-- Users can insert/read their own request; only admins can read/update all.
create policy "deletion_requests_select_own_or_admin"
  on public.deletion_requests for select
  using (auth.uid() = user_id or public.is_admin());

create policy "deletion_requests_insert_own"
  on public.deletion_requests for insert
  with check (auth.uid() = user_id);

create policy "deletion_requests_update_admin"
  on public.deletion_requests for update
  using (public.is_admin())
  with check (public.is_admin());

-- Explicit GRANTs (RLS restricts rows, but base table access must still be
-- granted independently — this is the gap that bit profiles/events before).
grant select, insert, update on public.deletion_requests to authenticated;
grant select, insert, update, delete on public.deletion_requests to service_role;
