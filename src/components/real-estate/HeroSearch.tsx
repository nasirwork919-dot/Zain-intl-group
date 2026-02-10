import { useMemo, useState } from "react";
import { ArrowRight, BedDouble, MapPin, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import { locations } from "@/components/real-estate/site-data";

export type SearchFilters = {
  query: string;
  location: string | "any";
  beds: number | "any";
  maxPrice: number;
};

export function HeroSearch({
  onSearch,
}: {
  onSearch: (filters: SearchFilters) => void;
}) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<SearchFilters["location"]>("any");
  const [beds, setBeds] = useState<SearchFilters["beds"]>("any");
  const [maxPrice, setMaxPrice] = useState(20000000);

  const quickPills = useMemo(
    () => [
      { label: "Ready", set: () => setQuery("ready") },
      { label: "New Launch", set: () => setQuery("new") },
      { label: "Waterfront", set: () => setQuery("marina") },
      { label: "Family", set: () => setQuery("villa") },
    ],
    []
  );

  return (
    <Card className="rounded-3xl border-white/30 bg-white/65 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.55)] backdrop-blur supports-[backdrop-filter]:bg-white/55">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tight text-foreground">
              Find your next address
            </div>
            <div className="text-sm text-muted-foreground">
              Shortlist Dubai’s most in-demand communities.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPills.map((p) => (
              <button
                key={p.label}
                onClick={p.set}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5 transition hover:bg-white"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by community, project, keyword…"
                className="h-11 rounded-2xl border-white/50 bg-white/70 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Select
              value={location}
              onValueChange={(v) => setLocation(v as SearchFilters["location"])}
            >
              <SelectTrigger className="h-11 rounded-2xl border-white/50 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                <SelectValue placeholder="Any location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any location</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Select
              value={String(beds)}
              onValueChange={(v) => setBeds(v === "any" ? "any" : Number(v))}
            >
              <SelectTrigger className="h-11 rounded-2xl border-white/50 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any beds</SelectItem>
                {[1, 2, 3, 4, 5].map((b) => (
                  <SelectItem key={b} value={String(b)}>
                    {b}+ beds
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-full justify-between rounded-2xl border-white/50 bg-white/70 shadow-sm hover:bg-white"
                >
                  <span className="inline-flex items-center gap-2 text-sm">
                    <SlidersHorizontal className="h-4 w-4" />
                    Price
                  </span>
                  <Badge className="rounded-full bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand))]/10">
                    ≤ {Math.round(maxPrice / 1000000)}M
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] rounded-2xl">
                <div className="text-sm font-semibold">Max budget (AED)</div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>1M</span>
                  <span>20M</span>
                </div>
                <div className="mt-3">
                  <Slider
                    value={[maxPrice]}
                    onValueChange={(v) => setMaxPrice(v[0] ?? maxPrice)}
                    min={1000000}
                    max={20000000}
                    step={250000}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <BedDouble className="h-4 w-4" />
            <span>
              Filters: {location === "any" ? "All" : location} · {beds === "any" ? "Any beds" : `${beds}+ beds`} · ≤ {Math.round(maxPrice / 1000000)}M
            </span>
          </div>
          <Button
            className="h-11 rounded-2xl bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
            onClick={() => onSearch({ query, location, beds, maxPrice })}
          >
            Explore listings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
