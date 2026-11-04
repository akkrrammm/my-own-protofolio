import { projects, type Industry, type Project } from "@/data/projects";
import { INDUSTRIES } from "@/lib/project-helpers";

// Pure helpers live in project-helpers.ts so Client Components can use them
// without bundling the project data; re-exported here for convenience.
export { groupProjects, screenshotAlt } from "@/lib/project-helpers";
export { pad } from "@/lib/pad";

/** All projects in display order. Fails the build on a duplicate slug. */
export function getProjects(): Project[] {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) throw new Error(`data/projects.ts: duplicate slug "${project.slug}"`);
    seen.add(project.slug);
  }
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
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

/** Industries in filter order, keeping only those some project belongs to. */
export function getIndustries(list: Project[] = getProjects()): Industry[] {
  return INDUSTRIES.filter((industry) => list.some((p) => p.industry === industry));
}
