import { SkillsTable, type SkillGroup } from "@/components/skills/SkillsTable";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillCategories } from "@/data/skills";
import { getI18n } from "@/i18n/server";

/** Verified skill assessments, shown under the toolkit. Newest first. */
const credentials = [
  {
    issuer: { en: "Khbra", ar: "خبرة" },
    title: { en: "UI/UX Design Fundamentals", ar: "أساسيات تصميم UI/UX" },
    score: "90%",
    rank: { en: "Top 5% in Egypt", ar: "ضمن أفضل 5% في مصر" },
    date: { en: "Nov 2026", ar: "نوفمبر 2026" },
    href: "https://khbra.com/attempts/0249932e-1249-416b-8ded-bc1380c58404",
  },
];

const credentialCopy = {
  en: { label: "Verified credentials", view: "View credential" },
  ar: { label: "شهادات موثّقة", view: "عرض الشهادة" },
};

export async function Skills() {
  const { locale, t } = await getI18n();
  const copy = credentialCopy[locale];
  const groups: SkillGroup[] = skillCategories
    .filter((category) => category.skills.length > 0)
    .map((category) => ({
      ...category,
      name: t.skills.categories[category.id].name,
      blurb: t.skills.categories[category.id].blurb,
    }));

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden border-y border-flame/10 bg-ink-900 py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -bottom-1/3 -start-1/4 -z-10 size-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.22),transparent)]" />

      <div className="container-x">
        <SectionLabel index="03" label={t.skills.label} />
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <LineReveal
            id="skills-title"
            lines={t.skills.titleLines}
            className="font-display text-[clamp(2.75rem,7vw,6.25rem)] leading-display font-semibold text-cream lg:col-span-7"
          />
          <Reveal className="lg:col-span-5 lg:pb-3" delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-sand">{t.skills.lead}</p>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-14">
          <SkillsTable groups={groups} />
        </div>

        {credentials.length > 0 && (
          <Reveal className="mt-12 lg:mt-14">
            <p className="font-mono text-xs tracking-wide text-dust uppercase">{copy.label}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-5 rounded-2xl border border-cream/10 bg-ink/70 p-5 transition-[border-color,background-color] duration-500 hover:border-flame/55 hover:bg-ink-800"
                  >
                    <span dir="ltr" className="font-display text-4xl leading-none font-semibold text-flame">
                      {item.score}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-cream">{item.title[locale]}</span>
                      <span className="mt-1 block text-sm text-sand">
                        {item.issuer[locale]} · {item.rank[locale]} · {item.date[locale]}
                      </span>
                      <span className="mt-2 block text-xs text-ember-300 transition-colors group-hover:text-flame">
                        {copy.view} ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
