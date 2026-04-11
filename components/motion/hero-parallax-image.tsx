'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { RefObject, SyntheticEvent } from 'react';

type HeroParallaxImageProps = {
  scrollRef: RefObject<HTMLElement | null>;
  src: string;
  alt: string;
  className?: string;
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void;
};

export function HeroParallaxImage({
  scrollRef,
  src,
  alt,
  className,
  onError,
}: HeroParallaxImageProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1.05, 1.05] : [1.05, 1.1],
  );

  return (
    <div className="hero-image-overlay">
      <motion.img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        aria-hidden="true"
        style={{ y, scale }}
        onError={onError}
      />
    </div>
  );
}
