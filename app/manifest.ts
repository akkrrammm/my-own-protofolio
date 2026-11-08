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
      { src: "/brand/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: siteConfig.brand.mark, type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/brand/icon-maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
