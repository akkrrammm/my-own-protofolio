import Image from "next/image";
import { Accent } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { locale, t } = await getI18n();
  const { banner } = siteConfig.brand;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute top-1/2 left-1/2 size-[80vmax] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.4),transparent)]" />
      </div>

      {/* The logo banner, tilted like a pinned card, in the empty half (desktop). */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 end-[4vw] hidden items-center pt-16 lg:flex">
        <div className="fade-in w-[clamp(22rem,38vw,36rem)] rotate-[4deg] overflow-hidden rounded-[2rem] border border-flame/25 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.95),0_0_90px_-25px_rgb(171_40_0/0.7)] [--d:350ms] rtl:-rotate-[4deg]">
          <Image src={banner.src} width={banner.width} height={banner.height} alt="" sizes="38vw" className="block h-auto w-full" />
        </div>
      </div>

      <div className="container-x">
        <p aria-hidden className="fade-in font-display text-[clamp(7rem,30vw,22rem)] leading-[0.8] font-bold tracking-[-0.06em] text-outline-flame">
          404
        </p>
        <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,5rem)] leading-heading font-semibold text-cream">
          <span className="rise-mask">
            <span className="rise-line">
              <Accent text={t.notFound.title} />
            </span>
          </span>
        </h1>
        <p className="fade-in mt-5 max-w-md text-lg text-sand [--d:200ms]">{t.notFound.text}</p>
        <div className="fade-in mt-10 [--d:300ms]">
          <ButtonLink href={`/${locale}`}>{t.notFound.back}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
