import { cn } from "@/lib/cn";

/**
 * The logo mark: two A's sharing one orange crossbar inside a chamfered
 * frame (the same cut corner as the hero portrait). Drawn as paths so it
 * renders identically everywhere, including the favicon (app/icon.svg).
 */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-10 w-10", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M1 1h29l9 9v29H10l-9-9z" fill="#1b0802" stroke="#ff9800" strokeOpacity="0.45" strokeWidth="1.2" />
      <path
        d="M7.5 30.5 14 10l6.5 20.5M19.5 30.5 26 10l6.5 20.5"
        fill="none"
        stroke="#f6ede3"
        strokeWidth="2.6"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <path d="M10.6 23.5h18.8" stroke="#ff9800" strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  );
}
