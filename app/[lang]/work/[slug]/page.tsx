import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties, type ReactNode } from "react";
import { GithubButton } from "@/components/projects/ProjectCards";
import { BrowserBar, displayUrl, SampleBadge, TechList } from "@/components/projects/ProjectParts";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import type { Project } from "@/data/projects";
import { localeSettings, locales, pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { getProjectBySlug, getProjectContext, getProjects, pad, screenshotAlt } from "@/lib/projects";
import { localeAlternates } from "@/lib/seo";
import { pageTransition } from "@/lib/transitions";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}
export const dynamicParams = false;

/**
 * Social card for a project: a 1200 × 630 crop of its cover saved next to it
 * as og.jpg (JPEG, which every network accepts), else the cover itself.
 */
function socialImage(project: Project) {
  const og = `/images/projects/${project.slug}/og.jpg`;
  return existsSync(join(process.cwd(), "public", og)) ? { url: og, width: 1200, height: 630 } : { url: project.coverImage, width: 1920, height: 1200 };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = pick(project.title, locale);
  const description = pick(project.description, locale);
  const path = `/work/${slug}`;
  const name = pick(siteConfig.name, locale);
  const image = { ...socialImage(project), alt: screenshotAlt(project, t.project.homepage, locale, t) };
  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    // Page-level openGraph replaces the layout's, so it is complete here.
    openGraph: {
      type: "article",
      url: `/${locale}${path}`,
      siteName: name,
      title: `${title} — ${name}`,
      description,
      locale: localeSettings[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeSettings[l].ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${title} — ${name}`, description, images: [image] },
    // Placeholder projects stay out of search results.
    ...(project.sample ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { index, total, next } = getProjectContext(slug);
  const title = pick(project.title, locale);
  const description = pick(project.description, locale);
  const category = pick(project.category, locale);
  const client = project.client ? pick(project.client, locale) : null;
  const study = project.caseStudy;
  const challenge = study?.challenge ? pick(study.challenge, locale) : null;
  const solution = study?.solution ? pick(study.solution, locale) : null;
  const features = study?.features ? pick(study.features, locale) : [];
  const gallery = project.galleryImages ?? [];
  const domain = displayUrl(project.liveUrl, project.slug);

  // Case-study chapters in order; any without content is skipped and the
  // numbering closes up.
  const chapters: { id: string; label: string; wide?: boolean; body: ReactNode }[] = [];

  chapters.push({
    id: "overview",
    label: t.project.overviewLabel,
    body: (
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {client && <Fact label={t.project.client}>{client}</Fact>}
        <Fact label={t.project.industry}>{category}</Fact>
        {project.liveUrl && (
          <Fact label={t.project.liveSite}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="group inline-flex items-center gap-1.5 font-medium text-cream underline decoration-flame/40 underline-offset-[6px] transition-colors hover:text-flame"
            >
              {domain}
              <ArrowUpRight aria-hidden className="size-4 text-flame transition-transform duration-500 ease-expo group-hover:rotate-45" />
            </a>
          </Fact>
        )}
        {project.technologies.length > 0 && (
          <Fact label={t.project.stack} className="sm:col-span-2">
            <TechList technologies={project.technologies} label={t.project.stack} className="mt-1" />
          </Fact>
        )}
      </dl>
    ),
  });

  if (challenge) {
    chapters.push({
      id: "challenge",
      label: t.project.challenge,
      body: <p className="max-w-[52ch] font-display text-2xl leading-snug text-cream sm:text-3xl sm:leading-snug">{challenge}</p>,
    });
  }

  if (solution || features.length > 0) {
    chapters.push({
      id: "solution",
      label: t.project.solution,
      body: (
        <>
          {solution && <p className="max-w-[52ch] font-display text-2xl leading-snug text-cream sm:text-3xl sm:leading-snug">{solution}</p>}
          {features.length > 0 && (
            <ul aria-label={t.project.features} className={`grid gap-x-8 gap-y-4 sm:grid-cols-2 ${solution ? "mt-10" : ""}`}>
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 border-t border-cream/10 pt-4 text-lg text-sand">
                  <span aria-hidden className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-flame/15 text-flame">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    });
  }

  if (gallery.length > 0) {
    chapters.push({
      id: "screenshots",
      label: t.project.gallery,
      wide: true,
      body: (
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {gallery.map((shot, i) => (
            <Reveal key={shot.src} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
              <figure className="overflow-hidden rounded-[20px] border border-cream/10 bg-ink-800">
                <BrowserBar url={domain} />
                <div className="relative aspect-[16/10]">
                  <Image
                    src={shot.src}
                    alt={screenshotAlt(project, shot.label, locale, t)}
                    fill
                    sizes={i % 3 === 0 ? "(min-width: 1440px) 1312px, 92vw" : "(min-width: 768px) 46vw, 92vw"}
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      ),
    });
  }

  return (
    <ViewTransition {...pageTransition}>
      <article className="relative isolate pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem]"
          style={{ background: `radial-gradient(55% 60% at 70% 0%, ${project.accent ?? "#ab2800"}40, transparent), radial-gradient(40% 50% at 10% 10%, rgb(171 40 0 / 0.25), transparent)` }}
        />
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem]" />

        <div className="container-x">
          <div className="flex items-center justify-between gap-6">
            <Link
              href={`/${locale}#projects`}
              transitionTypes={["page-back"]}
              className="group inline-flex items-center gap-3 text-sand transition-colors hover:text-cream"
            >
              <span className="grid size-10 place-items-center rounded-full border border-cream/15 transition-[border-color,translate] duration-500 ease-expo group-hover:-translate-x-1 group-hover:border-flame rtl:group-hover:translate-x-1">
                <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden />
              </span>
              {t.project.back}
            </Link>
            <p className="eyebrow text-dust">
              {pad(index)} <span className="text-flame">/</span> {pad(total)}
            </p>
          </div>

          {project.sample && (
            <p className="fade-in mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-dashed border-flame/40 bg-ember/10 px-5 py-4 text-sm leading-relaxed text-sand" style={delay(100)}>
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-flame" />
              {t.project.sampleBanner}
            </p>
          )}

          <header className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <div className="fade-in eyebrow flex flex-wrap items-center gap-3 text-flame" style={delay(150)}>
                {category}
                {project.sample && <SampleBadge label={t.work.sample} />}
              </div>
              <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8.5rem)] leading-display font-semibold text-cream">
                <span className="rise-mask">
                  <span className="rise-line" style={delay(200)}>
                    {title}
                  </span>
                </span>
              </h1>
            </div>
            <div className="fade-in lg:col-span-4 lg:pb-3" style={delay(400)}>
              <p className="text-xl leading-relaxed text-sand">{description}</p>
              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <ButtonLink href={project.liveUrl} icon="external">
                      {t.project.visit}
                    </ButtonLink>
                  )}
                  {project.githubUrl && <GithubButton href={project.githubUrl} label={`${t.work.code} — ${title}`} />}
                </div>
              )}
            </div>
          </header>

          {/* Cover — morphs in from the card that was clicked */}
          <figure className="portrait-enter mt-12 lg:mt-16" style={delay(300)}>
            <div className="overflow-hidden rounded-[24px] border border-cream/10 bg-ink-800 shadow-[0_60px_120px_-60px_rgb(0_0_0/0.95)]">
              <BrowserBar url={domain} />
              <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                <div className="relative aspect-[16/10] bg-ink-900">
                  <Image
                    src={project.coverImage}
                    alt={screenshotAlt(project, t.project.homepage, locale, t)}
                    fill
                    preload
                    sizes="(min-width: 1440px) 1312px, 92vw"
                    className="object-cover object-top"
                  />
                </div>
              </ViewTransition>
            </div>
          </figure>

          <div className="mt-16 lg:mt-24">
            {chapters.map((chapter, i) => (
              <section
                key={chapter.id}
                aria-labelledby={`chapter-${chapter.id}`}
                className={`grid gap-8 border-t border-cream/10 py-12 lg:gap-12 lg:py-16 ${chapter.wide ? "" : "lg:grid-cols-12"}`}
              >
                <Reveal className={chapter.wide ? undefined : "lg:col-span-4"}>
                  <h2 id={`chapter-${chapter.id}`} className="flex items-baseline gap-4">
                    <span aria-hidden className="font-display text-5xl leading-none font-bold text-outline-flame">
                      {pad(i + 1)}
                    </span>
                    <span className="eyebrow text-flame">{chapter.label}</span>
                  </h2>
                </Reveal>
                <Reveal className={chapter.wide ? undefined : "lg:col-span-8"} delay={0.08}>
                  {chapter.body}
                </Reveal>
              </section>
            ))}
          </div>

          {next && (
            <Link href={`/${locale}/work/${next.slug}`} transitionTypes={["page-forward"]} className="group mt-16 block border-t border-cream/10 pt-12 lg:mt-24">
              <p className="eyebrow text-dust">{t.project.next}</p>
              <div className="mt-6 flex items-end justify-between gap-6">
                <span className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-display font-semibold text-cream transition-colors duration-500 group-hover:text-flame">
                  {pick(next.title, locale)}
                </span>
                <span className="mb-2 grid size-14 shrink-0 place-items-center rounded-full bg-flame text-ink transition-transform duration-500 ease-expo group-hover:rotate-45 sm:size-20 rtl:group-hover:-rotate-45">
                  <ArrowUpRight className="size-6 sm:size-8 rtl:-scale-x-100" aria-hidden />
                </span>
              </div>
              <div className="relative mt-10 aspect-[16/6] overflow-hidden rounded-3xl border border-cream/10">
                <Image
                  src={next.coverImage}
                  alt=""
                  fill
                  sizes="92vw"
                  className="object-cover object-top opacity-45 grayscale transition-[opacity,filter,scale] duration-1000 ease-expo group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            </Link>
          )}
        </div>
      </article>
    </ViewTransition>
  );
}

function Fact({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <dt className="eyebrow text-dust">{label}</dt>
      <dd className="mt-2 text-lg leading-relaxed text-cream">{children}</dd>
    </div>
  );
}
