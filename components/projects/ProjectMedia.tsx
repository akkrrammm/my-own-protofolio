"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, ViewTransition, type PointerEvent } from "react";
import { BrowserBar } from "@/components/projects/ProjectParts";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A project's screenshot as a link to its case study.
 * - Scroll reveal: the frame opens from a clipped inset while the image settles.
 * - Hover (mouse): the image eases forward and a "View" disc follows the cursor.
 * - Touch: a fixed corner badge stands in for the cursor disc.
 * - Navigation: the image morphs into the case-study hero (view transition).
 */
export function ProjectMedia({
  slug,
  href,
  src,
  alt,
  url,
  accent,
  viewLabel,
  sizes,
  className,
}: {
  slug: string;
  href: string;
  src: string;
  alt: string;
  url: string;
  accent?: string;
  viewLabel: string;
  sizes: string;
  className?: string;
}) {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const discX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const discY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <Link
      href={href}
      transitionTypes={["page-forward"]}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.jump(event.clientX - rect.left);
        y.jump(event.clientY - rect.top);
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
      onPointerMove={onPointerMove}
      className={cn("group/media relative block rounded-[20px] pointer-fine:cursor-none", className)}
    >
      {/* Accessible name: "View: <screenshot description>" */}
      <span className="sr-only">{viewLabel}: </span>
      {/* The cover's own colour, glowing softly behind it */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-35 blur-3xl transition-opacity duration-700 group-hover/media:opacity-75"
        style={{ background: `radial-gradient(closest-side, ${accent ?? "#ab2800"}66, transparent)` }}
      />

      <m.div
        data-reveal
        initial={{ clipPath: "inset(8% 6% 8% 6% round 32px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 20px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.3, ease: EASE }}
        className="relative overflow-hidden rounded-[20px] border border-cream/10 bg-ink-800 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]"
      >
        <BrowserBar url={url} />
        <ViewTransition name={`project-${slug}`} share="morph" default="none">
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
            <m.div
              data-reveal
              initial={{ scale: 1.16 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className="object-cover object-top transition-transform duration-[1200ms] ease-expo group-hover/media:scale-[1.045]"
              />
            </m.div>
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-ember/10 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100 group-focus-visible/media:opacity-100"
            />
          </div>
        </ViewTransition>
      </m.div>

      {/* Cursor disc (mouse only) */}
      <m.span aria-hidden style={{ x: discX, y: discY }} className="pointer-events-none absolute top-0 left-0 z-10 hidden pointer-fine:block">
        <m.span
          initial={false}
          animate={{ scale: hovering ? 1 : 0.2, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-flame text-sm font-semibold text-ink shadow-[0_10px_40px_-6px_rgb(255_152_0/0.7)] sm:size-28"
        >
          {viewLabel}
          <ArrowUpRight className="size-4 rtl:-scale-x-100" />
        </m.span>
      </m.span>

      {/* Corner badge (touch) */}
      <span
        aria-hidden
        className="absolute end-4 bottom-4 z-10 hidden size-12 place-items-center rounded-full bg-flame text-ink shadow-lg pointer-coarse:grid"
      >
        <ArrowUpRight className="size-5 rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
