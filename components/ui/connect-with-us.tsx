'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { FadeInSection } from '@/components/motion/fade-in-section';

export default function SocialConnect() {
  return (
    <FadeInSection as="section" className="py-12 sm:py-16 px-4 sm:px-6 relative" delay={0.08}>
      <div className="hd-themed-surface max-w-[1200px] mx-auto">
        <div className="hd-themed-inner text-center px-1">
          <div className="team-section-modern-header">
            <p className="team-section-modern-pill">
              <MessageCircle className="team-section-modern-pill-icon" aria-hidden />
              Community
            </p>
            <h2 className="team-section-modern-title">
              Connect <span className="hd-gradient-text">With Us</span>
            </h2>
            <p className="team-section-modern-subtitle">
              Join our community and stay updated with the latest initiatives and health education resources.
            </p>
          </div>

          <Link
            href="/contact"
            className="group mt-10 sm:mt-12 block max-w-xl mx-auto bg-beige-light rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 shadow-xl border border-beige-dark hover:border-indigo-100 text-left hd-card-lift"
            aria-label="Navigate to the Contact page"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-[#4F62F8] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-black uppercase tracking-widest mb-1">Reach out to us</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-black group-hover:text-[#4F62F8] transition-colors break-words">Contact Us Page</p>
                </div>
              </div>
              <div className="text-black group-hover:text-[#4F62F8] group-hover:translate-x-2 transition-all duration-300 self-end sm:self-auto shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}
