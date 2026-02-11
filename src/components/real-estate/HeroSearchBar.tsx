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
                className="justify-center gap-3 bg-transparent"
              >
                <ToggleGroupItem
                  value="rent"
                  className="h-10 rounded-full border border-[hsl(var(--brand-ink))]/25 bg-white/60 px-7 text-[11px] font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))] shadow-sm data-[state=on]:border-[hsl(var(--brand-ink))]/35 data-[state=on]:bg-white"
                >
                  RENT
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="sell"
                  className="h-10 rounded-full border border-[hsl(var(--brand-ink))]/25 bg-white/60 px-7 text-[11px] font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))] shadow-sm data-[state=on]:border-[hsl(var(--brand-ink))]/35 data-[state=on]:bg-white"
                >
                  SELL
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="manage"
                  className="h-10 rounded-full border border-[hsl(var(--brand-ink))]/25 bg-white/60 px-7 text-[11px] font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))] shadow-sm data-[state=on]:border-[hsl(var(--brand-ink))]/35 data-[state=on]:bg-white"
                >
                  MANAGE
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* search row */}
            <div className="grid w-full max-w-5xl gap-3 sm:grid-cols-[220px_1fr_auto_auto] sm:items-center">
              <Select
                value={value.propertyType}
                onValueChange={(v) =>
                  onChange({
                    ...value,
                    propertyType: v as HeroBarFilters["propertyType"],
                  })
                }
              >
                <SelectTrigger className="h-12 rounded-full border-transparent bg-white/75 px-5 text-sm text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/10 focus:ring-2 focus:ring-[hsl(var(--brand))]/25">
                  <SelectValue placeholder="Choose Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Choose Property Type</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={value.query}
                onChange={(e) => onChange({ ...value, query: e.target.value })}
                placeholder="Community or Building..."
                className="h-12 rounded-full border-transparent bg-white/75 px-5 text-sm text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/10 placeholder:text-[hsl(var(--brand-ink))]/45 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSubmit();
                }}
              />

              <Button
                onClick={onSubmit}
                className="h-12 w-12 rounded-full bg-[hsl(var(--brand-ink))] text-white shadow-sm hover:bg-[hsl(var(--brand-ink))]/92"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>

              <HeroFiltersDropdown open={filtersOpen} onOpenChange={setFiltersOpen}>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 w-12 rounded-full border-transparent bg-white/75 text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/10 hover:bg-white"
                  aria-label="Filters"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </HeroFiltersDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}