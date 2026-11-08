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
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://akram-tanany-portfolio.vercel.app").replace(/\/+$/, ""),

  /**
   * Social card for every page except project pages (which use their cover):
   * the portrait, whole and centred, on a blurred copy of itself. 1200 × 630
   * JPEG, kept under 300 KB so WhatsApp shows it.
   */
  ogImage: { src: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg" },

  name: { en: "Akram Tanany", ar: "أكرم الطناني" } satisfies Localized,
  firstName: { en: "Akram", ar: "أكرم" } satisfies Localized,
  role: { en: "Web Developer", ar: "مطوّر ويب" } satisfies Localized,
  /**
   * Logo files (public/brand). `mark` is the "A" emblem cut from the full
   * logo; it is also the favicon and app icon (app/icon1.png, app/icon2.png,
   * app/apple-icon.png, public/brand/icon-*.png).
   */
  brand: {
    mark: "/brand/logo-mark.png",
    lockup: { src: "/brand/logo-lockup.jpg", width: 1000, height: 943 },
    banner: { src: "/brand/banner.jpg", width: 1536, height: 1024 },
  },

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
   * Where the contact form posts (Formspree). Messages arrive in the inbox of
   * the Formspree account that owns the form. NEXT_PUBLIC_CONTACT_ENDPOINT
   * overrides it with another endpoint that answers JSON the same way.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "https://formspree.io/f/mvkkdwpl",
};

export type SiteConfig = typeof siteConfig;
