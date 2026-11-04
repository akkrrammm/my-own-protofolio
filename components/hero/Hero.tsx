import type { CSSProperties } from "react";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { Accent, format } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { siteConfig } from "@/config/site";
import { pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The opening statement. Its entrance is pure CSS (see .rise-line and
 * .fade-in in globals.css) so it plays on first paint, before JavaScript;
 * only the portrait's parallax needs the client.
 */
export async function Hero() {
  const { locale, t } = await getI18n();
  const name = pick(siteConfig.name, locale);
  const role = pick(siteConfig.role, locale);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-28 lg:flex lg:min-h-[100svh] lg:flex-col lg:pt-28 lg:pb-10"
    >
      <HeroBackdrop outline={t.hero.outline} />

      <div className="container-x relative grid flex-1 items-center lg:grid-cols-12 lg:gap-x-10">
        {/* Copy — overlaps the bottom of the portrait on small screens */}
        <div className="relative z-10 -mt-[26vw] sm:-mt-[18vw] lg:col-span-7 lg:mt-0">
          <div className="fade-in" style={delay(80)}>
            <Availability label={siteConfig.availableForWork ? t.hero.available : t.hero.unavailable} available={siteConfig.availableForWork} />
          </div>

          <p className="fade-in eyebrow mt-6 text-sand" style={delay(160)}>
            {name} <span className="text-flame">/</span> {role}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.85rem,12.2vw,5.75rem)] leading-display font-semibold text-cream lg:text-[clamp(4.25rem,6.5vw,8rem)]"
          >
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className="rise-mask">
                <span className="rise-line" style={delay(240 + i * 110)}>
                  <Accent text={line} className="pe-[0.04em]" />
                </span>
              </span>
            ))}
          </h1>

          <p className="fade-in mt-7 max-w-[36ch] text-lg leading-relaxed text-sand sm:text-xl" style={delay(680)}>
            {t.hero.lead}
          </p>

          <div className="fade-in mt-9 flex flex-wrap items-center gap-3 sm:gap-4" style={delay(800)}>
            <Magnetic>
              <ButtonLink href="#projects">{t.hero.primaryCta}</ButtonLink>
            </Magnetic>
            <ButtonLink href="#contact" variant="ghost" icon="external">
              {t.hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative order-first ms-auto w-[86%] sm:w-[66%] lg:order-none lg:col-span-5 lg:w-full lg:max-w-[min(34rem,calc((100svh_-_11rem)*0.8))]">
          <HeroPortrait alt={format(t.hero.portraitAlt, { name })} stamp={t.hero.stamp} latin={locale !== "ar"} />
        </div>
      </div>

      {/* Bottom rail */}
      <div className="container-x relative mt-12 hidden items-end justify-between lg:flex">
        <a href="#about" className="fade-in group eyebrow flex items-center gap-4 text-dust transition-colors hover:text-cream" style={delay(1200)}>
          <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-cream/15">
            <span className="absolute inset-0 animate-scroll-cue bg-flame" />
          </span>
          {t.hero.scroll}
        </a>
        <p className="fade-in eyebrow text-dust" style={delay(1250)}>
          <span className="text-flame">©</span> {new Date().getFullYear()} — {t.hero.index}
        </p>
      </div>
    </section>
  );
}

function Availability({ label, available }: { label: string; available: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-flame/20 bg-ink-900/70 py-1.5 ps-3 pe-4 text-xs text-sand sm:text-sm">
      <span aria-hidden className="relative flex size-2">
        {available && <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-flame/70" />}
        <span className={available ? "relative inline-flex size-2 rounded-full bg-flame" : "relative inline-flex size-2 rounded-full bg-dust"} />
      </span>
      {label}
    </span>
  );
}

function HeroBackdrop({ outline }: { outline: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-[30%] -end-[18%] size-[78vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.4),transparent)] will-change-transform" />
      <div className="absolute -bottom-[40%] -start-[22%] size-[62vmax] animate-drift-slow rounded-full bg-[radial-gradient(closest-side,rgb(255_152_0/0.09),transparent)] will-change-transform" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink to-transparent" />
      <p
        className="fade-in absolute -bottom-[0.2em] -start-[0.03em] font-display text-[23vw] leading-none font-bold tracking-[-0.05em] whitespace-nowrap opacity-70 text-outline-flame"
        style={delay(1000)}
      >
        {outline}
      </p>
    </div>
  );
}
