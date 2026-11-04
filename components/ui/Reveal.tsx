"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. `data-reveal` lets the <noscript> styles show it without JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
