-- Fix: profiles.role was coming up null for new signups. The 0001 migration
-- did define `role text not null default 'volunteer'` on the column, but the
-- handle_new_user() trigger only ever inserted (id, full_name) and relied on
-- that default applying — if the live database's column default ever drifted
-- from what's in 0001 (e.g. table modified by hand), new rows would violate
-- the not-null constraint or otherwise fail to get a role. This migration
-- makes both the column default and the trigger explicit, so either one
-- alone is enough to guarantee a role is set.
--
-- Idempotent: uses CREATE OR REPLACE FUNCTION (not a bare CREATE) and
-- ALTER COLUMN ... SET DEFAULT (safe to re-run). Does not touch existing
-- rows, RLS policies, other tables, or other trigger logic.

-- Safety net 1: explicit column default.
alter table public.profiles
  alter column role set default 'volunteer';

-- Safety net 2: trigger explicitly sets role instead of relying solely on
-- the column default. CREATE OR REPLACE keeps the existing
-- "on_auth_user_created" trigger's binding to this function intact — no
-- need to redefine the trigger itself.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data ->> 'full_name', 'volunteer')
  on conflict (id) do nothing;
  return new;
end;
$$;
