import { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { featuredProperties } from "@/components/real-estate/site-data";
import { CuratedOpportunityCard } from "@/components/real-estate/CuratedOpportunityCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function paginate<T>(items: T[], page: number, perPage: number) {
  const start = page * perPage;
  return items.slice(start, start + perPage);
}

export function CuratedOpportunities({
  onOpenProperty,
  onViewAll,
}: {
  onOpenProperty: (p: Property) => void;
  onViewAll?: () => void;
}) {
  const perPage = 3;
  const items = featuredProperties;
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const [page, setPage] = useState(0);

  const visible = useMemo(() => paginate(items, page, perPage), [items, page]);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="px-0 text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Curated{" "}
          <span className="text-[hsl(var(--brand))]">Opportunities</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
        {visible.map((p) => (
          <CuratedOpportunityCard
            key={p.id}
            property={p}
            onOpen={() => onOpenProperty(p)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Pager (left) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{page + 1}</span>/
              {pageCount}
            </div>

            <div className="h-1.5 w-44 overflow-hidden rounded-full bg-muted/60 sm:w-64">
              <div
                className="h-full rounded-full bg-[hsl(var(--brand))]"
                style={{ width: `${((page + 1) / pageCount) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!canPrev}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-[5px] px-3 py-2 text-sm font-semibold transition sm:w-auto sm:rounded-full sm:px-3 sm:py-2 sm:text-sm sm:font-medium",
                "ring-1 ring-black/10 sm:ring-0",
                canPrev
                  ? "bg-white/75 text-[hsl(var(--brand-ink))] hover:bg-white sm:bg-transparent sm:hover:bg-white/70"
                  : "cursor-not-allowed bg-white/45 text-muted-foreground/60 sm:bg-transparent",
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              PREV
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={!canNext}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-[5px] px-3 py-2 text-sm font-semibold transition sm:w-auto sm:rounded-full sm:px-3 sm:py-2 sm:text-sm sm:font-medium",
                "ring-1 ring-black/10 sm:ring-0",
                canNext
                  ? "bg-white/75 text-[hsl(var(--brand-ink))] hover:bg-white sm:bg-transparent sm:hover:bg-white/70"
                  : "cursor-not-allowed bg-white/45 text-muted-foreground/60 sm:bg-transparent",
              )}
              aria-label="Next page"
            >
              NEXT
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* View All (right) */}
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