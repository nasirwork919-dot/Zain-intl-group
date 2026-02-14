import { useMemo } from "react";
import { MapPin, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeroSearchBar, type HeroBarFilters } from "@/components/real-estate/HeroSearchBar";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { toast } from "@/hooks/use-toast";

function Chip({
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
          : "bg-white/80 text-[hsl(var(--brand-ink))] hover:bg-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
        className,
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export function TopPeekFiltersBar({
  value,
  onChange,
  onSubmit,
  className,
  title = "REFINE",
  subtitle = "Search without losing your place",
  topOffsetPx = 132,
}: {
  value: HeroBarFilters;
  onChange: (next: HeroBarFilters) => void;
  onSubmit: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
  topOffsetPx?: number;
}) {
  const visible = useHideOnScroll({ showUntilPx: 140 });

  const quickChips = useMemo(
    () => [
      { label: "All", q: "" },
      { label: "Ready", q: "ready" },
      { label: "Off-Plan", q: "off-plan" },
    ],
    [],
  );

  const chipActive = (q: string) =>
    value.query.trim().toLowerCase() === q.trim().toLowerCase();

  return (
    <div className={cn("fixed left-0 right-0 z-40", className)} style={{ top: topOffsetPx }}>
      <div
        className={cn(
          "w-full",
          "bg-[hsl(var(--page))]/92 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--page))]/75",
          "border-b border-black/5",
          "transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 sm:py-5">
          <div
            className={cn(
              "rounded-[5px] border border-black/10 bg-white/80 ring-1 ring-black/5",
              "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.55)]",
              "backdrop-blur supports-[backdrop-filter]:bg-white/65",
            )}
          >
            {/* MOBILE: Bayut-like compact layout */}
            <div className="md:hidden">
              <div className="px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/70">
                      {title}
                    </div>
                    <div className="mt-0.5 text-sm font-extrabold tracking-tight text-foreground">
                      {subtitle}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white/80"
                    onClick={() =>
                      toast({
                        title: "Filters",
                        description:
                          "If you want advanced filters (price, beds, amenities) I can wire the full sheet here.",
                      })
                    }
                    aria-label="More filters"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Row 1: operation + query */}
                <div className="mt-3 flex items-center gap-2">
                  <Select
                    value={value.operation}
                    onValueChange={(v) =>
                      onChange({ ...value, operation: v as HeroBarFilters["operation"] })
                    }
                  >
                    <SelectTrigger className="h-11 w-[98px] rounded-[5px] border-black/10 bg-white/80 px-3 text-xs font-semibold text-[hsl(var(--brand-ink))] shadow-none focus:ring-[hsl(var(--brand))]/25">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="manage">Manage</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--brand-ink))]/45" />
                    <Input
                      value={value.query}
                      onChange={(e) => onChange({ ...value, query: e.target.value })}
                      placeholder="Community, building…"
                      className={cn(
                        "h-11 rounded-[5px] border-black/10 bg-white/80 pl-9 pr-10",
                        "text-sm font-semibold text-[hsl(var(--brand-ink))]",
                        "placeholder:text-[hsl(var(--brand-ink))]/45",
                        "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onSubmit();
                      }}
                    />

                    {value.query.trim() ? (
                      <button
                        type="button"
                        onClick={() => onChange({ ...value, query: "" })}
                        className={cn(
                          "absolute right-2 top-1/2 -translate-y-1/2",
                          "inline-flex h-7 w-7 items-center justify-center rounded-full",
                          "bg-white text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
                          "hover:bg-muted/40 transition",
                        )}
                        aria-label="Clear"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Row 2: chips (h-scroll) */}
                <div className="mt-3">
                  <div
                    className={cn(
                      "flex items-center gap-2 overflow-x-auto pb-1",
                      "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                    )}
                  >
                    {quickChips.map((c) => (
                      <Chip
                        key={c.label}
                        active={c.q ? chipActive(c.q) : value.query.trim() === ""}
                        onClick={() => onChange({ ...value, query: c.q })}
                      >
                        {c.label}
                      </Chip>
                    ))}

                    <Chip
                      onClick={() =>
                        toast({
                          title: "Property type",
                          description:
                            "Tell me the property types you want here and I’ll make this a real selector.",
                        })
                      }
                      className="bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/20 hover:bg-[hsl(var(--brand))]/14"
                    >
                      Residential
                    </Chip>

                    <Chip
                      onClick={() =>
                        toast({
                          title: "Beds",
                          description:
                            "We can add a beds selector like Bayut (Studio, 1, 2, 3, 4+).",
                        })
                      }
                    >
                      Beds
                    </Chip>

                    <Button
                      variant="outline"
                      className="h-9 rounded-full bg-white/80 px-4 text-xs font-semibold"
                      onClick={onSubmit}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP/TABLET: keep existing full HeroSearchBar */}
            <div className="hidden md:block">
              <div className="px-3 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/70">
                      {title}
                    </div>
                    <div className="mt-1 text-sm font-extrabold tracking-tight text-foreground">
                      {subtitle}
                    </div>
                  </div>

                  <div className="hidden rounded-[5px] bg-white/80 px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10 sm:block">
                    Tip: press Enter to search
                  </div>
                </div>

                <div className="mt-3">
                  <HeroSearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
                </div>
              </div>

              <div className="h-3 sm:h-4" />
            </div>
          </div>

          {/* Extra breathing room under the fixed rail so the first section never feels glued */}
          <div className="h-3 sm:h-4" />
        </div>
      </div>
    </div>
  );
}