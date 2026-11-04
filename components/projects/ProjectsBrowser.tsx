"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ProjectFeature, ProjectTile } from "@/components/projects/ProjectCards";
import { format } from "@/components/ui/Accent";
import type { Industry, Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/pad";
import { groupProjects } from "@/lib/project-helpers";

type Filter = "all" | Industry;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Industry filter chips above the project list. Each filter re-lays out the
 * same editorial structure (featured rows, then the offset grid) with only
 * the matching projects, cross-fading between lists. Card numbers keep their
 * position in the full list.
 */
export function ProjectsBrowser({ projects, industries }: { projects: Project[]; industries: Industry[] }) {
  const { locale, t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.industry === filter);
  const { featured, rest } = groupProjects(visible);
  const position = (slug: string) => projects.findIndex((p) => p.slug === slug) + 1;
  const count = (option: Filter) => (option === "all" ? projects.length : projects.filter((p) => p.industry === option).length);

  return (
    <>
      {industries.length > 1 && (
        <div role="group" aria-label={t.work.filters.label} className="mt-12 flex flex-wrap gap-2 lg:mt-14">
          {(["all", ...industries] as Filter[]).map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option)}
                className={cn(
                  "relative isolate inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                  active ? "border-flame text-ink" : "border-cream/15 text-sand hover:border-flame/60 hover:text-cream",
                )}
              >
                {active && (
                  <m.span
                    layoutId="work-filter-pill"
                    aria-hidden
                    className="absolute -inset-px -z-10 rounded-full bg-flame"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {t.work.filters[option]}
                <span aria-hidden className={cn("font-mono text-[11px] tabular-nums", active ? "text-ink/70" : "text-dust")}>
                  {pad(count(option))}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <p aria-live="polite" className="sr-only">
        {format(t.work.filters.shown, { count: String(visible.length) })}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={filter}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } }}
        >
          <div className="mt-12 space-y-24 lg:mt-16 lg:space-y-36">
            {featured.map((project, i) => (
              <ProjectFeature key={project.id} project={project} index={position(project.slug)} locale={locale} t={t} reversed={i % 2 === 1} />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="mt-28 lg:mt-40">
              <div className="flex items-center gap-5">
                <h3 className="font-display text-3xl font-semibold text-cream sm:text-4xl">{t.work.moreTitle}</h3>
                <span aria-hidden className="h-px flex-1 bg-linear-to-r from-flame/40 to-transparent rtl:bg-linear-to-l" />
              </div>
              {/* The second column is shifted with `translate` (not margin) so
                  rows keep their natural height and no gaps open up. */}
              <div className={cn("mt-14 grid gap-x-10 gap-y-24 md:grid-cols-2 lg:gap-x-20", rest.length % 2 === 0 && "md:pb-40")}>
                {rest.map((project, i) => (
                  <ProjectTile
                    key={project.id}
                    project={project}
                    index={position(project.slug)}
                    locale={locale}
                    t={t}
                    className={cn(i % 2 === 1 && "md:translate-y-40")}
                  />
                ))}
              </div>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </>
  );
}
