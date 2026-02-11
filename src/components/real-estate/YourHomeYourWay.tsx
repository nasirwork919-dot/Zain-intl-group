import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type HomeWayItem = {
  title: string;
  image: string;
};

function useScrollButtons(scrollerRef: React.RefObject<HTMLDivElement | null>) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;

    setCanPrev(x > 4);
    setCanNext(x < max - 4);
  };

  const getStep = () => {
    const el = scrollerRef.current;
    if (!el) return 340;
    const first = el.firstElementChild as HTMLElement | null;
    // +16 to match the gap
    return first ? first.offsetWidth + 16 : Math.max(300, el.clientWidth * 0.8);
  };

  const scrollByCard = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return { canPrev, canNext, update, scrollByCard, getStep };
}

function HomeWayCard({ item }: { item: HomeWayItem }) {
  return (
    <article
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[28px] bg-white",
        "shadow-[0_26px_80px_-60px_rgba(15,23,42,0.75)] ring-1 ring-black/10",
      )}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      {/* subtle veil for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/5" />

      {/* label pill */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-center">
        <div
          className={cn(
            "inline-flex items-center justify-center",
            "min-w-[170px] rounded-full px-5 py-2",
            "bg-white/90 text-[13px] font-semibold text-[hsl(var(--brand-ink))]",
            "ring-1 ring-black/10 shadow-sm backdrop-blur",
          )}
        >
          {item.title}
        </div>
      </div>
    </article>
  );
}

export function YourHomeYourWay({
  className,
  autoScroll = true,
}: {
  className?: string;
  autoScroll?: boolean;
}) {
  const items: HomeWayItem[] = useMemo(
    () => [
      {
        title: "Reduced price",
        image:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Prime Locations",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Flexible Payment Plans",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Gated Community",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Open house",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80",
      },
    ],
    [],
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  const { canPrev, canNext, update, scrollByCard, getStep } =
    useScrollButtons(scrollerRef);

  const cancelResumeTimer = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  };

  const pauseAuto = (msToResume = 2200) => {
    pausedRef.current = true;
    cancelResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, msToResume);
  };

  useEffect(() => {
    if (!autoScroll) return;

    const el = scrollerRef.current;
    if (!el) return;

    update();

    const interval = window.setInterval(() => {
      const node = scrollerRef.current;
      if (!node) return;
      if (pausedRef.current) return;

      const step = getStep();
      const max = node.scrollWidth - node.clientWidth;
      const x = node.scrollLeft;

      if (x >= max - step * 0.5) {
        node.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      node.scrollBy({ left: step, behavior: "smooth" });
    }, 3000);

    return () => {
      window.clearInterval(interval);
      cancelResumeTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScroll]);

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="pt-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Your Home, Your Way
            </h2>

            {/* desktop controls */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => {
                  scrollByCard("prev");
                  pauseAuto();
                }}
                disabled={!canPrev}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                  "bg-white/75 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 shadow-sm",
                  canPrev ? "hover:bg-white" : "cursor-not-allowed opacity-50",
                )}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollByCard("next");
                  pauseAuto();
                }}
                disabled={!canNext}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                  "bg-white/75 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 shadow-sm",
                  canNext ? "hover:bg-white" : "cursor-not-allowed opacity-50",
                )}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div
              ref={scrollerRef}
              className={cn(
                "flex gap-4 overflow-x-auto pb-4",
                "snap-x snap-mandatory",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              )}
              onScroll={() => {
                update();
                pauseAuto(2400);
              }}
              onPointerEnter={() => {
                update();
                pausedRef.current = true;
                cancelResumeTimer();
              }}
              onPointerLeave={() => {
                pauseAuto(600);
              }}
              onTouchStart={() => {
                update();
                pauseAuto(3200);
              }}
            >
              {items.map((it) => (
                <div
                  key={it.title}
                  className={cn(
                    "flex-none snap-start",
                    "w-[82vw] max-w-[340px] sm:w-[360px] md:w-[420px] lg:w-[460px]",
                  )}
                >
                  <div className="h-[240px] sm:h-[270px] md:h-[290px]">
                    <HomeWayCard item={it} />
                  </div>
                </div>
              ))}
            </div>

            {/* mobile controls */}
            <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  scrollByCard("prev");
                  pauseAuto();
                }}
                disabled={!canPrev}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  "ring-1 ring-black/10",
                  canPrev
                    ? "bg-white/75 text-[hsl(var(--brand-ink))] hover:bg-white"
                    : "cursor-not-allowed bg-white/45 text-muted-foreground/60",
                )}
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollByCard("next");
                  pauseAuto();
                }}
                disabled={!canNext}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  "ring-1 ring-black/10",
                  canNext
                    ? "bg-white/75 text-[hsl(var(--brand-ink))] hover:bg-white"
                    : "cursor-not-allowed bg-white/45 text-muted-foreground/60",
                )}
                aria-label="Next"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="hidden pt-2 text-center text-xs text-muted-foreground sm:block">
            Tip: swipe or scroll horizontally to browse.
          </div>
        </div>
      </div>
    </section>
  );
}