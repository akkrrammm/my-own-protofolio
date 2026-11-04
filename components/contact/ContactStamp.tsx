"use client";

import { m } from "motion/react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

/** Four wavy cancellation lines, the kind a post office prints across a stamp. */
const WAVES = [8, 17, 26, 35].map((y) => `M2 ${y} q7.5 -5 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t14 0`);

/**
 * The portrait as a perforated postage stamp, pressed onto the corner of the
 * message form: the form is the letter, the stamp is who it goes to. It lands
 * with a slight overshoot, the postmark draws itself on, and it straightens
 * up under the pointer.
 */
export function ContactStamp({ caption, rtl }: { caption: string; rtl: boolean }) {
  const tilt = rtl ? -6 : 6;

  return (
    <m.div
      aria-hidden
      data-reveal
      className="absolute -top-20 end-4 z-10 w-28 sm:-top-32 sm:end-8 sm:w-40 lg:-top-40 lg:w-44"
      initial={{ opacity: 0, scale: 1.6, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      whileHover={{ scale: 1.05, rotate: 0, y: -6 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <div className="stamp-paper drop-shadow-[0_18px_22px_rgb(0_0_0/0.55)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <Image
            src={siteConfig.portrait.src}
            alt=""
            fill
            sizes="(min-width: 64rem) 10rem, (min-width: 40rem) 9rem, 6rem"
            className="object-cover"
          />
        </div>
        <p className="mt-1.5 truncate text-center font-mono text-[0.5rem] tracking-[0.2em] text-ink-700 uppercase sm:text-[0.6rem]">
          {caption}
        </p>
      </div>

      {/* Postmark: runs off the stamp onto the form, clear of the face */}
      <svg
        viewBox="0 0 120 40"
        className="pointer-events-none absolute -start-9 top-3 w-[62%] text-ember rtl:-scale-x-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        {WAVES.map((d, i) => (
          <m.path
            key={d}
            d={d}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 + i * 0.08, ease: "easeOut" }}
          />
        ))}
      </svg>
    </m.div>
  );
}
