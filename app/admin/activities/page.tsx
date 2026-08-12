import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ActivityRowActions from './ActivityRowActions';

export const metadata = {
  title: 'Manage Activities',
};

export default async function AdminActivitiesPage() {
  const supabase = await createClient();
  const { data: activities } = await supabase
    .from('game_activities')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="hd-app-card">
      <div className="hd-app-row" style={{ borderBottom: 'none', paddingTop: 0 }}>
        <p className="hd-app-card-title" style={{ marginBottom: 0 }}>All Activities</p>
        <Link href="/admin/activities/new" className="ct-btn ct-btn-filled">
          New Activity
        </Link>
      </div>

      {!activities || activities.length === 0 ? (
        <p className="hd-app-empty">No activities yet.</p>
      ) : (
        activities.map((activity) => (
          <div className="hd-app-row" key={activity.id}>
            <div>
              <div className="hd-app-row-title">{activity.title}</div>
              <div className="hd-app-row-meta">
                {activity.type} · {activity.xp_value} XP
              </div>
            </div>
            <ActivityRowActions activityId={activity.id} isPublished={activity.is_published} />
          </div>
        ))
      )}
    </div>
  );
}
