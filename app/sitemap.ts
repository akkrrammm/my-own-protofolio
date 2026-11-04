import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getProjects } from "@/lib/projects";
import { localeAlternates } from "@/lib/seo";

/** Home and every real (non-sample) case study, in both languages, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...getProjects().filter((p) => !p.sample).map((p) => `/work/${p.slug}`)];
  const absolute = (path: string) => `${siteConfig.url}${path}`;

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(`/${locale}${path}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(Object.entries(localeAlternates(locale, path).languages).map(([lang, href]) => [lang, absolute(href)])),
      },
    })),
  );
}
