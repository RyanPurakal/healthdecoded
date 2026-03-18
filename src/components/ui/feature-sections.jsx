import React from "react";

export default function ProgramsFeatureSections() {
  return (
    <section className="programs-features" aria-label="Our programs">
      <div className="programs-features__header">
        <h2>Our Programs</h2>
        <p>
          Two core ways we help youth build real health literacy skills – in classrooms
          and through peer leadership.
        </p>
      </div>

      <div className="programs-features__grid">
        <article className="programs-feature-card">
          <div className="programs-feature-card__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80"
              alt="Students learning in a classroom workshop"
              className="programs-feature-card__image"
              loading="lazy"
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

        <article className="programs-feature-card">
          <div className="programs-feature-card__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
              alt="Peer ambassadors leading a discussion"
              className="programs-feature-card__image"
              loading="lazy"
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

      </div>
    </section>
  );
}

