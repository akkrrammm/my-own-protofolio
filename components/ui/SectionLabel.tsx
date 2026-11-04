import { cn } from "@/lib/cn";

/** "(01)  ABOUT  ———" — the numbered marker that opens every section. */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="eyebrow text-flame">({index})</span>
      <span className="eyebrow text-sand">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-linear-to-r from-flame/45 via-ember/25 to-transparent rtl:bg-linear-to-l" />
    </div>
  );
}
