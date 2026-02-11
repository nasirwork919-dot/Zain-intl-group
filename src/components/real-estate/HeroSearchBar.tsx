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
    "transition-colors",
    // On the dark hero background:
    "text-white/85 hover:text-white",
    // Active
    "data-[state=on]:bg-white data-[state=on]:text-[hsl(var(--brand-ink))]",
    "data-[state=on]:shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
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
          <div className="text-xs font-bold tracking-[0.12em] text-white/85">
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
            className={cn(
              "gap-1",
              "rounded-[999px] px-1 py-1",
              "bg-white/15 backdrop-blur supports-[backdrop-filter]:bg-white/10",
              "ring-1 ring-white/15",
              "shadow-[0_12px_30px_-24px_rgba(15,23,42,0.7)]",
            )}
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

        {/* Search controls (dropdown anchors here) */}
        <div className="relative w-full max-w-5xl">
          <HeroFiltersDropdown open={filtersOpen} onOpenChange={setFiltersOpen}>
            <div className="grid gap-3">
              {/* MOBILE: Property type on its own row */}
              <div className={cn(pillShell, "lg:hidden")}>
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

              {/* MOBILE: merged pill (input + buttons attached) */}
              <div className={cn(pillShell, "lg:hidden")}>
                <div className="flex items-center gap-2 px-2 py-2">
                  <Input
                    value={value.query}
                    onChange={(e) =>
                      onChange({ ...value, query: e.target.value })
                    }
                    placeholder="Community or Building..."
                    className={cn(
                      "h-14 flex-1 rounded-full border-transparent bg-muted/35 px-6",
                      "text-sm text-[hsl(var(--brand-ink))]",
                      "placeholder:text-[hsl(var(--brand-ink))]/45",
                      "ring-1 ring-black/5",
                      "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSubmit();
                    }}
                  />

                  <Button
                    onClick={onSubmit}
                    className={cn(
                      circleBtn,
                      "bg-[#1b2b8f] text-white hover:bg-[#1b2b8f]/92",
                      "shrink-0",
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
                      "shrink-0",
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

              {/* DESKTOP row: ONE white container, with inner grey input pill and buttons on right */}
              <div
                className={cn(
                  "hidden lg:flex lg:items-center lg:gap-3",
                  "rounded-[999px] bg-white/85 px-3 py-3",
                  "shadow-[0_16px_50px_-40px_rgba(15,23,42,0.65)] ring-1 ring-black/10",
                  "backdrop-blur supports-[backdrop-filter]:bg-white/75",
                )}
              >
                <div className="min-w-[260px]">
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
                        "h-14 rounded-full border-transparent bg-white px-6",
                        "text-sm text-[hsl(var(--brand-ink))]",
                        "ring-1 ring-black/5 shadow-none",
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

                <div className="flex-1">
                  <Input
                    value={value.query}
                    onChange={(e) =>
                      onChange({ ...value, query: e.target.value })
                    }
                    placeholder="Community or Building..."
                    className={cn(
                      "h-14 w-full rounded-full border-transparent",
                      "bg-muted/35 px-7",
                      "text-sm text-[hsl(var(--brand-ink))]",
                      "placeholder:text-[hsl(var(--brand-ink))]/45",
                      "ring-1 ring-black/5",
                      "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
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
                    "ring-0 shadow-none",
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
                    "ring-1 ring-black/10 shadow-none",
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