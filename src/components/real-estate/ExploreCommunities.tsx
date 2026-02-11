import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/real-estate/SmartImage";

type Community = {
  title: string;
  image: string;
  locationFilter: string;
};

const communities: Community[] = [
  {
    title: "DUBAI HILLS ESTATE",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=80",
    locationFilter: "Dubai Hills Estate",
  },
  {
    title: "DUBAI MARINA",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
    locationFilter: "Dubai Marina",
  },
  {
    title: "DOWNTOWN DUBAI",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80",
    locationFilter: "Downtown Dubai",
  },
  {
    title: "BUSINESS BAY",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
    locationFilter: "Business Bay",
  },
  {
    title: "JVC",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80",
    locationFilter: "Jumeirah Village Circle",
  },
];

function CommunityCard({
  community,
  onSearch,
}: {
  community: Community;
  onSearch: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSearch}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-[5px] text-left",
        "ring-1 ring-black/10 bg-white shadow-[0_22px_70px_-55px_rgba(15,23,42,0.7)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35",
      )}
      aria-label={`Search in ${community.title}`}
    >
      <SmartImage
        src={community.image}
        alt={community.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/0" />

      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs font-semibold tracking-[0.18em] text-white/90 drop-shadow">
          {community.title}
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur">
          <Search className="h-4 w-4 text-white/90" />
          <span>SEARCH</span>
        </div>
      </div>
    </button>
  );
}

export function ExploreCommunities({
  onSearchCommunity,
  className,
}: {
  onSearchCommunity: (location: string) => void;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  const cancelResumeTimer = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  };

  const pauseAuto = (msToResume = 2400) => {
    pausedRef.current = true;
    cancelResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, msToResume);
  };

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;

    setCanPrev(x > 4);
    setCanNext(x < max - 4);
  };

  const getStep = () => {
    const el = scrollerRef.current;
    if (!el) return 320;
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth : Math.max(280, el.clientWidth * 0.85);
  };

  const scrollByCard = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const step = getStep();
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
    pauseAuto();
  };

  // Auto-scroll: gentle, card-by-card, loops back to start.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();

    const interval = window.setInterval(() => {
      const node = scrollerRef.current;
      if (!node) return;
      if (pausedRef.current) return;

      const step = getStep();
      const max = node.scrollWidth - node.clientWidth;
      const x = node.scrollLeft;

      // If we're near the end, loop back to start smoothly.
      if (x >= max - step * 0.5) {
        node.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      node.scrollBy({ left: step, behavior: "smooth" });
    }, 3200);

    return () => {
      window.clearInterval(interval);
      cancelResumeTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mobileControls = useMemo(() => {
    return (
      <div className="mt-6 flex items-center justify-between gap-3 sm:hidden">
        <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/75">
          BROWSE BY AREA
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            disabled={!canPrev}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
              "ring-1 ring-black/10 bg-white/70 text-[hsl(var(--brand-ink))]",
              "shadow-sm",
              canPrev ? "hover:bg-white" : "cursor-not-allowed opacity-50",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard("next")}
            disabled={!canNext}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
              "ring-1 ring-black/10 bg-white/70 text-[hsl(var(--brand-ink))]",
              "shadow-sm",
              canNext ? "hover:bg-white" : "cursor-not-allowed opacity-50",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }, [canNext, canPrev]);

  return (
    <section className={cn("mx-auto max-w-6xl px-4 pb-12 sm:pb-16", className)}>
      <div className="text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Explore{" "}
          <span className="text-[hsl(var(--brand))]">Communities</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          Swipe through neighborhoods — tap any card to jump to listings with
          that area pre-selected.
        </p>
      </div>

      {mobileControls}

      <div className="mt-6">
        <div
          ref={scrollerRef}
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
          onScroll={() => {
            updateScrollState();
            pauseAuto(2800);
          }}
          onPointerEnter={() => {
            updateScrollState();
            pausedRef.current = true;
            cancelResumeTimer();
          }}
          onPointerLeave={() => {
            pauseAuto(600);
          }}
          onTouchStart={() => {
            updateScrollState();
            pauseAuto(3200);
          }}
        >
          {communities.map((c) => (
            <div
              key={c.title}
              className={cn(
                "flex-none snap-start",
                "w-[76vw] max-w-[320px] sm:w-[340px] md:w-[380px] lg:w-[420px]",
              )}
            >
              <div className="h-[232px] sm:h-[265px]">
                <CommunityCard
                  community={c}
                  onSearch={() => onSearchCommunity(c.locationFilter)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden pt-2 text-center text-xs text-muted-foreground sm:block">
        Tip: hold Shift while scrolling with a mouse wheel to move horizontally.
      </div>
    </section>
  );
}