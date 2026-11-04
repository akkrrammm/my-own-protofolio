"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/brand/BrandIcons";
import { Monogram } from "@/components/brand/Monogram";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NAV_ITEMS, navHref, navLabel, type NavId } from "@/components/layout/nav";
import { siteConfig } from "@/config/site";
import { pad } from "@/lib/pad";
import { cn } from "@/lib/cn";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen menu for touch-sized screens. Opens as a circle growing out
 * of the menu button; traps focus, closes on Escape, and locks page scroll.
 */
export function MobileMenu({
  open,
  onClose,
  active,
  onHome,
}: {
  open: boolean;
  onClose: () => void;
  active: NavId;
  onHome: boolean;
}) {
  const { locale, t } = useI18n();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // The circle grows from the menu button, which sits at the inline end.
  const origin = locale === "ar" ? "2.75rem 2.6rem" : "calc(100% - 2.75rem) 2.6rem";
  const { contact } = siteConfig;
  const socials = [
    contact.github && { href: contact.github, label: t.contact.channels.github, Icon: GithubIcon },
    contact.linkedin && { href: contact.linkedin, label: t.contact.channels.linkedin, Icon: LinkedinIcon },
    contact.whatsapp && { href: `https://wa.me/${contact.whatsapp}`, label: t.contact.channels.whatsapp, Icon: WhatsappIcon },
  ].filter((s): s is Exclude<typeof s, "" | false> => Boolean(s));

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuTitle}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${origin})` }}
          animate={reduce ? { opacity: 1 } : { clipPath: `circle(150% at ${origin})` }}
          exit={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* Atmosphere */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -bottom-1/3 start-1/2 size-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.45),transparent)] rtl:translate-x-1/2" />
            <div className="bg-grid absolute inset-0" />
          </div>

          <div className="container-x flex items-center justify-between pt-5">
            <Monogram className="size-10" />
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="grid size-10 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-flame hover:text-flame"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label={t.nav.label} className="container-x flex flex-1 flex-col justify-center py-10">
            <ul className="space-y-1">
              {NAV_ITEMS.map((id, i) => (
                <li key={id} className="overflow-hidden">
                  <m.a
                    href={navHref(id, locale, onHome)}
                    onClick={onClose}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "group flex items-baseline gap-4 py-1 font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-heading font-semibold transition-colors",
                      id === active ? "text-flame" : "text-cream hover:text-flame",
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-dust">{pad(i + 1)}</span>
                    {navLabel(id, t)}
                  </m.a>
                </li>
              ))}
            </ul>
          </nav>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="container-x space-y-6 border-t border-cream/10 pt-6 pb-8"
          >
            {contact.email && (
              <div>
                <p className="eyebrow text-dust">{t.nav.sayHello}</p>
                <a href={`mailto:${contact.email}`} className="mt-2 inline-block font-display text-xl text-cream underline decoration-flame/40 underline-offset-4">
                  {contact.email}
                </a>
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <ul className="flex items-center gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-cream/15 text-sand transition-colors hover:border-flame hover:text-flame"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
              <LanguageSwitcher section={onHome ? active : null} />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
