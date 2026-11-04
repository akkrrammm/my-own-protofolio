"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/pad";

const SLICES = 4;
/** Where each slice waits before its step, alternating so the face reads as scattered. */
const SCATTER = ["-26%", "18%", "-12%", "30%"];
/** Every slice is home by this point, leaving a beat where the portrait sits whole. */
const DONE = 0.9;

/**
 * The portrait cut into one vertical slice per process step. Scrolling
 * through the steps slides each slice home, so the picture is only whole at
 * "Launch". `track="steps"` follows the timeline (the sticky desktop column);
 * `track="self"` follows the portrait's own position (the stacked layout).
 * With reduced motion the `motion-reduce:` overrides show it whole and still.
 */
export function ProcessPortrait({ track, rtl, className }: { track: "steps" | "self"; rtl: boolean; className?: string }) {
  const target = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: track === "steps" ? ["start 70%", "end 60%"] : ["start 90%", "end 50%"],
  });

  const percent = useTransform(scrollYProgress, (v) => `${Math.round(Math.min(v / DONE, 1) * 100)}%`);
  const gap = useTransform(scrollYProgress, [DONE - 0.12, DONE], ["10px", "0px"]);
  const glow = useTransform(scrollYProgress, [DONE - 0.25, DONE], [0, 1]);

  return (
    <div
      aria-hidden
      ref={(el) => {
        target.current = track === "steps" ? (el?.closest("section")?.querySelector<HTMLElement>("[data-process-steps]") ?? null) : el;
      }}
      className={cn("relative", className)}
    >
      <m.div
        className="absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgb(171_40_0/0.6),transparent)] motion-reduce:opacity-100!"
        style={{ opacity: glow }}
      />

      <div className="mb-3 flex items-center justify-between font-mono text-xs">
        <span dir="ltr" className="text-flame">
          &lt;{siteConfig.firstName.en} /&gt;
        </span>
        <span dir="ltr" className="text-dust tabular-nums">
          <m.span className="motion-reduce:hidden">{percent}</m.span>
          <span className="hidden motion-reduce:inline">100%</span>
        </span>
      </div>

      {/* Always left-to-right so the image is never mirrored or reordered */}
      <m.div dir="ltr" className="grid aspect-[4/3] grid-cols-4 motion-reduce:gap-x-0!" style={{ columnGap: gap }}>
        {Array.from({ length: SLICES }, (_, i) => (
          <Slice key={i} index={i} step={rtl ? SLICES - 1 - i : i} progress={scrollYProgress} />
        ))}
      </m.div>
    </div>
  );
}

function Slice({ index, step, progress }: { index: number; step: number; progress: MotionValue<number> }) {
  const range = [(step / SLICES) * DONE, ((step + 1) / SLICES) * DONE];
  const y = useTransform(progress, range, [SCATTER[index], "0%"]);
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(progress, [range[1] - 0.02, range[1]], ["#a08b7c", "#ff9800"]);

  return (
    <div className="flex flex-col">
      <m.div
        data-reveal
        className={cn(
          "relative flex-1 overflow-hidden bg-ink-800 motion-reduce:transform-none! motion-reduce:opacity-100!",
          index === 0 && "rounded-l-xl",
          index === SLICES - 1 && "rounded-r-xl",
        )}
        style={{ y, opacity }}
      >
        <div className="absolute inset-y-0 w-[400%]" style={{ left: `${-index * 100}%` }}>
          <Image
            src={siteConfig.portrait.src}
            alt=""
            fill
            sizes="(min-width: 80rem) 20rem, (min-width: 64rem) 17rem, 24rem"
            className="object-cover object-[50%_28%]"
          />
        </div>
      </m.div>
      <m.span className="mt-3 text-center font-mono text-[10px] motion-reduce:text-flame!" style={{ color }}>
        {pad(step + 1)}
      </m.span>
    </div>
  );
}
