"use client";

import { m } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { Skill, SkillCategoryId } from "@/data/skills";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/pad";

export interface SkillGroup {
  id: SkillCategoryId;
  code: string;
  name: string;
  blurb: string;
  skills: Skill[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The toolkit as a periodic table: one row per category, one "element"
 * tile per technology. Hovering a row quiets the others; each tile carries
 * a soft spotlight that follows the pointer.
 */
export function SkillsTable({ groups }: { groups: SkillGroup[] }) {
  const [focused, setFocused] = useState<SkillCategoryId | null>(null);

  // Running number across the whole table, like atomic numbers.
  const offsets = groups.map((_, i) => groups.slice(0, i).reduce((sum, g) => sum + g.skills.length, 0));

  return (
    <div className="border-t border-cream/10">
      {groups.map((group, g) => (
        <div
          key={group.id}
          onPointerEnter={() => setFocused(group.id)}
          onPointerLeave={() => setFocused(null)}
          className={cn(
            "grid gap-7 border-b border-cream/10 py-9 transition-opacity duration-500 lg:grid-cols-12 lg:gap-10 lg:py-12",
            focused && focused !== group.id && "lg:opacity-35",
          )}
        >
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 font-mono text-xs">
              <span dir="ltr" className="rounded-md border border-flame/35 px-1.5 py-0.5 text-flame">
                {group.code}
              </span>
              <span className="text-dust">{pad(group.skills.length)}</span>
            </p>
            <h3 className="mt-4 font-display text-2xl leading-heading font-semibold text-cream sm:text-3xl">{group.name}</h3>
            <p className="mt-3 max-w-xs leading-relaxed text-sand">{group.blurb}</p>
          </div>

          <m.ul
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:col-span-8 xl:grid-cols-5"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ shown: { transition: { staggerChildren: 0.05 } } }}
          >
            {group.skills.map((skill, i) => (
              <m.li
                key={skill.name}
                data-reveal
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                <ElementTile skill={skill} number={offsets[g] + i + 1} code={group.code} />
              </m.li>
            ))}
          </m.ul>
        </div>
      ))}
    </div>
  );
}

function ElementTile({ skill, number, code }: { skill: Skill; number: number; code: string }) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      dir="ltr"
      onPointerMove={onPointerMove}
      className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-cream/10 bg-ink/70 p-3 transition-[border-color,translate,background-color] duration-500 ease-expo hover:-translate-y-1 hover:border-flame/55 hover:bg-ink-800 sm:p-4"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(150px circle at var(--mx, 50%) var(--my, 50%), rgb(255 152 0 / 0.18), transparent 70%)" }}
      />
      <span aria-hidden className="relative flex justify-between font-mono text-[10px] text-dust">
        <span>{pad(number)}</span>
        <span className="text-ember-300">{code}</span>
      </span>
      <span
        aria-hidden
        className="relative font-display text-[clamp(1.75rem,3.4vw,2.85rem)] leading-none font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-flame"
      >
        {skill.symbol}
      </span>
      <span className="relative truncate text-[11px] text-sand sm:text-xs">{skill.name}</span>
    </div>
  );
}
