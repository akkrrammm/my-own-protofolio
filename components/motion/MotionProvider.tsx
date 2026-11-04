"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// The animation engine loads after hydration, off the critical path.
const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * `m.*` components + lazily loaded features keep the initial bundle small.
 * reducedMotion="user" drops transform/layout animations for visitors who
 * ask for less motion (opacity fades remain, so reveals still resolve).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
