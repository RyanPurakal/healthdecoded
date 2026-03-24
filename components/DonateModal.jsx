'use client';

import ShimmerButton from '@/components/ui/shimmer-button';

export default function DonateModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} aria-label="Close modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-body">
          <h3>Coming Soon</h3>
          <p>Our donation page is currently under development. Check back soon to support our mission!</p>
          <ShimmerButton className="modal-button" onClick={onClose}>Got it</ShimmerButton>
        </div>
      </div>
    </div>
  );
}
