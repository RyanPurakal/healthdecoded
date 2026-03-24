'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function StickyScroll({ content, contentClassName }) {
  const [activeCard, setActiveCard] = useState(0);

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
                "sticky-scroll-reveal__card",
                index === activeCard && "sticky-scroll-reveal__card--active"
              )}
              onClick={() => setActiveCard(index)}
              initial={{ opacity: 0.4, y: 16 }}
              animate={{
                opacity: index === activeCard ? 1 : 0.45,
                y: index === activeCard ? 0 : 8,
              }}
              transition={{ duration: 0.35 }}
              aria-pressed={index === activeCard}
            >
              <div className="sticky-scroll-reveal__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="sticky-scroll-reveal__text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="sticky-scroll-reveal__panel">
          <div className={cn("sticky-scroll-reveal__panel-frame", contentClassName)}>
            {content[activeCard].content ?? null}
          </div>
        </div>
      </div>
    </div>
  );
}
