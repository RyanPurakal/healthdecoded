-- Richer profile fields + avatar upload storage.
--
-- Note on grants: storage.objects/storage.buckets are pre-existing Supabase
-- platform tables (part of every project's baseline schema, provisioned by
-- Supabase itself), not something this migration creates from scratch — so
-- they are NOT subject to the same "raw SQL migrations skip the auto-grants
-- that the Table Editor UI applies" gap that hit public.profiles/events/etc.
-- Storage's default grants to anon/authenticated already cover SELECT/
-- INSERT/UPDATE/DELETE on storage.objects; RLS policies (below) are what
-- actually restrict access. Verify this on your project with the same
-- query used to catch the profiles gap — see the check at the bottom of
-- this file's accompanying chat message.

-- ── profiles: new fields ────────────────────────────────────────────────
alter table public.profiles
  add column avatar_url text,
  add column grade text,
  add column bio text;

-- ── avatars storage bucket ──────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Public read: anyone can view avatars (bucket is public).
create policy "avatars_select_public"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Authenticated users may only insert/update/delete objects inside their
-- own folder: avatars/{user_id}/*. storage.foldername() splits the object
-- path into segments; [1] is the first path segment.
create policy "avatars_insert_own_folder"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_update_own_folder"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_delete_own_folder"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
