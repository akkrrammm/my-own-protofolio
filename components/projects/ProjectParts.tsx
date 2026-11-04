import { cn } from "@/lib/cn";

/** "SAMPLE" marker on placeholder projects (data/projects.ts → sample: true). */
export function SampleBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-flame/50 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.16em] text-flame uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-flame" />
      {label}
    </span>
  );
}

export function TechList({ technologies, label, className }: { technologies: string[]; label: string; className?: string }) {
  if (technologies.length === 0) return null;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {technologies.map((tech) => (
        <li key={tech} dir="ltr" className="rounded-full border border-cream/12 bg-cream/[0.03] px-3 py-1 font-mono text-[11px] text-sand">
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** Browser chrome above a screenshot. The address shows the live domain when there is one. */
export function BrowserBar({ url }: { url: string }) {
  return (
    <div aria-hidden className="flex items-center gap-3 border-b border-cream/10 bg-ink-900 px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-ember/80" />
        <span className="size-2.5 rounded-full bg-flame/60" />
        <span className="size-2.5 rounded-full bg-cream/20" />
      </span>
      <span dir="ltr" className="mx-auto max-w-[60%] truncate rounded-full bg-cream/[0.06] px-4 py-1 font-mono text-[11px] text-dust">
        {url}
      </span>
      <span className="w-[42px]" />
    </div>
  );
}

export function displayUrl(liveUrl: string | undefined, slug: string): string {
  if (!liveUrl) return `${slug}`;
  try {
    return new URL(liveUrl).host.replace(/^www\./, "");
  } catch {
    return slug;
  }
}
