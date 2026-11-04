import { projects, type Project } from "@/data/projects";

/** All projects in display order. Fails the build on a duplicate slug. */
export function getProjects(): Project[] {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) throw new Error(`data/projects.ts: duplicate slug "${project.slug}"`);
    seen.add(project.slug);
  }
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Splits the list for the editorial layout: featured projects get the large
 * alternating rows, the rest the offset grid. With nothing marked featured,
 * the first project leads so the section never opens on small cards.
 */
export function groupProjects(list: Project[]): { featured: Project[]; rest: Project[] } {
  const featured = list.filter((p) => p.featured);
  if (featured.length === 0 && list.length > 0) return { featured: [list[0]], rest: list.slice(1) };
  return { featured, rest: list.filter((p) => !p.featured) };
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Position (1-based) and the following project, wrapping to the first. */
export function getProjectContext(slug: string): { index: number; total: number; next: Project | null } {
  const list = getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return {
    index: i + 1,
    total: list.length,
    next: list.length > 1 ? list[(i + 1) % list.length] : null,
  };
}

/** "01", "02", … */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
