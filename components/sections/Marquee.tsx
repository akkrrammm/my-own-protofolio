import { getI18n } from "@/i18n/server";

/**
 * Two crossing bands of words between the hero and About. The tracks are
 * duplicated and slide by half their width for a seamless loop (CSS only).
 * Forced LTR so the loop direction is the same in Arabic.
 */
export async function Marquee() {
  const { t } = await getI18n();
  const words = [...t.marquee, ...t.marquee];

  return (
    <div aria-hidden className="relative isolate -my-6 overflow-hidden py-14 select-none">
      {/* Back band */}
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2deg] border-y border-flame/10 bg-ink-800 py-3">
        <Track words={words} className="animate-marquee [animation-direction:reverse] [animation-duration:52s]" itemClass="text-outline-flame text-3xl sm:text-4xl" />
      </div>
      {/* Front band */}
      <div className="relative -mx-[5%] rotate-[-2deg] border-y border-flame/30 bg-ember py-4 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
        <Track words={words} className="animate-marquee" itemClass="text-cream text-3xl sm:text-5xl" />
      </div>
    </div>
  );
}

function Track({ words, className, itemClass }: { words: string[]; className: string; itemClass: string }) {
  return (
    <div dir="ltr" className="flex overflow-hidden">
      <div className={`flex w-max shrink-0 items-center will-change-transform ${className}`}>
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center">
            <span className={`px-6 font-display leading-none font-semibold tracking-tight sm:px-9 ${itemClass}`}>{word}</span>
            <span className="text-xl text-flame-300 sm:text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
