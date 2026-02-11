import { useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type HeroAdvancedFilters = {
  price: [number, number];
  area: [number, number];
  bed: "all" | "studio" | 1 | 2 | 3 | 4;
  bath: "all" | 1 | 2 | 3 | 4;
  view: "any" | "sea" | "city" | "park";
  referenceNumber: string;
  amenities: {
    study: boolean;
    conferenceRoom: boolean;
    availableFurnished: boolean;
    sharedSpa: boolean;
    retailInBuilding: boolean;
  };
};

const defaultFilters: HeroAdvancedFilters = {
  price: [2, 12],
  area: [800, 3600],
  bed: "all",
  bath: "all",
  view: "any",
  referenceNumber: "",
  amenities: {
    study: false,
    conferenceRoom: false,
    availableFurnished: false,
    sharedSpa: false,
    retailInBuilding: false,
  },
};

export function HeroFiltersDropdown({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const [draft, setDraft] = useState<HeroAdvancedFilters>(defaultFilters);
  const selectedAmenitiesCount = useMemo(() => {
    return Object.values(draft.amenities).filter(Boolean).length;
  }, [draft.amenities]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        align="center"
        side="bottom"
        className={cn(
          "w-[min(92vw,860px)] rounded-[22px] border border-white/80 bg-white p-5 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.75)] ring-1 ring-black/10",
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Price */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Price
              </div>
              <div className="flex-1">
                <Slider
                  value={draft.price}
                  onValueChange={(v) =>
                    setDraft((p) => ({ ...p, price: [v[0]!, v[1]!] }))
                  }
                  min={0}
                  max={20}
                  step={1}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-[hsl(var(--brand-ink))]/70">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>
            </div>
          </div>

          {/* Area */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Area
              </div>
              <div className="flex-1">
                <Slider
                  value={draft.area}
                  onValueChange={(v) =>
                    setDraft((p) => ({ ...p, area: [v[0]!, v[1]!] }))
                  }
                  min={200}
                  max={8000}
                  step={50}
                />
                <div className="mt-2 flex items-center justify-between text-xs text-[hsl(var(--brand-ink))]/70">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bed */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Bed
              </div>
              <ToggleGroup
                type="single"
                value={String(draft.bed)}
                onValueChange={(v) => {
                  if (!v) return;
                  setDraft((p) => ({
                    ...p,
                    bed:
                      v === "all"
                        ? "all"
                        : v === "studio"
                          ? "studio"
                          : (Number(v) as 1 | 2 | 3 | 4),
                  }));
                }}
                className="flex flex-wrap justify-start gap-2"
              >
                {["all", "studio", "1", "2", "3", "4"].map((v) => (
                  <ToggleGroupItem
                    key={v}
                    value={v}
                    className="h-10 rounded-[10px] border border-black/5 bg-muted px-4 text-xs font-semibold text-[hsl(var(--brand-ink))] data-[state=on]:bg-[hsl(var(--brand-ink))] data-[state=on]:text-white"
                  >
                    {v === "all"
                      ? "All"
                      : v === "studio"
                        ? "Studio"
                        : v}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {/* Bath */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Bath
              </div>
              <ToggleGroup
                type="single"
                value={String(draft.bath)}
                onValueChange={(v) => {
                  if (!v) return;
                  setDraft((p) => ({
                    ...p,
                    bath: v === "all" ? "all" : (Number(v) as 1 | 2 | 3 | 4),
                  }));
                }}
                className="flex flex-wrap justify-start gap-2"
              >
                {["all", "1", "2", "3", "4"].map((v) => (
                  <ToggleGroupItem
                    key={v}
                    value={v}
                    className="h-10 rounded-[10px] border border-black/5 bg-muted px-4 text-xs font-semibold text-[hsl(var(--brand-ink))] data-[state=on]:bg-[hsl(var(--brand-ink))] data-[state=on]:text-white"
                  >
                    {v === "all" ? "All" : v}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
              Other Specs
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70">
                  View
                </div>
                <Select
                  value={draft.view}
                  onValueChange={(v) =>
                    setDraft((p) => ({ ...p, view: v as HeroAdvancedFilters["view"] }))
                  }
                >
                  <SelectTrigger className="h-12 rounded-full border-black/5 bg-muted/70 px-5 ring-1 ring-black/10">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="sea">Sea</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="park">Park</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70">
                  Reference Number
                </div>
                <Input
                  value={draft.referenceNumber}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, referenceNumber: e.target.value }))
                  }
                  placeholder="123456"
                  className="h-12 rounded-full border-black/5 bg-muted/70 px-5 ring-1 ring-black/10"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70">
                Amenities
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                <AmenityCheck
                  label="Study"
                  checked={draft.amenities.study}
                  onCheckedChange={(v) =>
                    setDraft((p) => ({
                      ...p,
                      amenities: { ...p.amenities, study: v },
                    }))
                  }
                />
                <AmenityCheck
                  label="Conference Room"
                  checked={draft.amenities.conferenceRoom}
                  onCheckedChange={(v) =>
                    setDraft((p) => ({
                      ...p,
                      amenities: { ...p.amenities, conferenceRoom: v },
                    }))
                  }
                />
                <AmenityCheck
                  label="Available Furnished"
                  checked={draft.amenities.availableFurnished}
                  onCheckedChange={(v) =>
                    setDraft((p) => ({
                      ...p,
                      amenities: { ...p.amenities, availableFurnished: v },
                    }))
                  }
                />
                <AmenityCheck
                  label="Shared Spa"
                  checked={draft.amenities.sharedSpa}
                  onCheckedChange={(v) =>
                    setDraft((p) => ({
                      ...p,
                      amenities: { ...p.amenities, sharedSpa: v },
                    }))
                  }
                />
                <AmenityCheck
                  label="Retail In Building"
                  checked={draft.amenities.retailInBuilding}
                  onCheckedChange={(v) =>
                    setDraft((p) => ({
                      ...p,
                      amenities: { ...p.amenities, retailInBuilding: v },
                    }))
                  }
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {selectedAmenitiesCount > 0
                  ? `${selectedAmenitiesCount} selected`
                  : "None selected"}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-full border-[hsl(var(--brand-ink))]/25 bg-transparent text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-ink))]/5 sm:w-[200px]"
                onClick={() => setDraft(defaultFilters)}
              >
                Reset
              </Button>
              <Button
                type="button"
                className="h-11 w-full rounded-full bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 sm:w-[200px]"
                onClick={() => onOpenChange(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AmenityCheck({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(var(--brand-ink))]">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(Boolean(v))}
        className="h-4 w-4 rounded-[5px]"
      />
      <span>{label}</span>
    </label>
  );
}
