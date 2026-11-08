import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/brand/BrandIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactStamp } from "@/components/contact/ContactStamp";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LineReveal } from "@/components/ui/LineReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/config/site";
import { localeSettings, pick } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function Contact() {
  const { locale, t } = await getI18n();
  const { contact } = siteConfig;
  const { lockup } = siteConfig.brand;
  // WhatsApp chat with the booking request already typed, in the page's language.
  const bookCallHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t.contact.bookCallMessage)}` : "";

  const channels = [
    contact.email && { label: t.contact.channels.email, value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, external: false },
    contact.whatsapp && {
      label: t.contact.channels.whatsapp,
      value: contact.whatsappDisplay || `+${contact.whatsapp}`,
      href: `https://wa.me/${contact.whatsapp}`,
      Icon: WhatsappIcon,
      external: true,
    },
    contact.phone && { label: t.contact.channels.phone, value: contact.phoneDisplay || contact.phone, href: `tel:${contact.phone}`, Icon: Phone, external: false },
    contact.linkedin && { label: t.contact.channels.linkedin, value: stripProtocol(contact.linkedin), href: contact.linkedin, Icon: LinkedinIcon, external: true },
    contact.github && { label: t.contact.channels.github, value: stripProtocol(contact.github), href: contact.github, Icon: GithubIcon, external: true },
  ].filter((c): c is Exclude<typeof c, "" | false> => Boolean(c));

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-ink pt-20 pb-24 sm:pt-24 lg:pt-28 lg:pb-32">
      {/* Atmosphere: a warm horizon rising from below, with orbit lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-[45vmax] left-1/2 size-[110vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.55),rgb(171_40_0/0.18)_55%,transparent)]" />
        <div className="absolute -bottom-[38vmax] left-1/2 size-[80vmax] -translate-x-1/2 rounded-full border border-flame/10" />
        <div className="absolute -bottom-[30vmax] left-1/2 size-[64vmax] -translate-x-1/2 animate-spin-slow rounded-full border border-dashed border-flame/15 [animation-duration:90s]" />
        <div className="absolute -bottom-[22vmax] left-1/2 size-[48vmax] -translate-x-1/2 rounded-full border border-flame/10" />
        <div className="bg-grid absolute inset-0 opacity-60" />
      </div>

      <div className="container-x">
        <SectionLabel index="05" label={t.contact.label} />

        <div className="relative">
          {/*
            The full logo fills the empty corner beside the staggered headline
            (desktop). `lighten` drops its black ground into the section's
            background (bg-ink: the section is an isolated group, so the blend
            only sees what the section paints); the mask fades its corners.
            The blend sits on this untransformed wrapper so the reveal
            animation can't isolate it.
          */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 end-0 hidden w-[clamp(15rem,24vw,23rem)] items-center mix-blend-lighten lg:flex">
            <Reveal delay={0.3} y={40} className="w-full">
              <Image
                src={lockup.src}
                width={lockup.width}
                height={lockup.height}
                alt=""
                sizes="(min-width: 1024px) 24vw, 1px"
                className="block h-auto w-full [mask-image:radial-gradient(closest-side,#000_72%,transparent)]"
              />
            </Reveal>
          </div>

          <LineReveal
            id="contact-title"
            lines={t.contact.titleLines}
            lineClasses={["", "sm:ps-[6vw]", "sm:ps-[12vw]"]}
            className="mt-8 font-display text-[clamp(2.75rem,7.4vw,8rem)] leading-display font-semibold text-cream lg:mt-10"
          />
          <Reveal delay={0.2} className="sm:ms-[12vw]">
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-sand">{t.contact.lead}</p>
            {bookCallHref && (
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Magnetic>
                  <ButtonLink href={bookCallHref} icon="external">
                    <span className="flex items-center gap-2.5">
                      <WhatsappIcon size={18} />
                      {t.contact.bookCall}
                    </span>
                  </ButtonLink>
                </Magnetic>
                <p className="text-sm text-dust">{t.contact.bookCallHint}</p>
              </div>
            )}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold text-cream">{t.contact.direct}</h3>
            <ul className="mt-6 border-t border-cream/10">
              {channels.map(({ label, value, href, Icon, external }) => (
                <li key={label} className="border-b border-cream/10">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative isolate flex items-center gap-5 py-5"
                  >
                    <span aria-hidden className="absolute inset-y-1 -inset-x-3 -z-10 origin-left scale-x-0 rounded-2xl bg-ember/20 transition-transform duration-500 ease-expo group-hover:scale-x-100 rtl:origin-right" />
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cream/15 text-flame transition-colors duration-300 group-hover:border-flame group-hover:bg-flame group-hover:text-ink">
                      <Icon className="size-5" size={20} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-dust">{label}</span>
                      <span className="mt-1 block truncate font-display text-lg text-cream sm:text-xl">
                        <bdi dir="ltr">{value}</bdi>
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-dust transition-[color,rotate] duration-500 ease-expo group-hover:rotate-45 group-hover:text-flame rtl:-scale-x-100 rtl:group-hover:-rotate-45"
                    />
                  </a>
                </li>
              ))}
            </ul>
            {contact.email && (
              <div className="mt-6">
                <CopyEmailButton email={contact.email} />
              </div>
            )}
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative rounded-[2rem] border border-cream/10 bg-ink-900/75 p-6 shadow-[0_50px_100px_-50px_rgb(0_0_0/0.9)] backdrop-blur-md sm:p-10">
              <ContactStamp caption={pick(siteConfig.role, locale)} rtl={localeSettings[locale].dir === "rtl"} />
              <h3 className="pe-28 font-display text-2xl font-semibold text-cream sm:pe-40 lg:pe-44">{t.contact.form.title}</h3>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
