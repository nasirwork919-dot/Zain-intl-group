import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { PublicProperty as Property } from "@/hooks/use-published-properties";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CuratedLaunchCard } from "@/components/real-estate/CuratedLaunchCard";

function titleCase(value?: string) {
  return String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(" ");
}

function listingBadge(property: Property) {
  return property.listingType === "rent" ? "For Rent" : "For Sale";
}

function typeBadge(property: Property) {
  return titleCase(property.propertyType || "Property");
}

export function CuratedOpportunities({
  properties,
  onOpenProperty,
  onViewAll,
}: {
  properties: Property[];
  onOpenProperty: (p: Property) => void;
  onViewAll?: () => void;
}) {
  const items = properties.slice(0, 3);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  useEffect(() => {
    setCanPrev(false);
    setCanNext(items.length > 1);
  }, [items.length]);

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

    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth : Math.max(280, el.clientWidth * 0.85);
    const delta = dir === "next" ? step : -step;

    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const mobileHeader = useMemo(() => {
    return (
      <div className="mt-5 flex items-center justify-between gap-3 sm:hidden">
        <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/75">
          LIVE INVENTORY
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
    <section className="mx-auto mt-6 max-w-7xl px-4 pb-16 sm:mt-10">
      <div className="text-left">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Browse the latest <span className="text-[hsl(var(--brand))]">live listings</span>.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          This section pulls from the published CRM inventory already synced to the website.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
          <div className="text-lg font-extrabold tracking-tight">
            No live listings yet
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Publish CRM listings to populate this section automatically.
          </div>
        </div>
      ) : (
        <>
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
              {items.map((property) => (
                <div
                  key={property.id}
                  className="w-[82vw] max-w-[340px] flex-none snap-start"
                >
                  <CuratedLaunchCard
                    property={property}
                    primaryBadge={listingBadge(property)}
                    secondaryBadge={typeBadge(property)}
                    onOpen={() => onOpenProperty(property)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {items.map((property) => (
              <CuratedLaunchCard
                key={property.id}
                property={property}
                primaryBadge={listingBadge(property)}
                secondaryBadge={typeBadge(property)}
                onOpen={() => onOpenProperty(property)}
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          View the live inventory, compare prices, and jump straight into the listing pages.
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
