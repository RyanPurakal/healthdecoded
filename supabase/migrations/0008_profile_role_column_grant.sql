-- Close the role self-promotion gap on profiles (the sibling of the total_xp
-- gap that 0007 closed).
--
-- 0007 revoked the table-level UPDATE from `authenticated` but re-granted a
-- column allowlist that still included `role`. Because profiles_update_own_or_admin
-- lets a user UPDATE their own row, that allowlist let any authenticated user set
-- their own role to 'admin' — a privilege escalation. (Verified against the live
-- DB: an authenticated user could update role on their own row after 0007.)
--
-- The fix has two halves:
--   1. This migration re-issues the column allowlist WITHOUT `role`, so
--      authenticated can no longer write role at all.
--   2. app/admin/users/actions.ts (updateUserRole) now performs the role write
--      through the service-role client, after its existing server-side admin
--      check — so legitimate admin role changes still work.
--
-- Re-runnable and forward-only: the REVOKE drops every column-level UPDATE grant
-- authenticated holds, then the GRANT re-establishes only the intended columns.
-- Safe on a DB that already ran 0007 and on a fresh replay.

revoke update on public.profiles from authenticated;

-- Columns intentionally granted (a user editing their own profile):
--   full_name, school_or_org, grade, bio, avatar_url  → app/profile/actions.ts (updateProfile)
--   show_on_leaderboard                                → app/profile/actions.ts (setLeaderboardVisibility)
-- Columns intentionally NOT granted: id, created_at, total_xp, role.
--   total_xp → written only by completeActivity() as service_role.
--   role     → written only by updateUserRole as service_role (admin-gated).
grant update (full_name, school_or_org, grade, bio, avatar_url, show_on_leaderboard)
  on public.profiles to authenticated;

-- Verify AFTER applying (run in the Supabase SQL Editor — remember it runs as
-- postgres, which bypasses grants, so you MUST simulate the authenticated role):
--
--   -- role must be ABSENT here; total_xp too. The other five present.
--   select column_name
--   from information_schema.column_privileges
--   where table_schema = 'public' and table_name = 'profiles'
--     and grantee = 'authenticated' and privilege_type = 'UPDATE'
--   order by column_name;
--
--   -- Expect ERROR 42501 (permission denied) on the own-row role write:
--   begin;
--     set local role authenticated;
--     set local request.jwt.claims = '{"sub":"<A_REAL_PROFILE_ID>","role":"authenticated"}';
--     update public.profiles set role = 'admin' where id = '<A_REAL_PROFILE_ID>';
--   rollback;
