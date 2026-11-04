import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/brand/BrandIcons";
import { Monogram } from "@/components/brand/Monogram";
import { NAV_ITEMS, navLabel } from "@/components/layout/nav";
import { siteConfig } from "@/config/site";
import { pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

export async function Footer() {
  const { locale, t } = await getI18n();
  const name = pick(siteConfig.name, locale);
  const firstName = pick(siteConfig.firstName, locale);
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  const socials = [
    contact.github && { href: contact.github, label: t.contact.channels.github, Icon: GithubIcon },
    contact.linkedin && { href: contact.linkedin, label: t.contact.channels.linkedin, Icon: LinkedinIcon },
    contact.whatsapp && { href: `https://wa.me/${contact.whatsapp}`, label: t.contact.channels.whatsapp, Icon: WhatsappIcon },
  ].filter((s): s is Exclude<typeof s, "" | false> => Boolean(s));

  return (
    <footer className="relative isolate overflow-hidden border-t border-flame/10 bg-ink-950">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-flame/50 to-transparent" />
      <div aria-hidden className="absolute -top-40 start-1/2 -z-10 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.28),transparent)] rtl:translate-x-1/2" />

      <div className="container-x pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={name}>
              <Monogram className="size-12" />
              <span className="font-display text-xl font-semibold text-cream">{name}</span>
            </a>
            <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-sand italic">{t.footer.statement}</p>
          </div>

          <nav aria-label={t.footer.navLabel} className="md:col-span-3">
            <p className="eyebrow text-dust">{t.footer.menu}</p>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((id) => (
                <li key={id}>
                  <a
                    href={id === "home" ? `/${locale}` : `/${locale}#${id}`}
                    className="group inline-flex items-center gap-2 text-sand transition-colors hover:text-cream"
                  >
                    <span aria-hidden className="h-px w-0 bg-flame transition-[width] duration-500 ease-expo group-hover:w-4" />
                    {navLabel(id, t)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-dust">{t.footer.social}</p>
            <ul className="mt-5 space-y-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sand transition-colors hover:text-flame"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                </li>
              ))}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="text-sand underline decoration-flame/30 underline-offset-4 transition-colors hover:text-flame">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-dust">
            © {year} {name}. {t.footer.rights}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-3 text-sm text-sand transition-colors hover:text-flame"
          >
            {t.footer.backToTop}
            <span className="grid size-9 place-items-center rounded-full border border-cream/15 transition-[border-color,transform] duration-500 ease-expo group-hover:-translate-y-1 group-hover:border-flame">
              <ArrowUp className="size-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.24em] select-none text-center font-display text-[24vw] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(255_152_0/0.16)]"
      >
        {firstName}
      </p>
    </footer>
  );
}
