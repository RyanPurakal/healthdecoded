'use client';

import { Button } from '@/components/ui/button';

export default function DonateModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} aria-label="Close modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-body">
          <h3>Coming Soon</h3>
          <p>Our donation page is currently under development. Check back soon to support our mission!</p>
          <Button className="w-full mt-4" size="lg" onClick={onClose}>Got it</Button>
        </div>
      </div>
    </div>
  );
}
