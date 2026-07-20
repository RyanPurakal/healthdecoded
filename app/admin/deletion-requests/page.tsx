import { createClient } from '@/lib/supabase/server';
import CompleteButton from './CompleteButton';

export const metadata = {
  title: 'Deletion Requests',
};

export default async function AdminDeletionRequestsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from('deletion_requests')
    .select('*')
    .order('requested_at', { ascending: false });

  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">Account Deletion Requests</p>
      <p className="hd-app-row-meta" style={{ marginBottom: 16 }}>
        Marking a request &ldquo;Completed&rdquo; only updates its status here as a checklist item
        — it does <strong>not</strong> delete any account data. Actual removal of the user&apos;s
        auth account and profile is a manual step in the Supabase dashboard.
      </p>

      {!requests || requests.length === 0 ? (
        <p className="hd-app-empty">No deletion requests.</p>
      ) : (
        requests.map((req) => (
          <div className="hd-app-row" key={req.id}>
            <div>
              <div className="hd-app-row-title">{req.user_email}</div>
              <div className="hd-app-row-meta">
                Requested {new Date(req.requested_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
            {req.status === 'completed' ? (
              <span className="hd-app-status hd-app-status--attended">Completed</span>
            ) : (
              <CompleteButton requestId={req.id} />
            )}
          </div>
        ))
      )}
    </div>
  );
}
