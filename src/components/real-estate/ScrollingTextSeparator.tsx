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
  speedSeconds = 10,
  pauseSeconds = 1.2,
}: {
  items?: string[];
  className?: string;
  speedSeconds?: number;
  pauseSeconds?: number;
}) {
  const text = useMemo(() => {
    const base = items.flatMap((t) => [t, "•"]);
    // single long line; we'll slide it like a "track"
    return base.join("  ");
  }, [items]);

  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="py-8 sm:py-10">
        <div className="relative overflow-hidden rounded-full border border-white/70 bg-white/70 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.55)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55">
          {/* side fades (keep margins visible) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[hsl(var(--page))] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[hsl(var(--page))] to-transparent sm:w-24" />

          <div className="px-6 sm:px-12">
            <div className="py-3.5 sm:py-4">
              <div className="slider-track">
                <div className="slider-item text-[15px] font-semibold tracking-[0.08em] text-[hsl(var(--brand-ink))] sm:text-[16px]">
                  {text}
                </div>
                <div
                  className="slider-item text-[15px] font-semibold tracking-[0.08em] text-[hsl(var(--brand-ink))] sm:text-[16px]"
                  aria-hidden="true"
                >
                  {text}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            /* We still duplicate content so the loop is seamless,
               but the motion is "slide then pause" to avoid ticker vibes. */
            .slider-track{
              display:flex;
              width:200%;
              white-space:nowrap;
            }
            .slider-item{
              width:50%;
              flex:0 0 50%;
            }

            @keyframes slidePause {
              0% { transform: translateX(0); }
              /* slide */
              70% { transform: translateX(-50%); }
              /* pause at end */
              100% { transform: translateX(-50%); }
            }

            .slider-track{
              animation: slidePause ${speedSeconds + pauseSeconds}s cubic-bezier(.22,.8,.2,1) infinite;
            }

            @media (prefers-reduced-motion: reduce){
              .slider-track{ animation: none; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}