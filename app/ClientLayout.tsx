// Client-side site shell: wraps every page with Navbar, Footer, and DonateModal; fires GA pageviews on route change; manages body scroll-lock when the donate modal is open.
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { pageview } from '@/utils/analytics';
import { DonateProvider, useDonate } from '@/app/DonateContext';
import Navbar, { type NavAuthState } from '@/components/Navbar';
import DonateModal from '@/components/DonateModal';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';

function ClientLayoutInner({ children, authState }: { children: ReactNode; authState: NavAuthState }) {
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
      <Navbar onDonateClick={() => setShowDonateModal(true)} authState={authState} />
      <div className="page-content">{children}</div>
      <Footer />
      {showDonateModal && (
        <DonateModal onClose={() => setShowDonateModal(false)} />
      )}
    </>
  );
}

export function ClientLayout({
  children,
  authState,
}: {
  children: ReactNode;
  authState: NavAuthState;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <DonateProvider>
        <ClientLayoutInner authState={authState}>{children}</ClientLayoutInner>
      </DonateProvider>
    </MotionConfig>
  );
}
