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
  speedSeconds = 18,
}: {
  items?: string[];
  className?: string;
  speedSeconds?: number;
}) {
  const line = useMemo(() => {
    // add generous spacing so it breathes and never feels cramped
    return items.join("   •   ");
  }, [items]);

  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="py-8 sm:py-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.55)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55">
          {/* side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[hsl(var(--page))] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[hsl(var(--page))] to-transparent sm:w-24" />

          <div className="px-6 sm:px-12">
            <div className="py-3.5 sm:py-4">
              <div className="marquee">
                <div className="marquee__group">
                  <span className="marquee__text">{line}</span>
                </div>
                <div className="marquee__group" aria-hidden="true">
                  <span className="marquee__text">{line}</span>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            /* Constant-speed, seamless marquee with no overlap */
            .marquee{
              display:flex;
              overflow:hidden;
              user-select:none;
              width:100%;
            }
            .marquee__group{
              flex: 0 0 auto;
              display:flex;
              align-items:center;
              white-space:nowrap;
              padding-right: 3.5rem; /* gap between repeats */
              animation: marquee ${speedSeconds}s linear infinite;
            }
            .marquee__text{
              display:inline-block;
              font-size: 15px;
              line-height: 1;
              font-weight: 650;
              letter-spacing: 0.08em;
              color: hsl(var(--brand-ink));
              opacity: .78;
              white-space: nowrap;
            }

            @media (min-width: 640px){
              .marquee__text{ font-size: 16px; opacity: .8; }
            }

            @keyframes marquee{
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }

            @media (prefers-reduced-motion: reduce){
              .marquee__group{ animation: none; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}