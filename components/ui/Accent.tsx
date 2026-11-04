import { Fragment } from "react";
import { cn } from "@/lib/cn";

/** Fills `{key}` placeholders present in `vars`; other braces (accents) are left alone. */
export function format(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? vars[key] : match));
}

/** Renders the `{word}` segments of a dictionary string as the orange serif accent. */
export function Accent({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("{") && part.endsWith("}") ? (
          <span key={i} className={cn("font-serif font-normal italic tracking-[-0.01em] text-flame", className)}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
