// FadeInSection: scroll-triggered fade-up wrapper (Framer Motion whileInView); renders as <section> or <div>, fires once per mount, and skips animation when prefers-reduced-motion is set.
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'section' | 'div';
};

export function FadeInSection({
  children,
  className,
  delay = 0,
  as = 'section',
}: FadeInSectionProps) {
  const reduce = useReducedMotion();
  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
}
