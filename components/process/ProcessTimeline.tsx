"use client";

import { Compass, CodeXml, PenTool, Rocket } from "lucide-react";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/projects";

const ICONS = [Compass, PenTool, CodeXml, Rocket];

interface Step {
  title: string;
  text: string;
  items: string[];
}

/**
 * Vertical timeline whose orange line fills as you scroll through it; each
 * step's node lights up as it reaches the middle of the screen.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={list} data-process-steps className="relative">
      <span aria-hidden className="absolute top-6 bottom-6 start-6 w-px bg-cream/10" />
      <m.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute top-6 bottom-6 start-6 w-px origin-top bg-linear-to-b from-flame via-flame to-ember shadow-[0_0_12px_rgb(255_152_0/0.6)]"
      />

      {steps.map((step, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <li key={step.title} className="relative pb-20 ps-20 last:pb-0 sm:ps-24">
            <m.span
              aria-hidden
              className="absolute start-0 top-0 grid size-12 place-items-center rounded-full border"
              initial={{ backgroundColor: "#1b0802", borderColor: "rgba(246,237,227,0.15)", color: "#a08b7c" }}
              whileInView={{ backgroundColor: "#ff9800", borderColor: "#ff9800", color: "#160600" }}
              viewport={{ once: true, margin: "0px 0px -45% 0px" }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="size-5" />
            </m.span>

            <Reveal>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-flame">{pad(i + 1)}</p>
                  <h3 className="mt-3 font-display text-4xl leading-heading font-semibold text-cream sm:text-5xl">{step.title}</h3>
                </div>
                <span aria-hidden className="font-display text-7xl leading-[0.8] font-bold tracking-[-0.05em] opacity-70 text-outline-flame sm:text-8xl">
                  {pad(i + 1)}
                </span>
              </div>
              <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-sand">{step.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {step.items.map((item) => (
                  <li key={item} className="rounded-full border border-flame/20 bg-ember/10 px-3.5 py-1.5 text-sm text-sand">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
