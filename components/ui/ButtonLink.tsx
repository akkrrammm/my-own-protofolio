import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  /** "arrow" slides on hover; "external" tilts; "none" hides the icon. */
  icon?: "arrow" | "external" | "none";
  className?: string;
  transitionTypes?: string[];
  ariaLabel?: string;
}

/**
 * The site's call-to-action link. Same-page anchors render a plain <a>
 * (native smooth scrolling), routes use next/link, and external URLs open
 * in a new tab.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  className,
  transitionTypes,
  ariaLabel,
}: ButtonLinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const primary = variant === "primary";

  const classes = cn(
    "group relative isolate inline-flex shrink-0 items-center overflow-hidden rounded-full font-medium whitespace-nowrap",
    "transition-[box-shadow,border-color,color] duration-500 ease-expo",
    size === "md" ? "gap-4 py-2 ps-6 pe-2 text-base" : "gap-3 py-1.5 ps-4 pe-1.5 text-sm",
    icon === "none" && (size === "md" ? "pe-6" : "pe-4"),
    primary
      ? "bg-flame text-ink hover:shadow-[0_14px_44px_-12px_rgb(255_152_0/0.75)]"
      : "border border-cream/20 text-cream hover:border-flame/70",
    className,
  );

  const content = (
    <>
      {/* Fill that sweeps up from below on hover. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-expo group-hover:translate-y-0",
          primary ? "bg-cream" : "bg-ember/35",
        )}
      />
      <span className="relative">{children}</span>
      {icon !== "none" && (
        <span
          aria-hidden
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden rounded-full",
            size === "md" ? "size-10" : "size-8",
            primary ? "bg-ink text-flame" : "bg-cream/10 text-flame",
          )}
        >
          {icon === "arrow" ? (
            <>
              <ArrowRight className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-[220%] rtl:-scale-x-100 rtl:group-hover:-translate-x-[220%]" />
              <ArrowRight className="absolute size-4 -translate-x-[220%] transition-transform duration-500 ease-expo group-hover:translate-x-0 rtl:translate-x-[220%] rtl:-scale-x-100 rtl:group-hover:translate-x-0" />
            </>
          ) : (
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
          )}
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} transitionTypes={transitionTypes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
