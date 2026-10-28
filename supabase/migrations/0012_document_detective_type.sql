-- Add 'document_detective' as an activity type (the hotspot "click the region"
-- format). 'interactive' keeps its meaning of "links out via content_url".
--
-- The type CHECK from 0006 has to be replaced, not amended. Look up its actual
-- name from the catalog rather than assuming, then re-add a widened one.

do $$
declare cname text;
begin
  select conname into cname
  from pg_constraint
  where conrelid = 'public.game_activities'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%type%in%';
  if cname is not null then
    execute format('alter table public.game_activities drop constraint %I', cname);
  end if;
end $$;

alter table public.game_activities
  add constraint game_activities_type_check
  check (type in ('lesson', 'quiz', 'interactive', 'document_detective'));
