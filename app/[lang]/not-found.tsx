import { Accent } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { locale, t } = await getI18n();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute top-1/2 left-1/2 size-[80vmax] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(171_40_0/0.4),transparent)]" />
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
