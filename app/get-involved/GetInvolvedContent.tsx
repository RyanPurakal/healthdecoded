// Get Involved content: four participation cards (Volunteer, Ambassador, Chapter, Partner) each linking out to a Google Form or Linktree; uses stagger animation for card entry.
'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/motion/fade-in-section';
import { StaggerFadeContainer, StaggerFadeItem } from '@/components/motion/stagger-fade';

export default function GetInvolvedContent() {
  return (
    <div className="get-involved-page">
      <FadeInSection as="div" delay={0}>
        <section className="hd-themed-surface programs-features" aria-label="Get Involved">
          <div className="hd-themed-inner">
            <div className="programs-features__header team-section-modern-header">
              <span className="team-section-modern-pill">
                <Sparkles className="team-section-modern-pill-icon" aria-hidden />
                Join us
              </span>
              <h2 className="team-section-modern-title">
                Get <span className="hd-gradient-text">Involved</span>
              </h2>
              <p className="team-section-modern-subtitle">
                Join us in empowering youth through health education
              </p>
            </div>

            <div className="get-involved-linktree-wrap flex justify-center mb-10 md:mb-12">
              <div className="get-involved-linktree">
                <a
                  className="button-icon"
                  href="https://linktr.ee/healthdecodedinit"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Health Decoded Linktree"
                >
                  <span className="icon" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l1.92-1.92a5 5 0 0 0-7.07-7.07l-1.08 1.08" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54L4.54 12.38a5 5 0 1 0 7.07 7.07l1.08-1.08" />
                    </svg>
                  </span>
                  <span className="cube" aria-hidden="true">
                    <span className="side front">Linktree</span>
                    <span className="side top">Open</span>
                  </span>
                </a>
              </div>
            </div>

            <StaggerFadeContainer className="programs-features__grid">
              <StaggerFadeItem>
                <article className="programs-feature-card">
                  <div className="programs-feature-card__image-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                      alt="Volunteers helping with community health education"
                      className="programs-feature-card__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>Volunteer</h3>
                  <p className="programs-feature-card__subtitle">Join the team</p>
                  <p className="programs-feature-card__body">Join us in making health education accessible to all youth.</p>
                  <div className="mt-8 pt-4">
                    <Button href="https://forms.gle/oM3SsuVrcVV6xy8ZA" target="_blank">Get Started</Button>
                  </div>
                </article>
              </StaggerFadeItem>

              <StaggerFadeItem>
                <article className="programs-feature-card">
                  <div className="programs-feature-card__image-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                      alt="Peer ambassadors leading a workshop"
                      className="programs-feature-card__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>Become an Ambassador</h3>
                  <p className="programs-feature-card__subtitle">Lead your peers</p>
                  <p className="programs-feature-card__body">Lead peer education workshops and advocate for health literacy in your area.</p>
                  <div className="mt-8 pt-4">
                    <Button href="https://forms.gle/j8TqzZV3BYvd4kBb9" target="_blank">Get Started</Button>
                  </div>
                </article>
              </StaggerFadeItem>

              <StaggerFadeItem>
                <article className="programs-feature-card">
                  <div className="programs-feature-card__image-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                      alt="Students starting a new chapter"
                      className="programs-feature-card__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>Create a New Chapter</h3>
                  <p className="programs-feature-card__subtitle">Expand the reach</p>
                  <p className="programs-feature-card__body">Start Health Decoded in your local community, university or school.</p>
                  <div className="mt-8 pt-4">
                    <Button href="https://docs.google.com/forms/d/e/1FAIpQLSe73_Eb1v4pqS0ps0mgwa3_s7vbcRY3ZdqqmQpmk5-90VvdCA/viewform?usp=publish-editor" target="_blank">Get Started</Button>
                  </div>
                </article>
              </StaggerFadeItem>

              <StaggerFadeItem>
                <article className="programs-feature-card">
                  <div className="programs-feature-card__image-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80"
                      alt="Organizations partnering together"
                      className="programs-feature-card__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3>Partner With Us</h3>
                  <p className="programs-feature-card__subtitle">Organizations</p>
                  <p className="programs-feature-card__body">Schools, organizations, and institutions - let&apos;s work together.</p>
                  <div className="mt-8 pt-4">
                    <Button href="https://forms.gle/Q9u3LFereNudSuF48" target="_blank">Get Started</Button>
                  </div>
                </article>
              </StaggerFadeItem>
            </StaggerFadeContainer>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}
