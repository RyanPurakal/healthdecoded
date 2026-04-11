'use client';

import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import SocialConnect from '@/components/ui/connect-with-us';
import { FadeInSection } from '@/components/motion/fade-in-section';
import { HeroParallaxImage } from '@/components/motion/hero-parallax-image';

export default function HomeClient() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="home-page">
      <section ref={heroRef} className="hero" aria-label="Hero section">
        <div className="hero-background" />
        <HeroParallaxImage
          scrollRef={heroRef}
          src="/images/events/community-tables.png"
          alt="Youth participating at a Health Decoded event"
          className="hero-overlay-image"
          onError={(e) => {
            const img = e.currentTarget;
            img.src =
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80';
          }}
        />
        <div className="container hero-content">
          <div className="hero-text-wrapper">
            <h1>Health education, decoded for youth.</h1>
            <p className="hero-subtitle">
              Building an international community of youth using health education to change the world
            </p>
            <div className="hero-cta-group pt-4">
              <Button href="/programs" size="lg" className="rounded-full shadow-lg text-base h-14">
                Explore our programs
              </Button>
              <Button href="/get-involved" variant="outline" size="lg" className="rounded-full bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-beige hover:text-[#4F62F8] shadow-lg text-base h-14">
                Get involved
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FadeInSection as="div" className="sticky-scroll-section hd-themed-surface" delay={0.05}>
        <div className="hd-themed-inner">
          <div className="container sticky-scroll-section__header">
            <span className="team-section-modern-pill">
              <Sparkles className="team-section-modern-pill-icon" aria-hidden />
              Impact
            </span>
            <h2 className="team-section-modern-title">
              Why <span className="hd-gradient-text">Health Education</span> Matters
            </h2>
            <p className="team-section-modern-subtitle">
              Every young person deserves the knowledge to make informed health decisions
            </p>
          </div>
          <StickyScroll
          contentClassName="sticky-scroll-section__panel"
          content={[
            {
              title: 'Health literacy',
              description: 'is essential for every young person, yet rarely taught in schools',
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
                    alt="Students learning health literacy in a workshop"
                    className="sticky-scroll-media__image"
                    loading="lazy"
                    decoding="async"
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
              title: 'Clear information',
              description: 'transforms complex healthcare into something approachable and human',
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80"
                    alt="Health Decoded team teaching clear communication"
                    className="sticky-scroll-media__image"
                    loading="lazy"
                    decoding="async"
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
              title: 'Empowered youth',
              description: 'can navigate medical systems and make informed health decisions',
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                    alt="Youth engaged at a Health Decoded event"
                    className="sticky-scroll-media__image"
                    loading="lazy"
                    decoding="async"
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
        </div>
      </FadeInSection>

      <SocialConnect />
    </div>
  );
}
