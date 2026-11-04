import { CountUp } from "@/components/ui/CountUp";
import { getI18n } from "@/i18n/server";
import { getIndustries, getProjects } from "@/lib/projects";

/**
 * Compact numbers row under the hero. Projects and industries are counted
 * from data/projects.ts so they stay in step as work is added; labels come
 * from the dictionaries (t.stats.items, same order).
 */
export async function Stats() {
  const { t } = await getI18n();
  const projects = getProjects();
  const stats = [
    { value: projects.length },
    { value: getIndustries(projects).length },
    { value: 2 },
    { value: 100, suffix: "%" },
  ];

  return (
    <section aria-label={t.stats.label} className="relative pt-4 pb-14 sm:pb-16">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            // dt first in the markup for screen readers; the number shows on top.
            <div key={i} className="flex flex-col-reverse justify-end gap-3 bg-ink px-5 py-6 sm:px-8 sm:py-8">
              <dt className="eyebrow leading-relaxed text-dust">{t.stats.items[i]}</dt>
              <dd className="font-display text-5xl leading-none font-semibold text-cream sm:text-6xl">
                {/* LTR so "100%" keeps its order on Arabic pages */}
                <span dir="ltr" className="inline-block">
                  <CountUp to={stat.value} />
                  {stat.suffix && <span className="text-flame">{stat.suffix}</span>}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
