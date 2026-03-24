'use client';

import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import SocialConnect from '@/components/ui/connect-with-us';

export default function HomeClient() {
  return (
    <div className="home-page">
      <section className="hero" aria-label="Hero section">
        <div className="hero-background" />
        <div className="hero-image-overlay">
          <img
            src="/images/events/community-tables.png"
            alt="Youth participating at a Health Decoded event"
            className="hero-overlay-image"
            loading="eager"
            aria-hidden="true"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80";
            }}
          />
        </div>
        <div className="container hero-content">
          <div className="hero-text-wrapper">
            <h1>Health education, decoded for youth.</h1>
            <p className="hero-subtitle">
              Building an international community of youth using health education to change the world
            </p>
            <div className="hero-cta-group">
              <InteractiveHoverButton
                to="/programs"
                text="Explore our programs"
                classes="interactive-hover-button--hero"
              />
              <InteractiveHoverButton
                to="/get-involved"
                text="Get involved"
                classes="interactive-hover-button--hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky-scroll-section" aria-label="Our values">
        <div className="container sticky-scroll-section__header">
          <h2 className="stats-section-heading">Why Health Education Matters</h2>
          <p className="stats-section-subtitle">Every young person deserves the knowledge to make informed health decisions</p>
        </div>
        <StickyScroll
          contentClassName="sticky-scroll-section__panel"
          content={[
            {
              title: "Health literacy",
              description: "is essential for every young person, yet rarely taught in schools",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/workshop-opqrst.png"
                    alt="Students learning health literacy in a workshop"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">01</p>
                      <h3>Health literacy</h3>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Clear information",
              description: "transforms complex healthcare into something approachable and human",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/workshop-woman-leading.png"
                    alt="Health Decoded team teaching clear communication"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">02</p>
                      <h3>Clear information</h3>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Empowered youth",
              description: "can navigate medical systems and make informed health decisions",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/community-engaged.png"
                    alt="Youth engaged at a Health Decoded event"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">03</p>
                      <h3>Empowered youth</h3>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>

      <SocialConnect />
    </div>
  );
}