import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties } from "react";
import { GithubButton } from "@/components/projects/ProjectCards";
import { BrowserBar, displayUrl, SampleBadge, TechList } from "@/components/projects/ProjectParts";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { pick } from "@/i18n/config";
import { getI18n, getLocale } from "@/i18n/server";
import { getProjectBySlug, getProjectContext, getProjects, pad } from "@/lib/projects";
import { pageTransition } from "@/lib/transitions";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = pick(project.title, locale);
  const description = pick(project.description, locale);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, ar: `/ar/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    openGraph: { title, description, url: `/${locale}/work/${slug}`, type: "article" },
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
  const study = project.caseStudy;
  const role = study?.role ? pick(study.role, locale) : null;

  const chapters = [
    { label: t.project.overviewLabel, text: study?.overview },
    { label: t.project.challenge, text: study?.challenge },
    { label: t.project.approach, text: study?.approach },
    { label: t.project.outcome, text: study?.outcome },
  ].flatMap((chapter) => (chapter.text ? [{ label: chapter.label, text: pick(chapter.text, locale) }] : []));

  const gallery = project.galleryImages ?? [];

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

          <header className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
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
            <p className="fade-in text-xl leading-relaxed text-sand lg:col-span-4 lg:pb-3" style={delay(400)}>
              {description}
            </p>
          </header>

          <dl className="fade-in mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-cream/10 py-8 md:grid-cols-4" style={delay(500)}>
            <div>
              <dt className="eyebrow text-dust">{t.project.category}</dt>
              <dd className="mt-2 text-cream">{category}</dd>
            </div>
            {role && (
              <div>
                <dt className="eyebrow text-dust">{t.project.role}</dt>
                <dd className="mt-2 text-cream">{role}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="eyebrow text-dust">{t.project.year}</dt>
                <dd className="mt-2 text-cream">{project.year}</dd>
              </div>
            )}
            <div className="col-span-2 md:col-span-1 md:col-start-4">
              <dt className="eyebrow text-dust">{t.project.stack}</dt>
              <dd className="mt-3">
                <TechList technologies={project.technologies} label={t.project.stack} />
              </dd>
            </div>
          </dl>

          {(project.liveUrl || project.githubUrl) && (
            <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={delay(600)}>
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} icon="external">
                  {t.project.visit}
                </ButtonLink>
              )}
              {project.githubUrl && <GithubButton href={project.githubUrl} label={`${t.work.code} — ${title}`} />}
            </div>
          )}

          {/* Cover — morphs in from the card that was clicked */}
          <figure className="portrait-enter mt-14 lg:mt-20" style={delay(300)}>
            <div className="overflow-hidden rounded-[24px] border border-cream/10 bg-ink-800 shadow-[0_60px_120px_-60px_rgb(0_0_0/0.95)]">
              <BrowserBar url={displayUrl(project.liveUrl, project.slug)} />
              <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                <div className="relative aspect-[16/10] bg-ink-900">
                  <Image src={project.coverImage} alt={title} fill preload sizes="(min-width: 1440px) 1312px, 92vw" className="object-cover object-top" />
                </div>
              </ViewTransition>
            </div>
          </figure>

          {chapters.length > 0 && (
            <div className="mt-24 lg:mt-32">
              {chapters.map((chapter, i) => (
                <section key={chapter.label} className="grid gap-6 border-t border-cream/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
                  <Reveal className="lg:col-span-4">
                    <h2 className="flex items-baseline gap-4">
                      <span className="font-display text-5xl leading-none font-bold text-outline-flame">{pad(i + 1)}</span>
                      <span className="eyebrow text-flame">{chapter.label}</span>
                    </h2>
                  </Reveal>
                  <Reveal className="lg:col-span-8" delay={0.08}>
                    <p className="max-w-[52ch] font-display text-2xl leading-snug text-cream sm:text-3xl sm:leading-snug">{chapter.text}</p>
                  </Reveal>
                </section>
              ))}
            </div>
          )}

          {gallery.length > 0 && (
            <section className="mt-20 lg:mt-28" aria-label={t.project.gallery}>
              <div className="flex items-center gap-5">
                <h2 className="eyebrow text-flame">{t.project.gallery}</h2>
                <span aria-hidden className="h-px flex-1 bg-linear-to-r from-flame/40 to-transparent rtl:bg-linear-to-l" />
              </div>
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10">
                {gallery.map((src, i) => (
                  <Reveal key={src} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
                    <div className="overflow-hidden rounded-[20px] border border-cream/10 bg-ink-800">
                      <BrowserBar url={displayUrl(project.liveUrl, project.slug)} />
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={src}
                          alt={`${title} — ${pad(i + 1)}`}
                          fill
                          sizes={i % 3 === 0 ? "(min-width: 1440px) 1312px, 92vw" : "(min-width: 768px) 46vw, 92vw"}
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {next && (
            <Link href={`/${locale}/work/${next.slug}`} transitionTypes={["page-forward"]} className="group mt-28 block border-t border-cream/10 pt-12 lg:mt-40">
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
