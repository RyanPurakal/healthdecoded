// Home page UI: hero with split dark/photo panels, impact rows with outlined stroke numbers, indigo connect section.
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './home.css';

export default function HomeClient() {
  // Scroll-triggered fade-ins
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.hm-fade');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('hm-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="hm-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hm-hero" aria-label="Hero">

        {/* Left — dark panel with headline */}
        <div className="hm-hero-dark">
          <p className="hm-eyebrow">Health Decoded Initiative</p>

          <h1 className="hm-h1">
            <span className="sr-only">Health Decoded Initiative — </span>
            Health<br />
            Education,<br />
            Decoded<br />
            For{' '}
            <span className="hm-accent-word">Youth.</span>
          </h1>

          <p className="hm-hero-sub">
            Building an international community of youth using health education to change the world
          </p>

          <div className="hm-hero-ctas">
            <Link href="/programs" className="hm-btn hm-btn-filled">
              Explore our programs
              <span className="hm-btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/get-involved" className="hm-btn hm-btn-ghost">
              Get involved
              <span className="hm-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right — full-bleed photo */}
        <div className="hm-hero-photo">
          <img
            src="/images/hero-home-students.png"
            alt="Students smiling together at a Health Decoded classroom session"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '/images/events/uploaded/community-01.png';
            }}
          />
        </div>

      </section>

      {/* ── IMPACT ───────────────────────────────────────────── */}
      <section className="hm-impact" aria-labelledby="hm-impact-heading">

        <header className="hm-impact-header hm-fade">
          <p className="hm-label" aria-hidden="true">Impact</p>
          <h2 className="hm-impact-title" id="hm-impact-heading">
            Why{' '}
            <span className="hm-accent-word">Health</span>
            <br />Education Matters
          </h2>
          <p className="hm-impact-sub">
            Every young person deserves the knowledge to make informed health decisions
          </p>
        </header>

        <div className="hm-impact-row hm-fade" role="listitem">
          <p className="hm-num" aria-hidden="true">01</p>
          <p className="hm-statement">
            <strong>Health literacy</strong> is essential for every young person,
            yet rarely taught in schools
          </p>
        </div>

        <div className="hm-impact-row hm-fade" role="listitem">
          <p className="hm-num" aria-hidden="true">02</p>
          <p className="hm-statement">
            <strong>Clear information</strong> transforms complex healthcare into
            something approachable and human
          </p>
        </div>

        <div className="hm-impact-row hm-fade" role="listitem">
          <p className="hm-num" aria-hidden="true">03</p>
          <p className="hm-statement">
            <strong>Empowered youth</strong> can navigate medical systems and make
            informed health decisions
          </p>
        </div>

      </section>

      {/* ── CONNECT ──────────────────────────────────────────── */}
      <section className="hm-connect hm-fade" aria-labelledby="hm-connect-heading">
        <div className="hm-connect-inner">

          <div>
            <p className="hm-connect-label" aria-hidden="true">Community</p>
            <h2 className="hm-connect-title" id="hm-connect-heading">
              Connect<br />With Us
            </h2>
            <p className="hm-connect-sub">
              Join our community and stay updated with the latest initiatives and
              health education resources.
            </p>
          </div>

          <Link href="/contact" className="hm-btn hm-btn-dark">
            Contact Us
            <span className="hm-btn-arrow" aria-hidden="true">→</span>
          </Link>

        </div>
      </section>

    </div>
  );
}
