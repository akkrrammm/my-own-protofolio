import type { Dictionary } from "@/i18n/dictionaries";

/** Header / menu / footer links, in order. Each id is a section on the home page. */
export const NAV_ITEMS = ["home", "about", "projects", "skills", "contact"] as const;
export type NavId = (typeof NAV_ITEMS)[number];

export function navLabel(id: NavId, t: Dictionary): string {
  return t.nav[id];
}

/** On the home page a plain hash scrolls in place; elsewhere it goes home first. */
export function navHref(id: NavId, locale: string, onHome: boolean): string {
  if (onHome) return `#${id}`;
  return id === "home" ? `/${locale}` : `/${locale}#${id}`;
}
