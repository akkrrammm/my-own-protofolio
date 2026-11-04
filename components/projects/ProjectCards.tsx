import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/brand/BrandIcons";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { displayUrl, SampleBadge, TechList } from "@/components/projects/ProjectParts";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/data/projects";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/pad";
import { screenshotAlt } from "@/lib/project-helpers";

interface CardProps {
  project: Project;
  /** 1-based position in the full list. */
  index: number;
  locale: Locale;
  t: Dictionary;
}

function texts(project: Project, locale: Locale, t: Dictionary) {
  return {
    title: pick(project.title, locale),
    description: pick(project.description, locale),
    category: pick(project.category, locale),
    href: `/${locale}/work/${project.slug}`,
    coverAlt: screenshotAlt(project, t.project.homepage, locale, t),
  };
}

/** Large editorial row for featured work; `reversed` mirrors the layout. */
export function ProjectFeature({ project, index, locale, t, reversed }: CardProps & { reversed: boolean }) {
  const { title, description, category, href, coverAlt } = texts(project, locale, t);
  const headingId = `project-${project.slug}-title`;

  return (
    <article aria-labelledby={headingId} className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={cn("lg:col-span-7", reversed && "lg:order-2")}>
        <ProjectMedia
          slug={project.slug}
          href={href}
          src={project.coverImage}
          alt={coverAlt}
          url={displayUrl(project.liveUrl, project.slug)}
          accent={project.accent}
          viewLabel={t.work.view}
          sizes="(min-width: 1024px) 56vw, 100vw"
        />
      </div>

      <Reveal className="relative lg:col-span-5">
        <span aria-hidden className="block font-display text-[clamp(5rem,11vw,10rem)] leading-[0.8] font-bold tracking-[-0.06em] text-outline-flame">
          {pad(index)}
        </span>
        <div className="eyebrow mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-dust">
          <span className="text-flame">{category}</span>
          {project.year && (
            <>
              <span aria-hidden>•</span>
              <span>{project.year}</span>
            </>
          )}
          {project.sample && <SampleBadge label={t.work.sample} />}
        </div>
        <h3 id={headingId} className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-heading font-semibold text-cream">
          <Link href={href} transitionTypes={["page-forward"]} className="transition-colors duration-300 hover:text-flame">
            {title}
          </Link>
        </h3>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-sand">{description}</p>
        <TechList technologies={project.technologies} label={t.project.stack} className="mt-6" />

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={href} size="sm" transitionTypes={["page-forward"]}>
            {project.caseStudy ? t.work.caseStudy : t.work.details}
          </ButtonLink>
          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} size="sm" variant="ghost" icon="external" ariaLabel={`${t.work.live} — ${title}`}>
              {t.work.live}
            </ButtonLink>
          )}
          {project.githubUrl && <GithubButton href={project.githubUrl} label={`${t.work.code} — ${title}`} />}
        </div>
      </Reveal>
    </article>
  );
}

/** Smaller card for the offset grid below the featured rows. */
export function ProjectTile({ project, index, locale, t, className }: CardProps & { className?: string }) {
  const { title, description, category, href, coverAlt } = texts(project, locale, t);
  const headingId = `project-${project.slug}-title`;

  return (
    <article aria-labelledby={headingId} className={className}>
      <ProjectMedia
        slug={project.slug}
        href={href}
        src={project.coverImage}
        alt={coverAlt}
        url={displayUrl(project.liveUrl, project.slug)}
        accent={project.accent}
        viewLabel={t.work.view}
        sizes="(min-width: 768px) 46vw, 100vw"
      />
      <Reveal className="mt-8 flex gap-5 sm:gap-7">
        <span aria-hidden className="font-display text-5xl leading-[0.85] font-bold tracking-[-0.05em] text-outline-flame sm:text-6xl">
          {pad(index)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-dust">
            <span className="text-flame">{category}</span>
            {project.year && (
              <>
                <span aria-hidden>•</span>
                <span>{project.year}</span>
              </>
            )}
            {project.sample && <SampleBadge label={t.work.sample} />}
          </div>
          <h3 id={headingId} className="mt-3 font-display text-3xl leading-heading font-semibold text-cream sm:text-4xl">
            <Link href={href} transitionTypes={["page-forward"]} className="transition-colors duration-300 hover:text-flame">
              {title}
            </Link>
          </h3>
          <p className="mt-3 max-w-[44ch] leading-relaxed text-sand">{description}</p>
          <TechList technologies={project.technologies} label={t.project.stack} className="mt-5" />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <TextLink href={href} label={project.caseStudy ? t.work.caseStudy : t.work.details} internal />
            {project.liveUrl && <TextLink href={project.liveUrl} label={t.work.live} />}
            {project.githubUrl && <TextLink href={project.githubUrl} label={t.work.code} />}
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export function GithubButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full border border-cream/20 text-sand transition-colors duration-300 hover:border-flame hover:text-flame"
    >
      <GithubIcon size={17} />
    </a>
  );
}

function TextLink({ href, label, internal }: { href: string; label: string; internal?: boolean }) {
  const className =
    "group inline-flex items-center gap-1.5 font-medium text-cream underline decoration-flame/0 decoration-1 underline-offset-[6px] transition-[color,text-decoration-color] duration-300 hover:text-flame hover:decoration-flame/60";
  const icon = <ArrowUpRight aria-hidden className="size-4 text-flame transition-transform duration-500 ease-expo group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />;
  if (internal) {
    return (
      <Link href={href} transitionTypes={["page-forward"]} className={className}>
        {label}
        {icon}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      {icon}
    </a>
  );
}
