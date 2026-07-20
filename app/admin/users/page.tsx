// Admin: view all profiles and change roles. Emails aren't stored in
// profiles (they live on auth.users), so they're cross-referenced here via
// the GoTrue admin API using the service-role client — admin-only surface.
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import RoleSelect from './RoleSelect';

export const metadata = {
  title: 'Manage Users',
};

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  const admin = createAdminClient();
  // No pagination UI here (out of scope for now — see note below); this covers
  // the first page of auth users (up to 1000), which is the current ceiling
  // GoTrue's admin API supports in one call.
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map(usersPage?.users.map((u) => [u.id, u.email ?? '—']) ?? []);

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">All Users</p>
      {!profiles || profiles.length === 0 ? (
        <p className="hd-app-empty">No users yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="hd-app-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.full_name || '—'}</td>
                  <td>{emailById.get(profile.id) ?? '—'}</td>
                  <td>
                    <RoleSelect userId={profile.id} role={profile.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
