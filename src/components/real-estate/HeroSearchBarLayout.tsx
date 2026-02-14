import { Filter, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type HeroSearchBarLayoutValue = {
  operation: "buy" | "rent" | "sell" | "manage";
  propertyType: "apartment" | "villa" | "townhouse";
  query: string;
};

function OpPill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-5 text-xs font-extrabold tracking-[0.12em] transition",
        "ring-1 ring-black/10",
        active
          ? "bg-[hsl(var(--brand-ink))] text-white ring-white/0"
          : "bg-white/90 text-[hsl(var(--brand-ink))] hover:bg-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export function HeroSearchBarLayout({
  value,
  onChange,
  onSubmit,
  onOpenFilters,
  className,
}: {
  value: HeroSearchBarLayoutValue;
  onChange: (next: HeroSearchBarLayoutValue) => void;
  onSubmit: () => void;
  onOpenFilters?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile UI (screenshot-style) */}
      <div className="mx-auto w-full max-w-xl lg:hidden">
        {/* Top pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <OpPill
            active={value.operation === "buy"}
            onClick={() => onChange({ ...value, operation: "buy" })}
          >
            BUY
          </OpPill>
          <OpPill
            active={value.operation === "rent"}
            onClick={() => onChange({ ...value, operation: "rent" })}
          >
            RENT
          </OpPill>
          <OpPill
            active={value.operation === "manage"}
            onClick={() => onChange({ ...value, operation: "manage" })}
          >
            MANAGE
          </OpPill>
        </div>

        {/* Property type */}
        <div
          className={cn(
            "mt-3 overflow-hidden rounded-full",
            "bg-white/85 ring-1 ring-black/10 shadow-[0_22px_70px_-55px_rgba(15,23,42,0.75)]",
            "backdrop-blur supports-[backdrop-filter]:bg-white/75",
          )}
        >
          <Select
            value={value.propertyType}
            onValueChange={(v) =>
              onChange({
                ...value,
                propertyType: v as HeroSearchBarLayoutValue["propertyType"],
              })
            }
          >
            <SelectTrigger
              className={cn(
                "h-12 w-full rounded-full border-0 bg-transparent px-5 text-left",
                "text-sm font-semibold text-[hsl(var(--brand-ink))]",
                "focus:ring-2 focus:ring-[hsl(var(--brand))]/25",
              )}
            >
              <SelectValue placeholder="Choose Property Type" />
            </SelectTrigger>
            <SelectContent className="rounded-[5px]">
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Query + actions */}
        <div
          className={cn(
            "mt-3 flex items-center gap-2 overflow-hidden rounded-full",
            "bg-white/85 ring-1 ring-black/10 shadow-[0_22px_70px_-55px_rgba(15,23,42,0.75)]",
            "backdrop-blur supports-[backdrop-filter]:bg-white/75",
          )}
        >
          <Input
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Community or Building..."
            className={cn(
              "h-12 flex-1 border-0 bg-transparent px-5",
              "text-sm font-semibold text-[hsl(var(--brand-ink))]",
              "placeholder:text-[hsl(var(--brand-ink))]/45",
              "focus-visible:ring-0",
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
          />

          <Button
            type="button"
            onClick={onSubmit}
            className={cn(
              "h-11 w-11 rounded-full p-0",
              "bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
              "shadow-sm",
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onOpenFilters}
            className={cn(
              "mr-1 h-11 w-11 rounded-full p-0",
              "border-black/10 bg-white/70 text-[hsl(var(--brand-ink))]",
              "hover:bg-white hover:text-[hsl(var(--brand-ink))]",
            )}
            aria-label="Filters"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop / large screens: keep the previous "new layout" (2-row bar) */}
      <div
        className={cn(
          "hidden lg:block",
          "rounded-[5px] bg-white/95 p-3",
          "shadow-[0_26px_80px_-60px_rgba(15,23,42,0.75)]",
          "ring-1 ring-black/10",
        )}
      >
        {/* Row 1 */}
        <div className="grid gap-3 lg:grid-cols-[240px_1fr_200px]">
          {/* Buy/Rent tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...value, operation: "buy" })}
              className={cn(
                "h-11 min-w-[110px] rounded-[5px] px-5 text-sm font-semibold transition",
                "ring-1 ring-black/10",
                value.operation === "buy"
                  ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
                  : "bg-white text-[hsl(var(--brand-ink))]/80 hover:bg-muted/40 hover:text-[hsl(var(--brand-ink))]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
              )}
              aria-pressed={value.operation === "buy"}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...value, operation: "rent" })}
              className={cn(
                "h-11 min-w-[110px] rounded-[5px] px-5 text-sm font-semibold transition",
                "ring-1 ring-black/10",
                value.operation === "rent"
                  ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
                  : "bg-white text-[hsl(var(--brand-ink))]/80 hover:bg-muted/40 hover:text-[hsl(var(--brand-ink))]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
              )}
              aria-pressed={value.operation === "rent"}
            >
              Rent
            </button>
          </div>

          {/* Location input (maps to query for now) */}
          <div className="relative">
            <Input
              value={value.query}
              onChange={(e) => onChange({ ...value, query: e.target.value })}
              placeholder="Enter location"
              className={cn(
                "h-11 rounded-[5px] border border-black/10 bg-white px-4",
                "text-[hsl(var(--brand-ink))] placeholder:text-[hsl(var(--brand-ink))]/45",
                "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSubmit();
              }}
            />
          </div>

          {/* Search button */}
          <Button
            onClick={onSubmit}
            className={cn(
              "h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
              "font-semibold",
            )}
          >
            Search
          </Button>
        </div>

        {/* Row 2 */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_180px_200px_200px]">
          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Ready", value: "ready" },
              { label: "Off-Plan", value: "off-plan" },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => onChange({ ...value, query: p.value })}
                className={cn(
                  "h-10 rounded-[5px] px-5 text-sm font-semibold transition",
                  "ring-1 ring-black/10",
                  value.query.toLowerCase() === p.value
                    ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
                    : "bg-white text-[hsl(var(--brand-ink))]/80 hover:bg-muted/40 hover:text-[hsl(var(--brand-ink))]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Residential */}
          <Select
            value={value.propertyType}
            onValueChange={(v) =>
              onChange({
                ...value,
                propertyType: v as HeroSearchBarLayoutValue["propertyType"],
              })
            }
          >
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none focus:ring-[hsl(var(--brand))]/25">
              <SelectValue placeholder="Residential" />
            </SelectTrigger>
            <SelectContent className="rounded-[5px]">
              <SelectItem value="apartment">Residential</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>

          {/* Beds & Baths (visual only for now) */}
          <Select value="any" onValueChange={() => {}}>
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none focus:ring-[hsl(var(--brand))]/25">
              <SelectValue placeholder="Beds & Baths" />
            </SelectTrigger>
            <SelectContent className="rounded-[5px]">
              <SelectItem value="any">Beds & Baths</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>

          {/* Price (AED) (visual only for now) */}
          <Select value="any" onValueChange={() => {}}>
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none focus:ring-[hsl(var(--brand))]/25">
              <SelectValue placeholder="Price (AED)" />
            </SelectTrigger>
            <SelectContent className="rounded-[5px]">
              <SelectItem value="any">Price (AED)</SelectItem>
              <SelectItem value="2m">≤ 2M</SelectItem>
              <SelectItem value="5m">≤ 5M</SelectItem>
              <SelectItem value="10m">≤ 10M</SelectItem>
              <SelectItem value="20m">≤ 20M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
