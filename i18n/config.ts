/**
 * Languages, URL prefixes and direction. Every page lives under
 * `/{locale}/...` (app/[lang]); proxy.ts sends unprefixed URLs to the
 * visitor's saved language, or English by default.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Remembers an explicit language choice; read by proxy.ts for unprefixed URLs. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LocaleSettings {
  dir: "ltr" | "rtl";
  /** Open Graph locale. */
  ogLocale: string;
  /** Short label shown in the language switcher. */
  short: string;
  /** The language's own name, for screen readers and tooltips. */
  nativeName: string;
}

export const localeSettings: Record<Locale, LocaleSettings> = {
  en: { dir: "ltr", ogLocale: "en_US", short: "EN", nativeName: "English" },
  ar: { dir: "rtl", ogLocale: "ar_EG", short: "ع", nativeName: "العربية" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Splits "/en/work/x" into { locale: "en", path: "/work/x" } ("/en" → path "/"). */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: null, path: pathname || "/" };
}

/** The same page in another language: ("/en/work/x", "ar") → "/ar/work/x". */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { path } = splitLocale(pathname);
  return `/${target}${path === "/" ? "" : path}`;
}

/**
 * A value that may differ per language. A plain value is used for both;
 * an object needs English and may add Arabic (falls back to English).
 */
export type Localized<T = string> = T | { en: T; ar?: T };

export function pick<T>(value: Localized<T>, locale: Locale): T {
  if (value !== null && typeof value === "object" && "en" in (value as object)) {
    const v = value as { en: T; ar?: T };
    return v[locale] ?? v.en;
  }
  return value as T;
}
