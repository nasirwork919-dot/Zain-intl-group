import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionSeparator({
  label = "Curated selection",
  align = "center",
  className,
}: {
  label?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="relative py-10 sm:py-12">
        {/* line */}
        <div className="h-px w-full bg-[linear-gradient(to_right,transparent,hsl(var(--brand))/35,hsl(var(--brand-2))/25,transparent)]" />

        {/* glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--brand))]/10 blur-2xl" />

        {/* badge */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            align === "center"
              ? "left-1/2 -translate-x-1/2"
              : "left-4 sm:left-6"
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/75 px-3 py-1.5 text-xs font-semibold tracking-wide text-[hsl(var(--brand-ink))] shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span>{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}