import type { Localized } from "@/i18n/config";

/**
 * ✏️ Your identity and contact details — edit this file first.
 *
 * Every contact channel is optional: leave a value as "" and its link
 * disappears everywhere (contact section, mobile menu, footer).
 */
export const siteConfig = {
  /** Production URL, used for canonical links, the sitemap and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

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
