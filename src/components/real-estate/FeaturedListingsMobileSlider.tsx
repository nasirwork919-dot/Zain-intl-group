import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { cn } from "@/lib/utils";

function paginate<T>(items: T[], page: number, perPage: number) {
  const start = page * perPage;
  return items.slice(start, start + perPage);
}

export function FeaturedListingsMobileSlider({
  properties,
  onOpenProperty,
  className,
}: {
  properties: Property[];
  onOpenProperty: (p: Property) => void;
  className?: string;
}) {
  const perPage = 1;
  const pageCount = Math.max(1, Math.ceil(properties.length / perPage));
  const [page, setPage] = useState(0);

  const visible = useMemo(
    () => paginate(properties, page, perPage),
    [properties, page],
  );

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  if (properties.length === 0) return null;

  return (
    <div className={cn("block md:hidden", className)}>
      <div className="grid gap-4">
        {visible.map((p, idx) => (
          <PropertyCard
            key={p.id}
            property={p}
            featured={page === 0 && idx === 0}
            onClick={() => onOpenProperty(p)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{page + 1}</span>/
            {pageCount}
          </div>

          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-muted/60">
            <div
              className="h-full rounded-full bg-[hsl(var(--brand))]"
              style={{ width: `${((page + 1) / pageCount) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition",
              canPrev
                ? "text-[hsl(var(--brand-ink))] hover:bg-white/70"
                : "cursor-not-allowed text-muted-foreground/60",
            )}
            aria-label="Previous property"
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
                : "cursor-not-allowed text-muted-foreground/60",
            )}
            aria-label="Next property"
          >
            NEXT
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}