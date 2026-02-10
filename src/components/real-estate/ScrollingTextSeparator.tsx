import { useMemo } from "react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export function ScrollingTextSeparator({
  label = "A handpicked edit",
  items = [
    "Dubai Marina",
    "Downtown Dubai",
    "Palm Jumeirah",
    "Business Bay",
    "Dubai Hills",
    "Waterfront living",
    "Ready units",
    "New launches",
    "Premium finishes",
  ],
  className,
}: {
  label?: string;
  items?: string[];
  className?: string;
}) {
  const text = useMemo(() => {
    const base = items.flatMap((t) => [t, "•"]);
    // ensure a long enough string for seamless scrolling
    const long = Array.from({ length: 6 })
      .flatMap(() => base)
      .join("  ");
    return long;
  }, [items]);

  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="py-10 sm:py-12">
        <div className="mx-auto flex w-full items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span>{label}</span>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-full border border-white/60 bg-white/55 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.55)] ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/45">
          {/* side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[hsl(var(--page))] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[hsl(var(--page))] to-transparent sm:w-20" />

          {/* marquee track with margins on both sides */}
          <div className="px-6 sm:px-10">
            <div className="marquee-track flex whitespace-nowrap py-3">
              <div className="marquee-run text-[13px] font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/70">
                {text}
              </div>
              <div
                className="marquee-run text-[13px] font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/70"
                aria-hidden="true"
              >
                {text}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track { width: 200%; }
            .marquee-run { width: 50%; animation: marquee-left 22s linear infinite; }
            @media (prefers-reduced-motion: reduce) {
              .marquee-run { animation: none; }
              .marquee-track { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}