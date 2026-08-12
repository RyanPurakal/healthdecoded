-- Close the XP-integrity gap on profiles.total_xp.
--
-- The problem: profiles_update_own_or_admin lets a user UPDATE their own row,
-- and `authenticated` held a TABLE-level UPDATE grant — which implicitly covers
-- every column. So a user could PATCH their own profiles row and set total_xp
-- directly through the client, bypassing completeActivity() (the only intended
-- writer of XP, which runs as service_role). RLS restricts WHICH ROW; it does
-- nothing about WHICH COLUMNS. Column-level privileges are the right layer.
--
-- The fix: revoke the blanket table-level UPDATE from `authenticated`, then
-- re-grant UPDATE on only the columns a user (or an admin, via the authenticated
-- client) edits. total_xp is omitted, so it can only be written by service_role.
--
-- Postgres note: you CANNOT revoke a single column while a table-level UPDATE
-- grant remains — the table grant still permits updating all columns. You must
-- drop the table-level grant and enumerate the allowed columns.
--
-- FOLLOW-UP: this migration still grants `role` to authenticated (updateUserRole
-- wrote role through the authenticated client at the time). That left the same
-- class of hole for role — a user could self-promote to admin on their own row.
-- Migration 0008 closes that by dropping `role` from this allowlist (and
-- updateUserRole now writes role as service_role instead). SELECT / INSERT /
-- DELETE grants are untouched here.

revoke update on public.profiles from authenticated;

grant update (full_name, school_or_org, grade, bio, avatar_url, show_on_leaderboard, role)
  on public.profiles to authenticated;

grant update on public.profiles to service_role;
