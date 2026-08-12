// Profile page: view/edit own profile (avatar, name, school/org, grade, bio).
// Access is gated by middleware.ts (redirects to /login if unauthenticated).
import { createClient } from '@/lib/supabase/server';
import ProfileView from './ProfileView';
import DataExportButton from './DataExportButton';
import DeletionRequestButton from './DeletionRequestButton';
import ServiceHoursSection from './ServiceHoursSection';
import GamificationSection, { type EarnedBadge } from './GamificationSection';
import type { ServiceHour } from '@/types/database';

export const metadata = {
  title: 'My Profile',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: profile }, { data: hoursData }, { data: badgeRows }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('service_hours').select('*').eq('user_id', user.id).order('submitted_at', { ascending: false }),
    supabase
      .from('user_badges')
      .select('awarded_at, badges(*)')
      .eq('user_id', user.id)
      .order('awarded_at', { ascending: false }),
  ]);

  const hours = (hoursData ?? []) as ServiceHour[];

  // Flatten the joined badge rows into { ...badge, awarded_at }.
  const badges = ((badgeRows ?? []) as unknown as { awarded_at: string; badges: EarnedBadge | null }[])
    .filter((row) => row.badges)
    .map((row) => ({ ...(row.badges as EarnedBadge), awarded_at: row.awarded_at }));

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Account</p>
        <h1 className="hd-app-heading">My Profile</h1>
        <p className="hd-app-subtitle">Update your info — visible to Health Decoded admins.</p>

        <ProfileView profile={profile} email={user.email ?? ''} />

        <GamificationSection
          totalXp={profile?.total_xp ?? 0}
          showOnLeaderboard={profile?.show_on_leaderboard ?? false}
          badges={badges}
        />

        <ServiceHoursSection hours={hours} />

        <div className="hd-app-card">
          <p className="hd-app-card-title">Your Data</p>
          <div className="hd-app-row">
            <span className="hd-app-row-title">Export everything tied to your account</span>
            <DataExportButton />
          </div>
          <div className="hd-app-row">
            <span className="hd-app-row-title">Delete your account</span>
            <DeletionRequestButton />
          </div>
        </div>
      </div>
    </div>
  );
}
