import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Canonical + hreflang alternates for a page that exists in every language.
 * Paths are relative; `metadataBase` (app/[lang]/layout.tsx) makes them
 * absolute from siteConfig.url. `path` is "" for home or "/work/<slug>".
 */
export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
