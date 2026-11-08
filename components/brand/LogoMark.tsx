import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The logo mark: the "A" emblem cut from the full logo (public/brand), in a
 * chamfered frame — the same cut corners as the hero portrait. Decorative:
 * the link around it carries the name. The favicons (app/icon1.png,
 * app/icon2.png) use the same crop and shape.
 */
export function LogoMark({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <span aria-hidden className={cn("relative block size-10 shrink-0", className)}>
      <span className="absolute inset-0 overflow-hidden bg-ink-950 [clip-path:polygon(0_0,77.5%_0,100%_22.5%,100%_100%,22.5%_100%,0_77.5%)]">
        <Image src={siteConfig.brand.mark} alt="" fill sizes="56px" loading={eager ? "eager" : undefined} className="object-cover" />
      </span>
      <svg viewBox="0 0 40 40" className="absolute inset-0 size-full" fill="none">
        <path d="M.6.6H31l8.4 8.4v30.4H9L.6 31z" stroke="#ff9800" strokeOpacity=".45" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
