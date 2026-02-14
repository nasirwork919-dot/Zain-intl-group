import { useMemo, useState } from "react";
import {
  Bookmark,
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
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
import { Sheet, SheetContent } from "@/components/ui/sheet";

type Operation = "buy" | "rent";
export type Segment =
  | "all"
  | "ready"
  | "off-plan"
  | "new"
  | "hot-deal"
  | "investor-pick"
  | "waterfront"
  | "family"
  | "prime"
  | "luxury";

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

type TourType = "floor-plans" | "video-tours" | "360-tours";

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

  // More filters (functional for price/area/keywords; agent/tours are UI-state until data exists)
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  keywords: string;
  agent: string;
  tourTypes: TourType[];
};

const DEFAULT_VALUE: BayutRailValue = {
  operation: "buy",
  query: "",
  segment: "all",
  category: "Residential",
  residentialType: "Any",
  beds: "Any",
  baths: "Any",

  priceMin: "",
  priceMax: "",
  areaMin: "",
  areaMax: "",
  keywords: "",
  agent: "",
  tourTypes: [],
};

function numOrNull(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n)) return null;
  return n;
}

function TourPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-4 text-xs font-semibold transition",
        "ring-1 ring-black/10",
        active
          ? "bg-[hsl(var(--brand-ink))] text-white ring-transparent"
          : "bg-white text-[hsl(var(--brand-ink))] hover:bg-muted/30",
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function MoreFiltersPanel({
  draft,
  setDraft,
  onReset,
  onApply,
}: {
  draft: {
    priceMin: string;
    priceMax: string;
    areaMin: string;
    areaMax: string;
    keywords: string;
    agent: string;
    tourTypes: TourType[];
  };
  setDraft: React.Dispatch<
    React.SetStateAction<{
      priceMin: string;
      priceMax: string;
      areaMin: string;
      areaMax: string;
      keywords: string;
      agent: string;
      tourTypes: TourType[];
    }>
  >;
  onReset: () => void;
  onApply: () => void;
}) {
  return (
    <div className="grid gap-4">
      {/* Price */}
      <div>
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          Price (AED)
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <div className="text-xs font-semibold text-muted-foreground">
              Minimum
            </div>
            <Input
              value={draft.priceMin}
              onChange={(e) =>
                setDraft((p) => ({ ...p, priceMin: e.target.value }))
              }
              inputMode="numeric"
              placeholder="0"
              className="h-10 rounded-[10px]"
            />
          </div>
          <div className="grid gap-1">
            <div className="text-xs font-semibold text-muted-foreground">
              Maximum
            </div>
            <Input
              value={draft.priceMax}
              onChange={(e) =>
                setDraft((p) => ({ ...p, priceMax: e.target.value }))
              }
              inputMode="numeric"
              placeholder="Any"
              className="h-10 rounded-[10px]"
            />
          </div>
        </div>
      </div>

      {/* Area */}
      <div>
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          Area (sqft)
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <div className="text-xs font-semibold text-muted-foreground">
              Minimum
            </div>
            <Input
              value={draft.areaMin}
              onChange={(e) =>
                setDraft((p) => ({ ...p, areaMin: e.target.value }))
              }
              inputMode="numeric"
              placeholder="0"
              className="h-10 rounded-[10px]"
            />
          </div>
          <div className="grid gap-1">
            <div className="text-xs font-semibold text-muted-foreground">
              Maximum
            </div>
            <Input
              value={draft.areaMax}
              onChange={(e) =>
                setDraft((p) => ({ ...p, areaMax: e.target.value }))
              }
              inputMode="numeric"
              placeholder="Any"
              className="h-10 rounded-[10px]"
            />
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          Keywords
        </div>
        <Input
          value={draft.keywords}
          onChange={(e) =>
            setDraft((p) => ({ ...p, keywords: e.target.value }))
          }
          placeholder="Add relevant keywords"
          className="mt-3 h-10 rounded-[10px]"
        />
      </div>

      {/* Agent */}
      <div>
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          Agent or Agency
        </div>
        <Input
          value={draft.agent}
          onChange={(e) => setDraft((p) => ({ ...p, agent: e.target.value }))}
          placeholder="Select an agent or agency"
          className="mt-3 h-10 rounded-[10px]"
        />
        <div className="mt-2 text-xs font-semibold text-muted-foreground">
          Note: agent filtering becomes real once listings include agent data.
        </div>
      </div>

      {/* Tour type (kept UI for later) */}
      <div>
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          Tour Type
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <TourPill
            active={draft.tourTypes.includes("floor-plans")}
            label="Floor plans"
            onClick={() =>
              setDraft((p) => ({
                ...p,
                tourTypes: p.tourTypes.includes("floor-plans")
                  ? p.tourTypes.filter((t) => t !== "floor-plans")
                  : [...p.tourTypes, "floor-plans"],
              }))
            }
          />
          <TourPill
            active={draft.tourTypes.includes("video-tours")}
            label="Video tours"
            onClick={() =>
              setDraft((p) => ({
                ...p,
                tourTypes: p.tourTypes.includes("video-tours")
                  ? p.tourTypes.filter((t) => t !== "video-tours")
                  : [...p.tourTypes, "video-tours"],
              }))
            }
          />
          <TourPill
            active={draft.tourTypes.includes("360-tours")}
            label="360° tours"
            onClick={() =>
              setDraft((p) => ({
                ...p,
                tourTypes: p.tourTypes.includes("360-tours")
                  ? p.tourTypes.filter((t) => t !== "360-tours")
                  : [...p.tourTypes, "360-tours"],
              }))
            }
          />
        </div>

        <div className="mt-2 text-xs font-semibold text-muted-foreground">
          Note: tour filtering becomes real once listings include tour flags.
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          className="h-10 flex-1 rounded-[10px]"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          className="h-10 flex-1 rounded-[10px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
          onClick={onApply}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

function MoreFiltersPopover({
  value,
  onChange,
}: {
  value: BayutRailValue;
  onChange: (next: BayutRailValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [draft, setDraft] = useState(() => ({
    priceMin: value.priceMin,
    priceMax: value.priceMax,
    areaMin: value.areaMin,
    areaMax: value.areaMax,
    keywords: value.keywords,
    agent: value.agent,
    tourTypes: value.tourTypes,
  }));

  const reset = () => {
    setDraft({
      priceMin: "",
      priceMax: "",
      areaMin: "",
      areaMax: "",
      keywords: "",
      agent: "",
      tourTypes: [],
    });
  };

  const apply = (close: () => void) => {
    const pMin = numOrNull(draft.priceMin);
    const pMax = numOrNull(draft.priceMax);
    const aMin = numOrNull(draft.areaMin);
    const aMax = numOrNull(draft.areaMax);

    if (pMin !== null && pMax !== null && pMax > 0 && pMin > pMax) {
      toast({
        title: "Check price range",
        description: "Minimum price is higher than maximum.",
      });
      return;
    }
    if (aMin !== null && aMax !== null && aMax > 0 && aMin > aMax) {
      toast({
        title: "Check area range",
        description: "Minimum area is higher than maximum.",
      });
      return;
    }

    onChange({ ...value, ...draft });

    toast({
      title: "Filters applied",
      description: "Your advanced filters have been updated.",
    });

    close();
  };

  const activeCount = useMemo(() => {
    let c = 0;
    if (draft.priceMin.trim() || draft.priceMax.trim()) c += 1;
    if (draft.areaMin.trim() || draft.areaMax.trim()) c += 1;
    if (draft.keywords.trim()) c += 1;
    if (draft.agent.trim()) c += 1;
    if (draft.tourTypes.length) c += 1;
    return c;
  }, [draft]);

  return (
    <>
      {/* Mobile: full-screen sheet */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="h-10 rounded-[10px] bg-white px-4 text-xs font-semibold"
          aria-label="More filters"
          onClick={() => setMobileOpen(true)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          More Filters
          {activeCount ? (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--brand))]/14 px-1.5 text-[11px] font-extrabold text-[hsl(var(--brand-ink))] ring-1 ring-[hsl(var(--brand))]/25">
              {activeCount}
            </span>
          ) : null}
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="bottom"
            className={cn(
              "h-[92vh] p-0",
              "rounded-t-[5px] border border-white/60 bg-[hsl(var(--page))]",
              "shadow-[0_30px_100px_-70px_rgba(15,23,42,0.9)]",
              "[&>button]:hidden",
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/75 px-4 py-3 backdrop-blur">
                <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  More Filters
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-black/5"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div
                  className={cn(
                    "rounded-[5px] border border-white/60 bg-white/75",
                    "shadow-[0_26px_70px_-55px_rgba(15,23,42,0.55)]",
                    "ring-1 ring-black/10",
                    "backdrop-blur supports-[backdrop-filter]:bg-white/65",
                    "p-4",
                  )}
                >
                  <MoreFiltersPanel
                    draft={draft}
                    setDraft={setDraft}
                    onReset={reset}
                    onApply={() => apply(() => setMobileOpen(false))}
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: popover */}
      <div className="hidden md:block">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 rounded-[10px] bg-white px-4 text-xs font-semibold"
              aria-label="More filters"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
              {activeCount ? (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--brand))]/14 px-1.5 text-[11px] font-extrabold text-[hsl(var(--brand-ink))] ring-1 ring-[hsl(var(--brand))]/25">
                  {activeCount}
                </span>
              ) : null}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-[340px] rounded-[12px] p-4">
            <MoreFiltersPanel
              draft={draft}
              setDraft={setDraft}
              onReset={reset}
              onApply={() => apply(() => setOpen(false))}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function MoreTagsPopover({
  active,
  onSelect,
}: {
  active: Segment;
  onSelect: (seg: Segment) => void;
}) {
  const moreTags = useMemo(
    () =>
      [
        { label: "Waterfront", value: "waterfront" as const },
        { label: "Family", value: "family" as const },
        { label: "Prime", value: "prime" as const },
        { label: "Luxury", value: "luxury" as const },
      ] as const,
    [],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Pill>More…</Pill>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[360px] rounded-[12px] p-4">
        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
          More tags
        </div>
        <div className="mt-2 text-xs font-semibold text-muted-foreground">
          Tap a tag to filter listings.
        </div>

        <div
          className={cn(
            "mt-4 flex items-center gap-2 overflow-x-auto pb-1",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {moreTags.map((t) => (
            <Pill
              key={t.value}
              active={active === t.value}
              onClick={() => onSelect(active === t.value ? "all" : t.value)}
              className="h-10 px-5 text-sm"
            >
              {t.label}
            </Pill>
          ))}
        </div>

        <div className="mt-4 rounded-[10px] bg-muted/30 p-3 text-xs font-semibold text-muted-foreground ring-1 ring-black/5">
          These match your existing listing tags (like “Waterfront”, “Family”, etc.).
        </div>
      </PopoverContent>
    </Popover>
  );
}

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
    value.operation !== "buy" ||
    value.priceMin.trim() ||
    value.priceMax.trim() ||
    value.areaMin.trim() ||
    value.areaMax.trim() ||
    value.keywords.trim();

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

  const tagChips = useMemo(
    () =>
      [
        { label: "New", value: "new" as const },
        { label: "Hot Deal", value: "hot-deal" as const },
        { label: "Investor Pick", value: "investor-pick" as const },
      ] as const,
    [],
  );

  return (
    <div className={cn("sticky z-40", className)} style={{ top: topOffsetPx }}>
      <div className={cn("w-full border-b border-black/10", railBg)}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Row 1 */}
          <div
            className={cn(
              "flex flex-nowrap items-center gap-2 py-3 overflow-x-auto",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              "lg:flex-wrap lg:overflow-x-visible",
            )}
          >
            {/* Operation dropdown (simple) */}
            <div className="flex-none">
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
                    onClick={() =>
                      onChange({
                        ...DEFAULT_VALUE,
                        query: value.query,
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    className="h-10 flex-1 rounded-[10px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                    onClick={() =>
                      toast({ title: "Saved", description: "Operation updated." })
                    }
                  >
                    Done
                  </Button>
                </div>
              </DropdownButton>
            </div>

            {/* Query input */}
            <div
              className={cn(
                "flex-none w-[260px] sm:w-[320px] lg:flex-1 lg:min-w-[260px]",
                "flex items-center gap-2",
                "h-10 rounded-[10px] bg-white ring-1 ring-black/10 px-3",
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

            <div className="flex-none">
              <Segmented
                value={value.segment}
                onChange={(segment) => onChange({ ...value, segment })}
              />
            </div>

            {/* Property type dropdown */}
            <div className="flex-none">
              <DropdownButton label="Residential" value={propertyTypeLabel}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <Pill
                      active={value.category === "Residential"}
                      onClick={() =>
                        onChange({ ...value, category: "Residential" })
                      }
                      className="flex-1"
                    >
                      Residential
                    </Pill>
                    <Pill
                      active={value.category === "Commercial"}
                      onClick={() =>
                        onChange({ ...value, category: "Commercial" })
                      }
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
                          residentialType:
                            v as BayutRailValue["residentialType"],
                        })
                      }
                    />
                  ) : (
                    <div className="rounded-[12px] bg-muted/30 p-3 text-sm text-muted-foreground ring-1 ring-black/5">
                      Commercial filters can be added next (offices, retail,
                      warehouses, etc.).
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
                      onClick={() =>
                        toast({
                          title: "Done",
                          description: "Property type updated.",
                        })
                      }
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </DropdownButton>
            </div>

            {/* Beds & Baths dropdown */}
            <div className="flex-none">
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

                <PopoverContent
                  className="w-[360px] rounded-[12px] p-4"
                  align="start"
                >
                  <div className="grid gap-4">
                    <SelectGrid
                      title="Beds"
                      items={[
                        "Any",
                        "Studio",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8+",
                      ]}
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
                        onClick={() =>
                          onChange({ ...value, beds: "Any", baths: "Any" })
                        }
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
            </div>

            <div className="flex-none">
              <MoreFiltersPopover value={value} onChange={onChange} />
            </div>
          </div>

          {/* Row 2: Tags + actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div className="flex flex-wrap items-center gap-2">
              {tagChips.map((t) => (
                <Pill
                  key={t.value}
                  active={value.segment === t.value}
                  onClick={() =>
                    onChange({
                      ...value,
                      segment: value.segment === t.value ? "all" : t.value,
                    })
                  }
                >
                  {t.label}
                </Pill>
              ))}

              <MoreTagsPopover
                active={value.segment}
                onSelect={(seg) => onChange({ ...value, segment: seg })}
              />
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