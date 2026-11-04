"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { siteConfig } from "@/config/site";

/**
 * Chamfer matching the frame polygon below: the cut is 12% of the width,
 * which is 9.6% of the height at the artwork's 1122 × 1402 ratio.
 */
const CHAMFER = "polygon(0 0, 88% 0, 100% 9.6%, 100% 100%, 12% 100%, 0 90.4%)";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The illustrated portrait, displayed exactly as supplied, set in a layered
 * composition: a red ambient glow, an offset outline frame, a reveal
 * curtain, light grading at the edges, and floating code fragments.
 * Layers drift at different depths with the mouse and the scroll.
 */
export function HeroPortrait({ alt, stamp, latin }: { alt: string; stamp: string; latin: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Pointer position, -1 … 1 on each axis, eased by a soft spring.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 50, damping: 18, mass: 0.9 });
  const py = useSpring(pointerY, { stiffness: 50, damping: 18, mass: 0.9 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    function onPointerMove(event: PointerEvent) {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduce, pointerX, pointerY]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scroll = useTransform(scrollYProgress, [0, 1], [0, 110]);

  // Depth: glow (far) → frame → portrait → chips (near).
  const glowX = useTransform(px, (v) => v * -26);
  const glowY = useTransform(py, (v) => v * -26);
  const frameX = useTransform(px, (v) => v * 14);
  const frameY = useTransform([py, scroll], ([p, s]: number[]) => p * 14 + s * 0.15);
  const imageX = useTransform(px, (v) => v * -7);
  const imageY = useTransform([py, scroll], ([p, s]: number[]) => p * -7 + s * 0.4);
  const chipX = useTransform(px, (v) => v * 24);
  const chipY = useTransform([py, scroll], ([p, s]: number[]) => p * 24 - s * 0.5);

  return (
    <div ref={ref} className="relative">
      {/* Ambient red light behind the artwork */}
      <m.div aria-hidden style={{ x: glowX, y: glowY }} className="pointer-events-none absolute -inset-[22%] -z-10">
        <div className="size-full animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.6),rgb(171_40_0/0.14)_58%,transparent)] will-change-transform" />
      </m.div>

      {/* Offset outline frame with registration marks */}
      <m.div aria-hidden style={{ x: frameX, y: frameY }} className="pointer-events-none absolute inset-0">
        <div className="fade-in absolute inset-0 translate-x-3.5 -translate-y-3.5 sm:translate-x-5 sm:-translate-y-5 rtl:-translate-x-3.5 sm:rtl:-translate-x-5" style={delay(650)}>
          <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="size-full overflow-visible">
            <polygon
              points="0,0 88,0 100,12 100,125 12,125 0,113"
              fill="none"
              stroke="rgb(255 152 0 / 0.5)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute -start-2 -top-2 size-4 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-flame after:absolute after:inset-y-0 after:start-1/2 after:w-px after:bg-flame" />
          <span className="absolute -end-2 -bottom-2 size-4 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-flame after:absolute after:inset-y-0 after:start-1/2 after:w-px after:bg-flame" />
        </div>
      </m.div>

      {/* The portrait itself — unaltered pixels, framed and lit around them */}
      <m.div style={{ x: imageX, y: imageY }} className="relative">
        <div className="portrait-enter relative aspect-[1122/1402]">
          <div
            className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_68%,transparent_99%)]"
            style={{ clipPath: CHAMFER }}
          >
            <Image
              src={siteConfig.portrait.src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 70vw, 86vw"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
            {/* Warm key light from the top corner, echoing the artwork's rim light */}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(205deg,rgb(255_152_0/0.16),transparent_38%)] mix-blend-screen" />
            {/* Soft vignette that sinks the edges into the page */}
            <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_80px_10px_rgb(22_6_0/0.55)]" />
            {/* Reveal curtain */}
            <div aria-hidden className="curtain absolute inset-0 bg-linear-to-b from-ember to-ink-900" style={delay(200)} />
          </div>
        </div>
      </m.div>

      {/* Floating code card */}
      <m.div aria-hidden style={{ x: chipX, y: chipY }} className="pointer-events-none absolute -start-4 top-[13%] z-10 hidden sm:block lg:-start-20">
        <div className="fade-in" style={delay(1150)}>
          <div
            dir="ltr"
            className="animate-float rounded-2xl border border-flame/15 bg-ink-900/90 p-4 text-start font-mono text-[11px] leading-[1.7] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
          >
            <div className="mb-2.5 flex gap-1.5">
              <span className="size-2 rounded-full bg-ember" />
              <span className="size-2 rounded-full bg-flame/70" />
              <span className="size-2 rounded-full bg-cream/25" />
            </div>
            <code className="block text-sand">
              <span className="text-ember-300">const</span> <span className="text-cream">developer</span> = {"{"}
              <br />
              <span className="ps-4">role:</span> <span className="text-flame-300">&quot;{siteConfig.role.en}&quot;</span>,
              <br />
              <span className="ps-4">ships:</span> <span className="text-flame-300">&quot;experiences&quot;</span>,
              <br />
              {"}"};
            </code>
          </div>
        </div>
      </m.div>

      {/* JSX tag chip */}
      <m.div aria-hidden style={{ x: chipX, y: chipY }} className="pointer-events-none absolute -end-2 bottom-[24%] z-10 sm:-end-6">
        <div className="fade-in" style={delay(1300)}>
          <div
            dir="ltr"
            className="animate-float rounded-full border border-flame/25 bg-ink/90 px-4 py-2 font-mono text-xs text-cream shadow-[0_20px_40px_-16px_rgb(0_0_0/0.9)] [animation-delay:-3s] sm:text-sm"
          >
            <span className="text-flame">&lt;</span>Experience<span className="text-flame"> /&gt;</span>
          </div>
        </div>
      </m.div>

      {/* Floating symbol */}
      <m.div aria-hidden style={{ x: chipX, y: chipY }} className="pointer-events-none absolute end-[6%] -top-8 hidden sm:block">
        <span dir="ltr" className="fade-in block font-mono text-3xl text-flame/70" style={delay(1400)}>
          <span className="block animate-float [animation-delay:-1.5s]">{"{ }"}</span>
        </span>
      </m.div>

      {/* Rotating stamp — always over the artwork's background, never the
          face: the top corner on phones (the headline covers the lower edge),
          the striped side on tablets (the code card holds the other corner),
          and the lower corner beside the hoodie on desktop. */}
      <div className="absolute top-[3%] -start-6 z-10 w-20 sm:start-auto sm:top-[18%] sm:-end-8 sm:w-24 lg:end-auto lg:top-auto lg:bottom-[4%] lg:-start-14 lg:w-28">
        <div className="fade-in" style={delay(1000)}>
          <RotatingStamp id="hero-stamp" text={stamp} latin={latin} className="rounded-full bg-ink/80 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]">
            <span className="grid size-10 place-items-center rounded-full bg-flame text-ink sm:size-12">
              <CodeXml className="size-5" />
            </span>
          </RotatingStamp>
        </div>
      </div>
    </div>
  );
}
