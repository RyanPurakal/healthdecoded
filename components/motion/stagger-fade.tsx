// StaggerFade pair: StaggerFadeContainer triggers whileInView and cascades the animation to each StaggerFadeItem child with a 100ms stagger; used for program and involvement card grids.
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const itemReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerFadeContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      variants={
        reduce
          ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
          : container
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerFadeItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? itemReduced : item}
    >
      {children}
    </motion.div>
  );
}
