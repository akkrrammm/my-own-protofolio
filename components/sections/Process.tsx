import { ProcessPortrait } from "@/components/process/ProcessPortrait";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { localeSettings } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

export async function Process() {
  const { locale, t } = await getI18n();
  const rtl = localeSettings[locale].dir === "rtl";

  return (
    <section id="process" aria-labelledby="process-title" className="relative isolate py-20 sm:py-24 lg:py-28">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="04" label={t.process.label} />
            <LineReveal
              id="process-title"
              lines={t.process.titleLines}
              className="mt-8 font-display text-[clamp(2.75rem,6.4vw,5.75rem)] leading-display font-semibold text-cream lg:mt-10"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-sand">{t.process.lead}</p>
            </Reveal>

            {/* The portrait assembles one slice per step as the timeline scrolls past */}
            <ProcessPortrait track="self" rtl={rtl} className="mt-14 max-w-sm lg:hidden" />
            <div className="relative mt-14 hidden w-68 lg:block xl:w-80">
              {/* Orbit behind it: the process loops — launch feeds the next discovery */}
              <div aria-hidden className="absolute top-1/2 -end-28 -z-10 size-56 -translate-y-1/2">
                <div className="absolute inset-0 rounded-full border border-cream/10" />
                <div className="absolute inset-7 rounded-full border border-dashed border-flame/25" />
                <div className="absolute inset-14 rounded-full border border-cream/10 bg-[radial-gradient(closest-side,rgb(171_40_0/0.4),transparent)]" />
                <div className="absolute inset-0 animate-spin-slow">
                  <span className="absolute inset-x-0 top-0 mx-auto size-3 -translate-y-1/2 rounded-full bg-flame shadow-[0_0_24px_rgb(255_152_0)]" />
                </div>
                <div className="absolute inset-7 animate-spin-slow [animation-direction:reverse] [animation-duration:20s]">
                  <span className="absolute inset-x-0 bottom-0 mx-auto size-2 translate-y-1/2 rounded-full bg-ember-300" />
                </div>
              </div>
              <ProcessPortrait track="steps" rtl={rtl} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-16">
          <ProcessTimeline steps={t.process.steps} />
        </div>
      </div>
    </section>
  );
}
