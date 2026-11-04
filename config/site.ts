import type { Localized } from "@/i18n/config";

/**
 * Identity and contact details.
 *
 * Every contact channel is optional: leave a value as "" and its link
 * disappears everywhere (contact section, mobile menu, footer).
 */
export const siteConfig = {
  /**
   * Production URL, used for metadataBase, canonical links, hreflang, the
   * sitemap, robots.txt and JSON-LD. To move to a custom domain, set
   * NEXT_PUBLIC_SITE_URL (e.g. in Vercel's environment variables) — nothing
   * else needs to change.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://my-own-protofolio.vercel.app").replace(/\/+$/, ""),

  /** Social card for every page except project pages (which use their cover). 1200 × 630. */
  ogImage: { src: "/og-image.png", width: 1200, height: 630 },

  name: { en: "Akram Ayman", ar: "أكرم أيمن" } satisfies Localized,
  firstName: { en: "Akram", ar: "أكرم" } satisfies Localized,
  role: { en: "Web Developer", ar: "مطوّر ويب" } satisfies Localized,
  /** Letters drawn in the logo mark. */
  monogram: "AA",

  /** Drives the hero availability indicator. */
  availableForWork: true,

  /** The illustrated portrait (public/images). Displayed as-is, never altered. */
  portrait: {
    src: "/images/portrait.png",
    width: 1122,
    height: 1402,
  },

  contact: {
    email: "akramtanany202@gmail.com",
    /** International format, digits only (e.g. 2010xxxxxxxx). Shown formatted below. */
    whatsapp: "201007098636",
    whatsappDisplay: "+20 100 709 8636",
    /** Phone calls, international format with "+" (used for the tel: link). */
    phone: "+201007098636",
    phoneDisplay: "+20 100 709 8636",
    linkedin: "https://www.linkedin.com/in/akram-tanany",
    github: "https://github.com/akkrrammm",
  },

  /**
   * Contact form delivery. Set NEXT_PUBLIC_CONTACT_ENDPOINT to any endpoint
   * that accepts a JSON POST (Formspree, Web3Forms, Getform, or your own API)
   * and the form submits there. Left empty, the form opens the visitor's
   * email app with the message pre-filled instead — nothing is faked.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
};

export type SiteConfig = typeof siteConfig;
