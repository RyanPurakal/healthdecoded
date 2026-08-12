-- Seed the base badge set (hd-module-catalog.md, Part 4). These map 1:1 to the
-- existing badges schema (criteria_type is 'activity_count' or 'xp_threshold').
--
-- Idempotent: each row inserts only if a badge of that name doesn't already
-- exist, so re-running is safe (badges has no unique constraint on name).
--
-- The catalog's "worth adding later" badges (Paper Trail, Numbers Person,
-- Signal Boost, streaks) need a criteria_type beyond the current two — that's a
-- schema change, deliberately deferred until the base set is working.

insert into public.badges (name, description, icon, criteria_type, criteria_value)
select v.name, v.description, v.icon, v.criteria_type, v.criteria_value
from (values
  ('First Steps',    'Complete your first activity.', '👣', 'activity_count', 1),
  ('Getting Fluent', 'Complete 5 activities.',        '📚', 'activity_count', 5),
  ('Decoder',        'Complete 15 activities.',       '🔍', 'activity_count', 15),
  ('Fully Decoded',  'Complete 30 activities.',       '🧠', 'activity_count', 30),
  ('Century Club',   'Earn 100 XP.',                  '💯', 'xp_threshold',   100),
  ('Five Hundred',   'Earn 500 XP.',                  '⭐', 'xp_threshold',   500),
  ('Thousand Club',  'Earn 1,000 XP.',                '🏆', 'xp_threshold',   1000)
) as v(name, description, icon, criteria_type, criteria_value)
where not exists (
  select 1 from public.badges b where b.name = v.name
);
