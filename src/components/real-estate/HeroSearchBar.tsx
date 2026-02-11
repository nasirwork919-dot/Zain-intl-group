import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { HeroFiltersDropdown } from "@/components/real-estate/HeroFiltersDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type HeroBarFilters = {
  operation: "buy" | "rent" | "sell" | "manage";
  propertyType: "apartment" | "villa" | "townhouse";
  query: string;
};

export function HeroSearchBar({
  value,
  onChange,
  onSubmit,
}: {
  value: HeroBarFilters;
  onChange: (next: HeroBarFilters) => void;
  onSubmit: () => void;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const operationLabel =
    value.operation === "buy" ? "BUY" : value.operation.toUpperCase();

  const segItemClass = cn(
    "h-10 rounded-[4px] px-5",
    "text-[11px] font-semibold tracking-[0.14em]",
    "text-[hsl(var(--brand-ink))]/85",
    "transition-colors",
    "hover:text-[hsl(var(--brand-ink))]",
    "data-[state=on]:bg-white data-[state=on]:text-[hsl(var(--brand-ink))]",
    "data-[state=on]:shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:gap-4">
        <div className="w-full">
          <div className="flex flex-col items-center gap-5">
            {/* operation row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="text-xs font-bold tracking-[0.12em] text-[hsl(var(--brand-ink))]/80">
                {operationLabel}
              </div>

              <div
                className={cn(
                  "rounded-[5px] bg-white/55 p-1",
                  "ring-1 ring-[hsl(var(--brand-ink))]/25",
                  "shadow-[0_10px_25px_-18px_rgba(15,23,42,0.55)]",
                )}
              >
                <ToggleGroup
                  type="single"
                  value={value.operation}
                  onValueChange={(v) => {
                    if (!v) return;
                    onChange({
                      ...value,
                      operation: v as HeroBarFilters["operation"],
                    });
                  }}
                  className="gap-1 bg-transparent"
                >
                  <ToggleGroupItem value="buy" className={segItemClass}>
                    BUY
                  </ToggleGroupItem>
                  <ToggleGroupItem value="rent" className={segItemClass}>
                    RENT
                  </ToggleGroupItem>
                  <ToggleGroupItem value="sell" className={segItemClass}>
                    SELL
                  </ToggleGroupItem>
                  <ToggleGroupItem value="manage" className={segItemClass}>
                    MANAGE
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* search row + dropdown anchor */}
            <div className="relative w-full max-w-5xl">
              <HeroFiltersDropdown
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
              >
                <div
                  className={cn(
                    "grid w-full gap-3",
                    // mobile: stack
                    "grid-cols-1",
                    // >=sm: match the original layout
                    "sm:grid-cols-[220px_1fr_auto_auto] sm:items-center",
                  )}
                >
                  <Select
                    value={value.propertyType}
                    onValueChange={(v) =>
                      onChange({
                        ...value,
                        propertyType: v as HeroBarFilters["propertyType"],
                      })
                    }
                  >
                    <SelectTrigger className="h-12 w-full rounded-[5px] border-transparent bg-white/80 px-5 text-sm text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/15 focus:ring-2 focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Choose Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">
                        Choose Property Type
                      </SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    value={value.query}
                    onChange={(e) =>
                      onChange({ ...value, query: e.target.value })
                    }
                    placeholder="Community or Building..."
                    className="h-12 w-full rounded-[5px] border-transparent bg-white/80 px-5 text-sm text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/15 placeholder:text-[hsl(var(--brand-ink))]/45 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/30"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />

                  {/* Actions: on mobile make them 2 columns for better tap targets */}
                  <div className="grid grid-cols-2 gap-3 sm:contents">
                    <Button
                      onClick={onSubmit}
                      className={cn(
                        "h-12 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white shadow-sm hover:bg-[hsl(var(--brand-ink))]/92",
                        "w-full sm:w-12 sm:px-0",
                      )}
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-12 rounded-[5px] border-transparent bg-white/80 text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/15 hover:bg-white",
                        "w-full sm:w-12 sm:px-0",
                      )}
                      aria-label="Filters"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFiltersOpen((v) => !v);
                      }}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </HeroFiltersDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}