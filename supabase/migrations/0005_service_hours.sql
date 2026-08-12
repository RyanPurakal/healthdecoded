-- Service-hour tracking. Volunteers accrue hours (auto-created when an admin
-- marks them attended at an event, or submitted manually for work outside a
-- tracked event); admins verify/reject them.

create table public.service_hours (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  event_id uuid references public.events (id) on delete set null,
  hours numeric not null check (hours > 0),
  description text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  submitted_at timestamptz not null default now(),
  verified_by uuid references public.profiles (id) on delete set null,
  verified_at timestamptz
);

create index service_hours_user_id_idx on public.service_hours (user_id);
create index service_hours_status_idx on public.service_hours (status);

alter table public.service_hours enable row level security;

-- Users insert/read their own; admins read/update all.
create policy "service_hours_select_own_or_admin"
  on public.service_hours for select
  using (auth.uid() = user_id or public.is_admin());

create policy "service_hours_insert_own"
  on public.service_hours for insert
  with check (auth.uid() = user_id);

create policy "service_hours_update_admin"
  on public.service_hours for update
  using (public.is_admin())
  with check (public.is_admin());

-- Explicit GRANTs (RLS restricts rows, but base table access must still be
-- granted independently — this is the gap that bit profiles/events before).
-- Note: auto-created rows (on event attendance) are inserted for OTHER users
-- by an admin, which the "insert your own" policy forbids — those go through
-- the service-role client, which bypasses RLS. Manual /profile submissions
-- insert the user's own row and satisfy the policy directly.
grant select, insert, update on public.service_hours to authenticated;
grant select, insert, update, delete on public.service_hours to service_role;
