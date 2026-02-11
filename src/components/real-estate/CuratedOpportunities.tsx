import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { featuredProperties } from "@/components/real-estate/site-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CuratedLaunchCard } from "@/components/real-estate/CuratedLaunchCard";

const completionById: Record<string, string> = {
  p1: "2029 Q1",
  p2: "2028",
  p3: "TCB",
  p4: "2029 Q3",
  p5: "2028 Q4",
  p6: "2029 Q2",
  p7: "2028 Q2",
  p8: "TCB",
};

export function CuratedOpportunities({
  onOpenProperty,
  onViewAll,
}: {
  onOpenProperty: (p: Property) => void;
  onViewAll?: () => void;
}) {
  const items = featuredProperties.slice(0, 4);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;

    setCanPrev(x > 4);
    setCanNext(x < max - 4);
  };

  const scrollByCard = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    // Find a reasonable "card step" based on the first child.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth : Math.max(280, el.clientWidth * 0.85);
    const delta = dir === "next" ? step : -step;

    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const mobileHeader = useMemo(() => {
    return (
      <div className="mt-5 flex items-center justify-between gap-3 sm:hidden">
        <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/75">
          CURATED LAUNCHES
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
              canPrev
                ? "hover:bg-white"
                : "cursor-not-allowed opacity-50",
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
              canNext
                ? "hover:bg-white"
                : "cursor-not-allowed opacity-50",
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
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="text-left">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Stay up to date on the latest{" "}
          <span className="text-[hsl(var(--brand))]">off-plan launches</span>.
        </h2>
      </div>

      {/* Mobile: header + horizontal scroll row + buttons */}
      {mobileHeader}

      <div className="mt-4 sm:hidden">
        <div
          ref={scrollerRef}
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
          onScroll={updateScrollState}
          onPointerEnter={updateScrollState}
          onTouchStart={updateScrollState}
        >
          {items.map((p) => (
            <div
              key={p.id}
              className="w-[82vw] max-w-[340px] flex-none snap-start"
            >
              <CuratedLaunchCard
                property={p}
                completionDate={completionById[p.id] ?? "TCB"}
                onOpen={() => onOpenProperty(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: 4 column grid */}
      <div className="mt-8 hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {items.map((p) => (
          <CuratedLaunchCard
            key={p.id}
            property={p}
            completionDate={completionById[p.id] ?? "TCB"}
            onOpen={() => onOpenProperty(p)}
          />
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Explore new launches, compare pricing, and request a curated shortlist.
        </div>

        <Button
          className="h-12 rounded-[5px] bg-[hsl(var(--brand))] px-7 text-white hover:bg-[hsl(var(--brand))]/90"
          onClick={() => {
            onViewAll?.();
            document
              .getElementById("listings")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}