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

  const pillShell = cn(
    "rounded-[999px] bg-white/85",
    "shadow-[0_16px_50px_-40px_rgba(15,23,42,0.65)]",
    "ring-1 ring-black/10",
    "backdrop-blur supports-[backdrop-filter]:bg-white/75",
  );

  const fieldClass = cn(
    "h-14 rounded-full border-transparent bg-white/0 px-6",
    "text-sm text-[hsl(var(--brand-ink))]",
    "placeholder:text-[hsl(var(--brand-ink))]/45",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const circleBtn = cn(
    "h-14 w-14 rounded-full p-0",
    "shadow-sm ring-1 ring-black/10",
    "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/30",
  );

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-5">
        {/* operation row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="text-xs font-bold tracking-[0.12em] text-[hsl(var(--brand-ink))]/80">
            {operationLabel}
          </div>

          <div
            className={cn(
              "rounded-[999px] bg-white/55 p-1",
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

        {/* Search controls (dropdown anchors here) */}
        <div className="relative w-full max-w-5xl">
          <HeroFiltersDropdown open={filtersOpen} onOpenChange={setFiltersOpen}>
            <div className="grid gap-3">
              {/* MOBILE: Property type on its own row */}
              <div className={pillShell}>
                <Select
                  value={value.propertyType}
                  onValueChange={(v) =>
                    onChange({
                      ...value,
                      propertyType: v as HeroBarFilters["propertyType"],
                    })
                  }
                >
                  <SelectTrigger className={cn(fieldClass, "justify-between")}>
                    <SelectValue placeholder="Choose Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* MOBILE: Input row with circular buttons */}
              <div
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] items-center gap-3",
                  "lg:grid-cols-[260px_1fr_auto_auto] lg:gap-2 lg:rounded-[999px] lg:bg-white/85 lg:px-2 lg:py-2 lg:shadow-[0_16px_50px_-40px_rgba(15,23,42,0.65)] lg:ring-1 lg:ring-black/10 lg:backdrop-blur supports-[backdrop-filter]:lg:bg-white/75",
                )}
              >
                {/* DESKTOP: property type joins the row (hidden on mobile) */}
                <div className="hidden lg:block">
                  <Select
                    value={value.propertyType}
                    onValueChange={(v) =>
                      onChange({
                        ...value,
                        propertyType: v as HeroBarFilters["propertyType"],
                      })
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "h-14 rounded-full border-transparent bg-white/0 px-6",
                        "text-sm text-[hsl(var(--brand-ink))]",
                        "ring-0 shadow-none",
                        "focus:ring-0",
                      )}
                    >
                      <SelectValue placeholder="Choose Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Query input: mobile uses its own pill; desktop becomes part of the big pill row */}
                <div
                  className={cn(
                    pillShell,
                    "lg:rounded-full lg:bg-transparent lg:shadow-none lg:ring-0 lg:backdrop-blur-0",
                  )}
                >
                  <Input
                    value={value.query}
                    onChange={(e) => onChange({ ...value, query: e.target.value })}
                    placeholder="Community or Building..."
                    className={cn(
                      fieldClass,
                      "w-full",
                      "lg:bg-muted/35 lg:py-0",
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />
                </div>

                <Button
                  onClick={onSubmit}
                  className={cn(
                    circleBtn,
                    "bg-[#1b2b8f] text-white hover:bg-[#1b2b8f]/92",
                    "lg:shadow-none lg:ring-0",
                  )}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    circleBtn,
                    "bg-white text-[#1b2b8f] hover:bg-white",
                    "lg:shadow-none lg:ring-0",
                  )}
                  aria-label="Filters"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFiltersOpen((v) => !v);
                  }}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </HeroFiltersDropdown>
        </div>
      </div>
    </div>
  );
}