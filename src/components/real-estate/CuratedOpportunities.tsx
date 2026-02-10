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
}: {
  onOpenProperty: (p: Property) => void;
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
      <div className="text-center">
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!canPrev}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
                canPrev
                  ? "text-[hsl(var(--brand-ink))] hover:bg-white/70"
                  : "cursor-not-allowed text-muted-foreground/60"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              PREV
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={!canNext}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
                canNext
                  ? "text-[hsl(var(--brand-ink))] hover:bg-white/70"
                  : "cursor-not-allowed text-muted-foreground/60"
              )}
            >
              NEXT
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* View All (right) */}
        <Button
          className="h-12 rounded-2xl bg-[hsl(var(--brand))] px-7 text-white hover:bg-[hsl(var(--brand))]/90"
          onClick={() => {
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