import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BadgeRowActions from './BadgeRowActions';

export const metadata = {
  title: 'Manage Badges',
};

const CRITERIA_LABEL: Record<string, string> = {
  xp_threshold: 'XP ≥',
  activity_count: 'Activities ≥',
};

export default async function AdminBadgesPage() {
  const supabase = await createClient();
  const { data: badges } = await supabase.from('badges').select('*').order('created_at', { ascending: false });

  return (
    <div className="hd-app-card">
      <div className="hd-app-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
        <p className="hd-app-card-title" style={{ marginBottom: 0 }}>All Badges</p>
        <Link href="/admin/badges/new" className="ct-btn ct-btn-filled">
          New Badge
        </Link>
      </div>

      {!badges || badges.length === 0 ? (
        <p className="hd-app-empty">No badges yet.</p>
      ) : (
        badges.map((badge) => (
          <div className="hd-app-row" key={badge.id}>
            <div>
              <div className="hd-app-row-title">
                {badge.icon ? `${badge.icon} ` : ''}
                {badge.name}
              </div>
              <div className="hd-app-row-meta">
                {CRITERIA_LABEL[badge.criteria_type] ?? badge.criteria_type} {badge.criteria_value}
              </div>
            </div>
            <BadgeRowActions badgeId={badge.id} />
          </div>
        ))
      )}
    </div>
  );
}
