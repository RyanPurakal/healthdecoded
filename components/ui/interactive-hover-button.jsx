'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function InteractiveHoverButton({
  text = "Button",
  loadingText = "Processing...",
  successText = "Complete!",
  classes = "",
  children,
  to,
  href,
  className,
  onClick,
  type = "button",
  ...props
}) {
  const [status, setStatus] = useState("idle");
  const isLink = Boolean(to || href);
  const isIdle = status === "idle";
  const label = children || text;

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    if (isLink) return;
    if (status !== "idle") return;

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 2000);
  };

  const sharedClassName = cn(
    "interactive-hover-button",
    status === "loading" && "interactive-hover-button--loading",
    className,
    classes
  );

  const body = (
    <>
      <span className="interactive-hover-button__dot" aria-hidden="true" />
      <span
        className={cn(
          "interactive-hover-button__label",
          !isIdle && "interactive-hover-button__label--hidden"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "interactive-hover-button__hover",
          !isIdle && "interactive-hover-button__hover--visible"
        )}
        aria-hidden="true"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {status === "idle" ? (
            <motion.span
              key="idle"
              className="interactive-hover-button__hover-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span>{label}</span>
              <ArrowRight className="interactive-hover-button__icon" />
            </motion.span>
          ) : status === "loading" ? (
            <motion.span
              key="loading"
              className="interactive-hover-button__hover-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="interactive-hover-button__spinner" />
              <span>{loadingText}</span>
            </motion.span>
          ) : (
            <motion.span
              key="success"
              className="interactive-hover-button__hover-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Check className="interactive-hover-button__icon" />
              <span>{successText}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </>
  );

  if (to) {
    return (
      <Link href={to} className={sharedClassName} onClick={handleClick} {...props}>
        {body}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={sharedClassName} onClick={handleClick} {...props}>
        {body}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      className={sharedClassName}
      onClick={handleClick}
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {body}
    </motion.button>
  );
}
