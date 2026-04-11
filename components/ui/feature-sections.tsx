'use client';

import { Sparkles } from 'lucide-react';
import { FadeInSection } from '@/components/motion/fade-in-section';
import { StaggerFadeContainer, StaggerFadeItem } from '@/components/motion/stagger-fade';

export default function ProgramsFeatureSections() {
  return (
    <FadeInSection as="div" delay={0}>
      <section className="hd-themed-surface programs-features" aria-label="Our programs">
        <div className="hd-themed-inner">
          <div className="programs-features__header team-section-modern-header">
            <span className="team-section-modern-pill">
              <Sparkles className="team-section-modern-pill-icon" aria-hidden />
              Programs
            </span>
            <h2 className="team-section-modern-title">
              Our <span className="hd-gradient-text">Programs</span>
            </h2>
            <p className="team-section-modern-subtitle">
              Two core ways we help youth build real health literacy skills – in classrooms
              and through peer leadership.
            </p>
          </div>

          <StaggerFadeContainer className="programs-features__grid">
            <StaggerFadeItem>
              <article className="programs-feature-card">
                <div className="programs-feature-card__image-wrapper">
                  <img
                    src="/images/events/workshop-opqrst.png"
                    alt="Students learning in a classroom workshop"
                    className="programs-feature-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>Health Decoded School Workshops</h3>
                <p className="programs-feature-card__subtitle">Flagship initiative</p>
                <p className="programs-feature-card__body">
                  In‑school and after‑school workshops where students practice navigating real‑world
                  health situations – from doctor&apos;s visits to understanding prescriptions and insurance.
                </p>
                <ul className="programs-feature-card__list">
                  <li>How to prepare for and navigate a doctor&apos;s visit</li>
                  <li>Reading prescriptions, labs, and insurance terms</li>
                  <li>Communicating symptoms clearly</li>
                  <li>Basic anatomy and first‑aid essentials</li>
                  <li>Recognizing emergencies vs. non‑emergencies</li>
                </ul>
                <p className="programs-feature-card__target">
                  <strong>Best for:</strong> K–12 classrooms and youth programs
                </p>
              </article>
            </StaggerFadeItem>

            <StaggerFadeItem>
              <article className="programs-feature-card">
                <div className="programs-feature-card__image-wrapper">
                  <img
                    src="/images/events/workshop-ehealth.png"
                    alt="Peer ambassadors leading a discussion"
                    className="programs-feature-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>Peer Health Ambassador Program</h3>
                <p className="programs-feature-card__subtitle">Youth leadership</p>
                <p className="programs-feature-card__body">
                  A leadership track where students become peer educators, practice public speaking,
                  and learn how to spot misinformation and advocate for their communities.
                </p>
                <ul className="programs-feature-card__list">
                  <li>Training in communication and facilitation</li>
                  <li>Health misinformation and media literacy</li>
                  <li>Advocacy and storytelling</li>
                  <li>Co‑leading Health Decoded workshops</li>
                </ul>
                <p className="programs-feature-card__target">
                  <strong>Best for:</strong> High‑school and college‑age youth
                </p>
              </article>
            </StaggerFadeItem>
          </StaggerFadeContainer>
        </div>
      </section>
    </FadeInSection>
  );
}
