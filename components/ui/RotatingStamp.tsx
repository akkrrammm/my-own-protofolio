import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const RADIUS = 76;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A circular text badge that turns slowly (CSS only; still under reduced
 * motion). Latin text is spaced to close the circle exactly; Arabic keeps
 * its natural spacing so the letters stay joined.
 */
export function RotatingStamp({
  id,
  text,
  latin = true,
  className,
  children,
}: {
  /** Unique per page: names the SVG path the text follows. */
  id: string;
  text: string;
  latin?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={id} d={`M100,100 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`} />
        </defs>
        {latin ? (
          <text className="fill-cream font-mono text-[13.5px] uppercase" style={{ letterSpacing: "0.2em" }}>
            <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 4} lengthAdjust="spacing">
              {text.repeat(2)}
            </textPath>
          </text>
        ) : (
          // RTL text would run backwards off the path's start; lay the run
          // out from the start instead (the bidi algorithm keeps each word
          // in its correct reading order).
          <text className="fill-cream font-sans text-[15px]" direction="ltr" style={{ direction: "ltr", unicodeBidi: "normal" }}>
            <textPath href={`#${id}`}>{text.repeat(3)}</textPath>
          </text>
        )}
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
