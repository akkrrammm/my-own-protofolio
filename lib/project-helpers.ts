import { format } from "@/components/ui/Accent";
import type { Industry, Project } from "@/data/projects";
import { pick, type Localized, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Filter order on the home page. */
export const INDUSTRIES: Industry[] = ["healthcare", "industrial", "construction"];

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

/** Alt text for a project screenshot: "Gaint Storage website — products page". */
export function screenshotAlt(project: Project, label: Localized, locale: Locale, t: Dictionary): string {
  return format(t.project.screenshotAlt, { title: pick(project.title, locale), label: pick(label, locale) });
}
