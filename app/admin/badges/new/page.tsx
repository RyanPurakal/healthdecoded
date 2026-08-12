import { createBadge } from '../actions';
import BadgeForm from '../BadgeForm';

export const metadata = {
  title: 'New Badge',
};

export default function NewBadgePage() {
  return (
    <div className="hd-app-card">
      <p className="hd-app-card-title">New Badge</p>
      <BadgeForm action={createBadge} submitLabel="Create Badge" />
    </div>
  );
}
