"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, localeSettings, locales, switchLocalePath } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * EN / ع toggle. Opens the same page in the other language, keeps the
 * visitor at the section they were reading, and remembers the choice in a
 * cookie (read by proxy.ts for links without a language prefix).
 */
export function LanguageSwitcher({ section, className }: { section?: string | null; className?: string }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const target = locale === "en" ? "ar" : "en";
  const hash = section && section !== "home" ? `#${section}` : "";
  const href = `${switchLocalePath(pathname, target)}${hash}`;

  function remember() {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
  }

  return (
    <a
      href={href}
      hrefLang={target}
      onClick={remember}
      aria-label={`${t.nav.switchLanguage} ${localeSettings[target].nativeName}`}
      className={cn(
        "group relative inline-flex h-10 items-center rounded-full border border-cream/15 p-1 text-xs font-medium transition-colors duration-300 hover:border-flame/60",
        className,
      )}
    >
      {locales.map((code) => (
        <span
          key={code}
          lang={code}
          className={cn(
            "grid h-full min-w-8 place-items-center rounded-full px-2 transition-colors duration-300",
            code === locale ? "bg-cream/10 text-cream" : "text-dust group-hover:text-flame",
          )}
        >
          {localeSettings[code].short}
        </span>
      ))}
    </a>
  );
}
