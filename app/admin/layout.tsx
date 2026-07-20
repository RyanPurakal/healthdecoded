// Admin shell: role check (middleware already gates /admin; this is a defense-in-depth
// check for direct Server Component data access) + tab navigation.
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from './AdminNav';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/admin');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="hd-app-page">
      <div className="hd-app-container">
        <p className="hd-app-eyebrow">Admin</p>
        <h1 className="hd-app-heading">Manage Health Decoded</h1>
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
