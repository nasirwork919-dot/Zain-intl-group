import { MapPin } from "lucide-react";

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

function SegTab({
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
        "h-11 min-w-[110px] rounded-[5px] px-5 text-sm font-semibold transition",
        "ring-1 ring-black/10",
        active
          ? "bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))]"
          : "bg-white text-[hsl(var(--brand-ink))]/80 hover:bg-muted/40 hover:text-[hsl(var(--brand-ink))]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function Pill({
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
        "h-10 rounded-[5px] px-5 text-sm font-semibold transition",
        "ring-1 ring-black/10",
        active
          ? "bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))]"
          : "bg-white text-[hsl(var(--brand-ink))]/80 hover:bg-muted/40 hover:text-[hsl(var(--brand-ink))]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
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
  className,
}: {
  value: HeroSearchBarLayoutValue;
  onChange: (next: HeroSearchBarLayoutValue) => void;
  onSubmit: () => void;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-[5px] bg-white/95 p-3",
          "shadow-[0_26px_80px_-60px_rgba(15,23,42,0.75)]",
          "ring-1 ring-black/10",
        )}
      >
        {/* Row 1 */}
        <div className="grid gap-3 lg:grid-cols-[240px_1fr_200px]">
          {/* Buy/Rent tabs */}
          <div className="grid grid-cols-2 gap-2">
            <SegTab
              active={value.operation === "buy"}
              onClick={() => onChange({ ...value, operation: "buy" })}
            >
              Buy
            </SegTab>
            <SegTab
              active={value.operation === "rent"}
              onClick={() => onChange({ ...value, operation: "rent" })}
            >
              Rent
            </SegTab>
          </div>

          {/* Location input (maps to query for now) */}
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--brand-ink))]/55" />
            <Input
              value={value.query}
              onChange={(e) => onChange({ ...value, query: e.target.value })}
              placeholder="Enter location"
              className={cn(
                "h-11 rounded-[5px] border border-black/10 bg-white pl-11",
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
              "h-11 rounded-[5px] bg-emerald-600 text-white hover:bg-emerald-600/92",
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
            <Pill active={value.query.toLowerCase() === "all"} onClick={() => onChange({ ...value, query: "all" })}>
              All
            </Pill>
            <Pill
              active={value.query.toLowerCase() === "ready"}
              onClick={() => onChange({ ...value, query: "ready" })}
            >
              Ready
            </Pill>
            <Pill
              active={value.query.toLowerCase() === "off-plan"}
              onClick={() => onChange({ ...value, query: "off-plan" })}
            >
              Off-Plan
            </Pill>
          </div>

          {/* Residential */}
          <Select
            value={value.propertyType}
            onValueChange={(v) =>
              onChange({ ...value, propertyType: v as HeroSearchBarLayoutValue["propertyType"] })
            }
          >
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none">
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
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none">
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
            <SelectTrigger className="h-10 rounded-[5px] border border-black/10 bg-white px-4 text-sm font-semibold text-[hsl(var(--brand-ink))] shadow-none">
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