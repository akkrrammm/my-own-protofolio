import { SkillsTable, type SkillGroup } from "@/components/skills/SkillsTable";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillCategories } from "@/data/skills";
import { getI18n } from "@/i18n/server";

export async function Skills() {
  const { t } = await getI18n();
  const groups: SkillGroup[] = skillCategories
    .filter((category) => category.skills.length > 0)
    .map((category) => ({
      ...category,
      name: t.skills.categories[category.id].name,
      blurb: t.skills.categories[category.id].blurb,
    }));

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden border-y border-flame/10 bg-ink-900 py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-1/3 -start-1/4 -z-10 size-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.22),transparent)]" />

      <div className="container-x">
        <SectionLabel index="03" label={t.skills.label} />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <LineReveal
            id="skills-title"
            lines={t.skills.titleLines}
            className="font-display text-[clamp(2.75rem,8vw,7.25rem)] leading-display font-semibold text-cream lg:col-span-7"
          />
          <Reveal className="lg:col-span-5 lg:pb-3" delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-sand">{t.skills.lead}</p>
          </Reveal>
        </div>
        <div className="mt-16 lg:mt-20">
          <SkillsTable groups={groups} />
        </div>
      </div>
    </section>
  );
}
