import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getProjects } from "@/lib/projects";

/** Home and every real (non-sample) case study, in both languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...getProjects().filter((p) => !p.sample).map((p) => `/work/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
