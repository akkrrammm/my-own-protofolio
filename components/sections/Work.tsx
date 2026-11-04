import { Info } from "lucide-react";
import { ProjectFeature, ProjectTile } from "@/components/projects/ProjectCards";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { getProjects, groupProjects, pad } from "@/lib/projects";

/**
 * "Selected Works" — rendered entirely from data/projects.ts.
 * Featured projects alternate as large editorial rows; the rest fall into a
 * two-column grid whose second column is pushed down for rhythm.
 */
export async function Work() {
  const { locale, t } = await getI18n();
  const projects = getProjects();
  const { featured, rest } = groupProjects(projects);
  const position = (slug: string) => projects.findIndex((p) => p.slug === slug) + 1;
  const hasSamples = projects.some((p) => p.sample);

  return (
    <section id="projects" aria-labelledby="work-title" className="relative isolate py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50rem] bg-[radial-gradient(60%_50%_at_20%_0%,rgb(171_40_0/0.16),transparent)] rtl:bg-[radial-gradient(60%_50%_at_80%_0%,rgb(171_40_0/0.16),transparent)]" />

      <div className="container-x">
        <SectionLabel index="02" label={t.work.label} />

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            id="work-title"
            lines={t.work.titleLines}
            className="font-display text-[clamp(3.25rem,11.5vw,10.5rem)] leading-display font-semibold text-cream"
          />
          <Reveal className="max-w-sm lg:pb-5" delay={0.15}>
            <p className="text-xl leading-relaxed text-sand">{t.work.lead}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-6xl leading-none font-semibold text-flame">{pad(projects.length)}</span>
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
          <p className="mt-20 font-serif text-3xl text-sand italic">{t.work.empty}</p>
        ) : (
          <>
            <div className="mt-20 space-y-28 lg:mt-28 lg:space-y-44">
              {featured.map((project, i) => (
                <ProjectFeature
                  key={project.id}
                  project={project}
                  index={position(project.slug)}
                  locale={locale}
                  t={t}
                  reversed={i % 2 === 1}
                />
              ))}
            </div>

            {rest.length > 0 && (
              <div className="mt-32 lg:mt-48">
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
          </>
        )}
      </div>
    </section>
  );
}
