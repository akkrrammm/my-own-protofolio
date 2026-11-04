"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * A number that counts up from zero the first time it scrolls into view.
 * The final value is what the server renders, so it is correct without
 * JavaScript; with reduced motion it simply stays there. The animated
 * digits are hidden from screen readers, which get the final value.
 */
export function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = String(to);
      return;
    }
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {to}
      </span>
      <span className="sr-only">{to}</span>
    </>
  );
}
