import { Info } from "lucide-react";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getI18n } from "@/i18n/server";
import { getIndustries, getProjects, pad } from "@/lib/projects";

/**
 * "Selected Works" — rendered entirely from data/projects.ts.
 * Industry chips filter the list; featured projects alternate as large
 * editorial rows and the rest fall into a two-column grid whose second
 * column is pushed down for rhythm (see ProjectsBrowser).
 */
export async function Work() {
  const { t } = await getI18n();
  const projects = getProjects();
  const hasSamples = projects.some((p) => p.sample);

  return (
    <section id="projects" aria-labelledby="work-title" className="relative isolate py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50rem] bg-[radial-gradient(60%_50%_at_20%_0%,rgb(171_40_0/0.16),transparent)] rtl:bg-[radial-gradient(60%_50%_at_80%_0%,rgb(171_40_0/0.16),transparent)]" />

      <div className="container-x">
        <SectionLabel index="02" label={t.work.label} />

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            id="work-title"
            lines={t.work.titleLines}
            className="font-display text-[clamp(3rem,9.5vw,8.25rem)] leading-display font-semibold text-cream"
          />
          <Reveal className="max-w-sm lg:pb-4" delay={0.15}>
            <p className="text-xl leading-relaxed text-sand">{t.work.lead}</p>
            <p className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-5xl leading-none font-semibold text-flame sm:text-6xl">{pad(projects.length)}</span>
              <span className="eyebrow text-dust">{t.work.countLabel}</span>
            </p>
          </Reveal>
        </div>

        {hasSamples && (
          <Reveal className="mt-12">
            <p className="flex max-w-3xl items-start gap-3 rounded-2xl border border-dashed border-flame/30 bg-ember/10 px-5 py-4 text-sm leading-relaxed text-sand">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-flame" />
              {t.work.sampleNote}
            </p>
          </Reveal>
        )}

        {projects.length === 0 ? (
          <p className="mt-16 font-serif text-3xl text-sand italic">{t.work.empty}</p>
        ) : (
          <ProjectsBrowser projects={projects} industries={getIndustries(projects)} />
        )}
      </div>
    </section>
  );
}
