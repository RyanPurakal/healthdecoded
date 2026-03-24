'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/utils/analytics';
import { DonateProvider, useDonate } from '@/app/DonateContext';
import Navbar from '@/components/Navbar';
import DonateModal from '@/components/DonateModal';

function ClientLayoutInner({ children }) {
  const { showDonateModal, setShowDonateModal } = useDonate();
  const pathname = usePathname();

  useEffect(() => {
    if (showDonateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDonateModal]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      pageview(pathname + (typeof window !== 'undefined' ? window.location.search : ''));
    }
  }, [pathname]);

  return (
    <>
      <Navbar onDonateClick={() => setShowDonateModal(true)} />
      <div className="page-content">{children}</div>
      {showDonateModal && (
        <DonateModal onClose={() => setShowDonateModal(false)} />
      )}
    </>
  );
}

export function ClientLayout({ children }) {
  return (
    <DonateProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </DonateProvider>
  );
}
