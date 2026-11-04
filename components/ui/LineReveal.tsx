"use client";

import { m } from "motion/react";
import { Accent } from "@/components/ui/Accent";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A heading whose lines rise out of their own masks when scrolled into view
 * (the scroll-triggered sibling of the hero's CSS entrance).
 *
 * The mask is what gets observed: the line inside starts translated fully
 * outside it, where an IntersectionObserver would never see it.
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  id,
  className,
  lineClasses,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Optional class per line (e.g. a staircase indent). */
  lineClasses?: string[];
  delay?: number;
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <m.span
          key={i}
          className={cn("rise-mask", lineClasses?.[i])}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          <m.span
            data-reveal
            className="block origin-bottom-left rtl:origin-bottom-right"
            variants={{
              hidden: { y: "110%", rotate: 2.5 },
              shown: { y: "0%", rotate: 0, transition: { duration: 1.15, delay: delay + i * 0.1, ease: EASE } },
            }}
          >
            <Accent text={line} />
          </m.span>
        </m.span>
      ))}
    </Tag>
  );
}
