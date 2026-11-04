import type { Metadata, Viewport } from "next";
import { Alexandria, Bricolage_Grotesque, IBM_Plex_Sans_Arabic, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteConfig } from "@/config/site";
import { localeSettings, locales, pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import "../globals.css";

// Latin
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap", axes: ["opsz"] });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });
// Arabic — Arabic glyphs only, so Latin words on Arabic pages stay in the brand faces.
const alexandria = Alexandria({ subsets: ["arabic"], variable: "--font-alexandria", display: "swap", preload: false, adjustFontFallback: false });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const fontVariables = [bricolage, instrument, jetbrains, alexandria, plexArabic].map((font) => font.variable).join(" ");

/** Both languages are prerendered; any other prefix is a 404. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const name = pick(siteConfig.name, locale);
  const title = `${name} — ${t.meta.title}`;
  const other = locales.filter((l) => l !== locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s — ${name}` },
    description: t.meta.description,
    applicationName: name,
    authors: [{ name }],
    creator: name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: name,
      title,
      description: t.meta.description,
      locale: localeSettings[locale].ogLocale,
      alternateLocale: other.map((l) => localeSettings[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description: t.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#160600",
  colorScheme: "dark",
};

// Scroll reveals start hidden; without JavaScript, show everything.
const noScriptStyles = "[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}";

/**
 * Root layout for both languages: `lang` and `dir` come from the URL
 * (/ar → rtl, /en → ltr), so the server always renders the right direction —
 * no client-side detection, no flash of the wrong layout.
 */
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getI18n();
  const name = pick(siteConfig.name, locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: pick(siteConfig.role, locale),
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}${siteConfig.portrait.src}`,
    ...(siteConfig.contact.email ? { email: `mailto:${siteConfig.contact.email}` } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    sameAs: [siteConfig.contact.github, siteConfig.contact.linkedin].filter(Boolean),
  };

  return (
    <html lang={locale} dir={localeSettings[locale].dir} data-scroll-behavior="smooth" className={fontVariables}>
      <head>
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
      </head>
      <body id="top" className="grain">
        <a href="#main" className="skip-link">
          {t.skipToContent}
        </a>
        <I18nProvider locale={locale} t={t}>
          <MotionProvider>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </I18nProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
