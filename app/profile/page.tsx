// Profile page: view/edit own profile (avatar, name, school/org, grade, bio).
// Access is gated by middleware.ts (redirects to /login if unauthenticated).
import { createClient } from '@/lib/supabase/server';
import ProfileView from './ProfileView';

export const metadata = {
  title: 'My Profile',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Account</p>
        <h1 className="hd-app-heading">My Profile</h1>
        <p className="hd-app-subtitle">Update your info — visible to Health Decoded admins.</p>

        <ProfileView profile={profile} email={user.email ?? ''} />
      </div>
    </div>
  );
}
