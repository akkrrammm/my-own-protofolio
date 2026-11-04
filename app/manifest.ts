import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name.en} — ${siteConfig.role.en}`,
    short_name: siteConfig.firstName.en,
    start_url: "/",
    display: "standalone",
    background_color: "#160600",
    theme_color: "#160600",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
