'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const defaultFeatures = [
  {
    step: 'Step 1',
    title: 'A story from real life',
    content:
      "Health Decoded began with an observation that Ruvanthika made early within her own family. Many of her relatives lived in rural India—small villages where clear, reliable health information wasn't easy to access. People often relied on word-of-mouth, guesswork, or whatever limited resources were available, and even simple medical decisions became overwhelming.",
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 2',
    title: 'Health literacy gaps became clear',
    content:
      "As Ruvanthika grew older and began working in EMS, she noticed similar patterns emerging in her own community. Even in an environment with more hospitals and advanced technology, health information was not distributed equally. A person's ability to understand their care often depended on socioeconomic status, language, or whether anyone had ever taken the time to explain the basics to them.",
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 3',
    title: 'A mission took shape',
    content:
      "She also realized something unexpected: she had never received any formal education about how the healthcare system worked either. Despite attending strong schools and learning subjects such as financial literacy, health literacy—something every person needs throughout their life—was never part of the curriculum. This led her to question why healthcare understanding isn't woven into education at every age level. Healthcare is universal; everyone will interact with it, yet young people are rarely taught how to navigate it.",
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 4',
    title: 'A movement was built',
    content:
      "This realization ultimately led Ruvanthika to create Health Decoded. Her goal was to build an organization that empowers young people—especially those from under-resourced or multilingual communities—to understand healthcare in a way that feels simple, supportive, and culturally aware. HealthDecoded aims to provide a space where medical information is broken down into something approachable and human, regardless of a student's background or prior knowledge.",
    image:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop',
  },
];

type Feature = {
  step: string;
  title?: string;
  content: string;
  image: string;
};

export function FeatureSteps({
  features = defaultFeatures,
  className = '',
  title = 'Our Story',
  imageHeight = 'feature-steps-image',
}: {
  features?: Feature[];
  className?: string;
  title?: string;
  imageHeight?: string;
}) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const reduce = useReducedMotion();

  const titleWords = title.trim().split(/\s+/);
  const titleLast = titleWords[titleWords.length - 1] ?? title;
  const titleRest = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : '';

  return (
    <div className={`feature-steps-section hd-themed-surface ${className}`.trim()}>
      <div className="feature-steps-container hd-themed-inner">
        <div className="feature-steps-header team-section-modern-header">
          <p className="team-section-modern-pill feature-steps-kicker">
            <Sparkles className="team-section-modern-pill-icon" aria-hidden />
            Health Decoded journey
          </p>
          <h2 className="team-section-modern-title">
            {titleRest ? (
              <>
                {titleRest}{' '}
                <span className="hd-gradient-text">{titleLast}</span>
              </>
            ) : (
              <span className="hd-gradient-text">{title}</span>
            )}
          </h2>
          <p className="feature-steps-subtitle team-section-modern-subtitle">
            Hover over each milestone to move through the story behind the organization.
          </p>
        </div>

        <div className="feature-steps-grid">
          <div className="feature-steps-list">
            {features.map((feature, index) => (
              <motion.div
                key={feature.step}
                className={`feature-step-item ${index === currentFeature ? 'active' : ''}`}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.35 }}
                transition={{ duration: reduce ? 0 : 0.45 }}
                onMouseEnter={() => setCurrentFeature(index)}
                onFocus={() => setCurrentFeature(index)}
                tabIndex={0}
              >
                <div className={`feature-step-badge ${index <= currentFeature ? 'done' : ''}`}>
                  {index <= currentFeature ? '✓' : index + 1}
                </div>

                <div className="feature-step-copy">
                  <h3>{feature.title || feature.step}</h3>
                  <p>{feature.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="feature-steps-image-panel">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={feature.step}
                      className="feature-steps-image-card"
                      {...(reduce
                        ? {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                            transition: { duration: 0.2 },
                          }
                        : {
                            initial: { y: 80, opacity: 0, rotateX: -18 },
                            animate: { y: 0, opacity: 1, rotateX: 0 },
                            exit: { y: -80, opacity: 0, rotateX: 18 },
                            transition: { duration: 0.5, ease: 'easeInOut' as const },
                          })}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className={imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="feature-steps-image-overlay" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
