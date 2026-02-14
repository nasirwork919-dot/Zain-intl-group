import { useMemo, useState } from "react";
import {
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
  Bookmark,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

type Operation = "buy" | "rent";
type Segment = "all" | "ready" | "off-plan";

function Pill({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-4 text-xs font-semibold transition",
        "ring-1 ring-black/10",
        active
          ? "bg-[hsl(var(--brand))]/14 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
          : "bg-white text-[hsl(var(--brand-ink))] hover:bg-muted/30",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
        className,
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: Segment;
  onChange: (v: Segment) => void;
}) {
  const items: { label: string; value: Segment }[] = [
    { label: "All", value: "all" },
    { label: "Ready", value: "ready" },
    { label: "Off-Plan", value: "off-plan" },
  ];

  return (
    <div className="inline-flex overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10">
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            className={cn(
              "h-10 px-4 text-xs font-semibold transition",
              active
                ? "bg-[hsl(var(--brand))]/14 text-[hsl(var(--brand-ink))]"
                : "text-muted-foreground hover:bg-muted/30 hover:text-[hsl(var(--brand-ink))]",
            )}
            aria-pressed={active}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function DropdownButton({
  label,
  value,
  children,
  className,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-10 items-center justify-between gap-3 rounded-[10px] px-4 text-xs font-semibold",
            "bg-white text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
            "hover:bg-muted/30 transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
            className,
          )}
        >
          <span className="truncate">{value || label}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] rounded-[12px] p-4" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
}

function SelectGrid({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-xs font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
        {title}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map((it) => {
          const active = it === value;
          return (
            <button
              key={it}
              type="button"
              onClick={() => onChange(it)}
              className={cn(
                "h-10 rounded-[10px] px-3 text-xs font-semibold transition",
                "ring-1 ring-black/10",
                active
                  ? "bg-[hsl(var(--brand-ink))] text-white ring-transparent"
                  : "bg-white text-[hsl(var(--brand-ink))] hover:bg-muted/30",
              )}
              aria-pressed={active}
            >
              {it}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type BayutRailValue = {
  operation: Operation;
  query: string;

  segment: Segment;
  category: "Residential" | "Commercial";
  residentialType:
    | "Any"
    | "Apartment"
    | "Villa"
    | "Townhouse"
    | "Penthouse"
    | "Hotel Apartment"
    | "Land"
    | "Building"
    | "Floor";

  beds: string; // "Any" | "Studio" | "1" ... "8+"
  baths: string; // "Any" | "1" ... "6+"
};

const DEFAULT_VALUE: BayutRailValue = {
  operation: "buy",
  query: "",
  segment: "all",
  category: "Residential",
  residentialType: "Any",
  beds: "Any",
  baths: "Any",
};

export function BayutFiltersRail({
  value,
  onChange,
  onClear,
  className,
  topOffsetPx = 132,
}: {
  value: BayutRailValue;
  onChange: (next: BayutRailValue) => void;
  onClear: () => void;
  className?: string;
  topOffsetPx?: number;
}) {
  const [openBedsBaths, setOpenBedsBaths] = useState(false);

  const hasAnyFilter =
    value.query.trim() ||
    value.segment !== "all" ||
    value.residentialType !== "Any" ||
    value.beds !== "Any" ||
    value.baths !== "Any" ||
    value.operation !== "buy";

  const railBg =
    "bg-white/92 backdrop-blur supports-[backdrop-filter]:bg-white/75";

  const opLabel = value.operation === "buy" ? "Buy" : "Rent";

  const propertyTypeLabel =
    value.category === "Residential"
      ? value.residentialType === "Any"
        ? "Residential"
        : value.residentialType
      : "Commercial";

  const bedsBathsLabel =
    value.beds === "Any" && value.baths === "Any"
      ? "Beds & Baths"
      : `${value.beds === "Any" ? "Any" : value.beds} / ${value.baths === "Any" ? "Any" : value.baths}`;

  const queryChip = value.query.trim();

  const residentialItems = useMemo(
    () => [
      "Any",
      "Apartment",
      "Villa",
      "Townhouse",
      "Penthouse",
      "Hotel Apartment",
      "Land",
      "Building",
      "Floor",
    ],
    [],
  );

  return (
    <div
      className={cn("sticky z-40", className)}
      style={{ top: topOffsetPx }}
    >
      <div className={cn("w-full border-b border-black/10", railBg)}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center gap-2 py-3">
            {/* Operation dropdown (simple) */}
            <DropdownButton label="Buy" value={opLabel} className="w-[96px]">
              <SelectGrid
                title="Operation"
                items={["Buy", "Rent"]}
                value={opLabel}
                onChange={(v) =>
                  onChange({
                    ...value,
                    operation: v === "Rent" ? "rent" : "buy",
                  })
                }
              />
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-[10px]"
                  onClick={() => onChange({ ...DEFAULT_VALUE, query: value.query })}
                >
                  Reset
                </Button>
                <Button
                  className="h-10 flex-1 rounded-[10px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                  onClick={() => toast({ title: "Saved", description: "Operation updated." })}
                >
                  Done
                </Button>
              </div>
            </DropdownButton>

            {/* Query input (with chip) */}
            <div
              className={cn(
                "flex min-w-[260px] flex-1 items-center gap-2",
                "h-10 rounded-[10px] bg-white ring-1 ring-black/10",
                "px-3",
              )}
            >
              <MapPin className="h-4 w-4 text-[hsl(var(--brand-ink))]/55" />
              <Input
                value={value.query}
                onChange={(e) => onChange({ ...value, query: e.target.value })}
                placeholder="Community, building…"
                className={cn(
                  "h-9 border-0 bg-transparent px-0 text-sm font-semibold",
                  "focus-visible:ring-0",
                )}
              />
              {queryChip ? (
                <button
                  type="button"
                  onClick={() => onChange({ ...value, query: "" })}
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full",
                    "bg-white text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
                    "hover:bg-muted/30 transition",
                  )}
                  aria-label="Clear query"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <Segmented
              value={value.segment}
              onChange={(segment) => onChange({ ...value, segment })}
            />

            {/* Property type dropdown */}
            <DropdownButton label="Residential" value={propertyTypeLabel}>
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-2">
                  <Pill
                    active={value.category === "Residential"}
                    onClick={() => onChange({ ...value, category: "Residential" })}
                    className="flex-1"
                  >
                    Residential
                  </Pill>
                  <Pill
                    active={value.category === "Commercial"}
                    onClick={() => onChange({ ...value, category: "Commercial" })}
                    className="flex-1"
                  >
                    Commercial
                  </Pill>
                </div>

                {value.category === "Residential" ? (
                  <SelectGrid
                    title="Residential"
                    items={residentialItems}
                    value={value.residentialType}
                    onChange={(v) =>
                      onChange({
                        ...value,
                        residentialType: v as BayutRailValue["residentialType"],
                      })
                    }
                  />
                ) : (
                  <div className="rounded-[12px] bg-muted/30 p-3 text-sm text-muted-foreground ring-1 ring-black/5">
                    Commercial filters can be added next (offices, retail, warehouses, etc.).
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="h-10 flex-1 rounded-[10px]"
                    onClick={() =>
                      onChange({
                        ...value,
                        category: "Residential",
                        residentialType: "Any",
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    className="h-10 flex-1 rounded-[10px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                    onClick={() => toast({ title: "Done", description: "Property type updated." })}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </DropdownButton>

            {/* Beds & Baths dropdown */}
            <Popover open={openBedsBaths} onOpenChange={setOpenBedsBaths}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex h-10 items-center justify-between gap-3 rounded-[10px] px-4 text-xs font-semibold",
                    "bg-white text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
                    "hover:bg-muted/30 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                    "min-w-[160px]",
                  )}
                >
                  <span className="truncate">{bedsBathsLabel}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-[360px] rounded-[12px] p-4" align="start">
                <div className="grid gap-4">
                  <SelectGrid
                    title="Beds"
                    items={["Any", "Studio", "1", "2", "3", "4", "5", "6", "7", "8+"]}
                    value={value.beds}
                    onChange={(beds) => onChange({ ...value, beds })}
                  />

                  <SelectGrid
                    title="Baths"
                    items={["Any", "1", "2", "3", "4", "5", "6+"]}
                    value={value.baths}
                    onChange={(baths) => onChange({ ...value, baths })}
                  />

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="h-10 flex-1 rounded-[10px]"
                      onClick={() => onChange({ ...value, beds: "Any", baths: "Any" })}
                    >
                      Reset
                    </Button>
                    <Button
                      className="h-10 flex-1 rounded-[10px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                      onClick={() => setOpenBedsBaths(false)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              className="h-10 rounded-[10px] bg-white px-4 text-xs font-semibold"
              onClick={() =>
                toast({
                  title: "More filters",
                  description:
                    "If you want, I’ll add the right-side panel (price, area, keywords, tours) exactly like your screenshot.",
                })
              }
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <Pill
                onClick={() =>
                  toast({
                    title: "TruBroker",
                    description: "We can wire these badges to sorting/flags next.",
                  })
                }
              >
                TruBroker™ listings first
              </Pill>
              <Pill
                onClick={() =>
                  toast({
                    title: "TruCheck",
                    description: "We can wire these badges to sorting/flags next.",
                  })
                }
              >
                TruCheck™ listings first
              </Pill>
              <Pill
                onClick={() =>
                  toast({
                    title: "Floor plans",
                    description: "We can filter by floor plan availability next.",
                  })
                }
              >
                Properties with floor plans
              </Pill>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClear();
                  toast({
                    title: "Cleared",
                    description: "Filters reset.",
                  });
                }}
                className={cn(
                  "text-xs font-semibold text-[hsl(var(--brand-ink))] hover:underline underline-offset-4",
                  !hasAnyFilter && "pointer-events-none opacity-50",
                )}
              >
                Clear Filters
              </button>

              <button
                type="button"
                onClick={() =>
                  toast({
                    title: "Save search",
                    description:
                      "If you want real saved searches, we’ll add Supabase auth + storage next.",
                  })
                }
                className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(var(--brand-ink))]"
              >
                <Bookmark className="h-4 w-4" />
                Save Search
              </button>
            </div>
          </div>

          <Separator className="bg-black/10" />
        </div>
      </div>
    </div>
  );
}

export const BAYUT_RAIL_DEFAULT_VALUE = DEFAULT_VALUE;