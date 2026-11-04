"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_ITEMS, navHref, navLabel, type NavId } from "@/components/layout/nav";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { pick, splitLocale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Floating navigation: transparent over the hero, a frosted pill once the
 * page scrolls, tucked away while scrolling down and back on scroll up.
 * On the home page it tracks the section in view (scroll-spy).
 */
export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const onHome = splitLocale(pathname).path === "/";

  const [spied, setSpied] = useState<NavId>("home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Case-study pages belong to "Projects".
  const active: NavId = onHome ? spied : "projects";

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 520);
  });

  useEffect(() => {
    if (!onHome) return;
    const sections = NAV_ITEMS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    // A thin band across the middle of the viewport decides the active section.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSpied(entry.target.id as NavId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  }, []);

  const name = pick(siteConfig.name, locale);

  return (
    <>
      <header style={{ viewTransitionName: "site-header" }} className="fade-in fixed inset-x-0 top-0 z-50 [--d:900ms]">
        <m.div
          initial={false}
          animate={{ y: hidden && !menuOpen ? "-130%" : "0%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="container-x pt-3 sm:pt-4"
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border py-2 ps-2 pe-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 lg:ps-3",
              scrolled
                ? "border-flame/12 bg-ink-900/85 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-3 rounded-full pe-2"
              aria-label={`${name} — ${t.nav.home}`}
            >
              <Monogram className="size-10 transition-transform duration-700 ease-expo group-hover:rotate-[-8deg]" />
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-[0.95rem] font-semibold tracking-tight text-cream">{name}</span>
                <span className="font-mono text-[0.65rem] tracking-[0.16em] text-dust uppercase">{pick(siteConfig.role, locale)}</span>
              </span>
            </Link>

            <nav aria-label={t.nav.label} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((id) => {
                  const isActive = id === active;
                  return (
                    <li key={id}>
                      <a
                        href={navHref(id, locale, onHome)}
                        aria-current={isActive && onHome ? "true" : undefined}
                        className={cn(
                          "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300",
                          isActive ? "text-cream" : "text-sand hover:text-cream",
                        )}
                      >
                        {isActive && (
                          <m.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full border border-flame/25 bg-cream/[0.06]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span
                          aria-hidden
                          className={cn(
                            "relative size-1.5 rounded-full bg-flame transition-[opacity,scale] duration-300",
                            isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                          )}
                        />
                        <span className="relative">{navLabel(id, t)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher section={onHome ? spied : null} />
              <div className="hidden lg:block">
                <Magnetic>
                  <ButtonLink href={navHref("contact", locale, onHome)} size="sm">
                    {t.nav.cta}
                  </ButtonLink>
                </Magnetic>
              </div>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={t.nav.openMenu}
                className="group grid size-10 place-items-center rounded-full bg-flame text-ink lg:hidden"
              >
                <span aria-hidden className="flex w-4 flex-col gap-[5px]">
                  <span className="h-[1.5px] w-full rounded-full bg-current" />
                  <span className="h-[1.5px] w-2/3 rounded-full bg-current transition-[width] duration-300 group-hover:w-full" />
                </span>
              </button>
            </div>
          </div>
        </m.div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} onHome={onHome} />
    </>
  );
}
