// StickyScroll: tabbed widget where clicking a left-column card updates the right-column panel; used on the home page to step through the three "Why Health Education Matters" points.
'use client';

import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type StickyScrollItem = {
  title: string;
  description: string;
  content: ReactNode;
};

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const reduce = useReducedMotion();

  if (!content.length) return null;

  return (
    <div className="sticky-scroll-reveal">
      <div className="sticky-scroll-reveal__inner">
        <div className="sticky-scroll-reveal__content">
          {content.map((item, index) => (
            <motion.button
              key={`${item.title}-${index}`}
              type="button"
              className={cn(
                'sticky-scroll-reveal__card',
                index === activeCard && 'sticky-scroll-reveal__card--active',
              )}
              onClick={() => setActiveCard(index)}
              initial={reduce ? false : { opacity: 0.4, y: 16 }}
              animate={{
                opacity: index === activeCard ? 1 : 0.45,
                y: reduce ? 0 : index === activeCard ? 0 : 8,
              }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              aria-pressed={index === activeCard}
            >
              <div className="sticky-scroll-reveal__index">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="sticky-scroll-reveal__text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="sticky-scroll-reveal__panel">
          <div className={cn('sticky-scroll-reveal__panel-frame', contentClassName)}>
            {content[activeCard].content ?? null}
          </div>
        </div>
      </div>
    </div>
  );
}
