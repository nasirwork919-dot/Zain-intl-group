import { ArrowRight } from "lucide-react";

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

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="text-left">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Stay up to date on the latest{" "}
          <span className="text-[hsl(var(--brand))]">off-plan launches</span>.
        </h2>
      </div>

      {/* Mobile: horizontal scroll row */}
      <div className="mt-7 sm:hidden">
        <div
          className={cn(
            "flex gap-4 overflow-x-auto pb-4",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
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