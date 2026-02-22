import { useMemo } from "react";
import { ArrowRight, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import type {
  AdminPropertyDraft,
  PropertyListingType,
  PropertyPlacement,
  PropertyType,
} from "@/components/admin/PropertyEditor";

function toggleInArray<T extends string>(arr: T[], v: T) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

const PLACEMENT_OPTIONS: { key: PropertyPlacement; label: string; hint: string }[] =
  [
    { key: "featured", label: "Featured", hint: "Homepage featured areas" },
    { key: "buy", label: "Buy", hint: "Buy navigation + results" },
    { key: "rent", label: "Rent", hint: "Rent navigation + results" },
    { key: "communities", label: "Communities", hint: "Community pages" },
    { key: "developers", label: "Developers", hint: "Developer pages" },
    {
      key: "featured-projects",
      label: "Featured Projects",
      hint: "Trends / projects pages",
    },
    { key: "services", label: "Services", hint: "Services pages" },
    { key: "more", label: "More", hint: "Company/resources pages" },
  ];

export function NewListingSetup({
  value,
  onChange,
  onContinue,
  onCancel,
  className,
}: {
  value: AdminPropertyDraft;
  onChange: (next: AdminPropertyDraft) => void;
  onContinue: () => void;
  onCancel: () => void;
  className?: string;
}) {
  const placementsCount = value.placements.length;

  const canContinue = useMemo(() => {
    return value.placements.length > 0;
  }, [value.placements.length]);

  return (
    <Card
      className={cn(
        "rounded-[5px] border border-black/10 bg-white/80 p-6 ring-1 ring-black/5",
        className,
      )}
    >
      <div className="text-xs font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
        STEP 1
      </div>
      <div className="mt-2 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
        New listing setup
      </div>
      <div className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
        Pick the listing type and where it should appear on the website — then
        you’ll fill in the full details.
      </div>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Listing type</Label>
            <Select
              value={value.listingType}
              onValueChange={(v) => {
                const listingType = v as PropertyListingType;

                // Helpful default placement
                const nextPlacements =
                  listingType === "rent"
                    ? (value.placements.includes("rent")
                        ? value.placements
                        : [...value.placements, "rent"]) as PropertyPlacement[]
                    : value.placements;

                onChange({ ...value, listingType, placements: nextPlacements });
              }}
            >
              <SelectTrigger className="h-11 rounded-[5px] bg-white/80">
                <SelectValue placeholder="Sale / Rent" />
              </SelectTrigger>
              <SelectContent className="rounded-[5px]">
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-[11px] font-semibold text-muted-foreground">
              Controls whether it appears on Buy vs Rent results.
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Property type</Label>
            <Select
              value={value.propertyType}
              onValueChange={(v) =>
                onChange({ ...value, propertyType: v as PropertyType })
              }
            >
              <SelectTrigger className="h-11 rounded-[5px] bg-white/80">
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent className="rounded-[5px]">
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-[11px] font-semibold text-muted-foreground">
              Helps keep inventory organized and filterable later.
            </div>
          </div>
        </div>

        <div className="rounded-[5px] border border-black/10 bg-white/70 p-5 ring-1 ring-black/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                Website placements
              </div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground">
                Choose where this listing will show (sections + navigation).
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-[5px] bg-white/80 px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10">
              <Tag className="h-4 w-4" />
              Selected:{" "}
              <span className="font-extrabold text-[hsl(var(--brand-ink))]">
                {placementsCount}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PLACEMENT_OPTIONS.map((opt) => {
              const active = value.placements.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    const next = toggleInArray(value.placements, opt.key);

                    const nextFeatured =
                      opt.key === "featured"
                        ? next.includes("featured")
                        : value.featured;

                    onChange({
                      ...value,
                      placements: next as PropertyPlacement[],
                      featured: nextFeatured,
                    });
                  }}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition",
                    "ring-1 ring-black/10",
                    active
                      ? "bg-[hsl(var(--brand))]/14 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
                      : "bg-white/80 text-[hsl(var(--brand-ink))] hover:bg-white",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                  )}
                  aria-pressed={active}
                  title={opt.hint}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {value.placements.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {value.placements.map((p) => (
                <Badge
                  key={p}
                  className="rounded-full bg-white/80 text-foreground hover:bg-white"
                >
                  {p}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-[5px] bg-[hsl(var(--brand))]/10 p-3 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
              Choose at least one placement to continue.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
          <div>
            <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Featured
            </div>
            <div className="mt-1 text-xs font-semibold text-muted-foreground">
              Toggles the Featured flag and adds/removes the “featured”
              placement.
            </div>
          </div>
          <Switch
            checked={value.featured}
            onCheckedChange={(v) => {
              const nextPlacements = v
                ? (value.placements.includes("featured")
                    ? value.placements
                    : [...value.placements, "featured"]) as PropertyPlacement[]
                : value.placements.filter(
                    (p) => p !== "featured",
                  ) as PropertyPlacement[];

              onChange({
                ...value,
                featured: v,
                placements: nextPlacements,
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="h-11 rounded-[5px]"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 disabled:opacity-50"
            disabled={!canContinue}
            onClick={() => {
              if (!canContinue) {
                toast({
                  title: "Placements required",
                  description: "Select at least one placement to continue.",
                  variant: "destructive",
                });
                return;
              }
              onContinue();
            }}
          >
            Continue to details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}