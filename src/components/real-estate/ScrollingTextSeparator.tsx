import { useMemo } from "react";

import { cn } from "@/lib/utils";

export function ScrollingTextSeparator({
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
  speedSeconds = 14,
}: {
  items?: string[];
  className?: string;
  speedSeconds?: number;
}) {
  const text = useMemo(() => {
    const base = items.flatMap((t) => [t, "•"]);
    const long = Array.from({ length: 7 })
      .flatMap(() => base)
      .join("  ");
    return long;
  }, [items]);

  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="py-8 sm:py-10">
        <div className="relative overflow-hidden rounded-full border border-white/60 bg-white/60 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.55)] ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/45">
          {/* side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[hsl(var(--page))] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[hsl(var(--page))] to-transparent sm:w-24" />

          {/* marquee track with margins on both sides */}
          <div className="px-6 sm:px-12">
            <div className="marquee-track flex whitespace-nowrap py-3.5 sm:py-4">
              <div className="marquee-run text-[15px] font-semibold tracking-[0.12em] text-[hsl(var(--brand-ink))]/70 sm:text-[16px]">
                {text}
              </div>
              <div
                className="marquee-run text-[15px] font-semibold tracking-[0.12em] text-[hsl(var(--brand-ink))]/70 sm:text-[16px]"
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
            .marquee-run { width: 50%; animation: marquee-left ${speedSeconds}s linear infinite; }
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