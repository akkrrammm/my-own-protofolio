import { Gauge, PenTool, ScanSearch } from "lucide-react";
import Image from "next/image";
import { Accent, format } from "@/components/ui/Accent";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingStamp } from "@/components/ui/RotatingStamp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/config/site";
import { pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { pad } from "@/lib/projects";

const PRINCIPLE_ICONS = [PenTool, Gauge, ScanSearch];

export async function About() {
  const { locale, t } = await getI18n();
  const name = pick(siteConfig.name, locale);
  const firstName = pick(siteConfig.firstName, locale);

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute top-1/4 -end-1/4 -z-10 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.18),transparent)]" />

      <div className="container-x">
        <SectionLabel index="01" label={t.about.label} />

        <div className="mt-12 grid items-start gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <LineReveal
              id="about-title"
              lines={t.about.titleLines}
              className="font-display text-[clamp(2.75rem,8vw,7.25rem)] leading-display font-semibold text-cream"
            />
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-[32ch] font-display text-2xl leading-snug text-cream sm:text-3xl lg:text-[2.3rem] lg:leading-[1.22]">
                <Accent text={format(t.about.intro, { firstName: `{${firstName}}` })} />
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-4">
            <figure className="mx-auto w-full max-w-[20rem] lg:ms-auto lg:me-0">
              <RotatingStamp
                id="about-stamp"
                text={`${name} ✦ ${pick(siteConfig.role, locale)} ✦ `}
                latin={locale !== "ar"}
                className="w-full"
              >
                <span className="relative block size-[72%] overflow-hidden rounded-full border border-flame/35 bg-ink-800 shadow-[0_0_0_10px_rgb(22_6_0),0_0_80px_-10px_rgb(171_40_0/0.7)]">
                  <Image
                    src={siteConfig.portrait.src}
                    alt=""
                    fill
                    sizes="15rem"
                    className="origin-[50%_30%] scale-[1.6] object-cover object-top"
                  />
                  <span aria-hidden className="absolute inset-0 rounded-full shadow-[inset_0_0_36px_rgb(22_6_0/0.65)]" />
                </span>
              </RotatingStamp>
              <figcaption className="mt-3 flex items-center justify-center gap-2 font-serif text-xl text-sand italic">
                <svg aria-hidden viewBox="0 0 60 40" className="h-7 w-11 -translate-y-2 text-flame rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M4 34C14 34 30 30 38 18S46 4 46 4" />
                  <path d="M39 9l7-5 3 8" />
                </svg>
                {t.about.portraitCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Background · Approach · Philosophy */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 md:grid-cols-3 lg:mt-28">
          {t.about.blocks.map((block, i) => (
            <div key={block.label} className="bg-ink">
              <Reveal delay={i * 0.08} className="h-full p-7 sm:p-9">
                <p className="eyebrow flex items-center gap-3 text-flame">
                  <span className="text-dust">{pad(i + 1)}</span>
                  {block.label}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-sand">{block.text}</p>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Principles */}
        <ul className="mt-20 grid gap-10 sm:grid-cols-3 lg:mt-24 lg:gap-14">
          {t.about.principles.map((principle, i) => {
            const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
            return (
              <li key={principle.title}>
                <Reveal delay={i * 0.1}>
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl border border-flame/20 bg-ember/15 text-flame">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-linear-to-r from-cream/15 to-transparent rtl:bg-linear-to-l" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-cream">{principle.title}</h3>
                  <p className="mt-3 leading-relaxed text-sand">{principle.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Statement */}
        <Reveal className="mt-28 lg:mt-40">
          <figure className="relative mx-auto max-w-5xl text-center">
            <span aria-hidden className="pointer-events-none absolute -top-[0.45em] start-1/2 -translate-x-1/2 font-serif text-[9rem] leading-none text-ember/70 rtl:translate-x-1/2 sm:text-[12rem]">
              &ldquo;
            </span>
            <blockquote className="relative font-display text-[clamp(2rem,4.8vw,4.5rem)] leading-heading font-medium text-cream">
              <Accent text={t.about.quote} />
            </blockquote>
            <figcaption className="eyebrow mt-8 text-dust">— {name}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
