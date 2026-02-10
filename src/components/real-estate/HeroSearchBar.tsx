import { Search } from "lucide-react";

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

export type HeroBarFilters = {
  operation: "buy" | "rent" | "list";
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
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:gap-4">
        <div className="min-w-[220px]">
          <div className="text-xs font-semibold text-white/80">Operation</div>
          <div className="mt-2">
            <ToggleGroup
              type="single"
              value={value.operation}
              onValueChange={(v) => {
                if (!v) return;
                onChange({ ...value, operation: v as HeroBarFilters["operation"] });
              }}
              className="justify-start rounded-full bg-white/12 p-1 ring-1 ring-white/20 backdrop-blur"
            >
              <ToggleGroupItem
                value="buy"
                className="rounded-full px-4 text-white data-[state=on]:bg-white data-[state=on]:text-[hsl(var(--brand-ink))]"
              >
                Buy
              </ToggleGroupItem>
              <ToggleGroupItem
                value="rent"
                className="rounded-full px-4 text-white data-[state=on]:bg-white data-[state=on]:text-[hsl(var(--brand-ink))]"
              >
                Rent
              </ToggleGroupItem>
              <ToggleGroupItem
                value="list"
                className="rounded-full px-4 text-white data-[state=on]:bg-white data-[state=on]:text-[hsl(var(--brand-ink))]"
              >
                List
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="min-w-[200px]">
          <div className="text-xs font-semibold text-white/80">Property Type</div>
          <Select
            value={value.propertyType}
            onValueChange={(v) =>
              onChange({
                ...value,
                propertyType: v as HeroBarFilters["propertyType"],
              })
            }
          >
            <SelectTrigger className="mt-2 h-12 rounded-full border-white/20 bg-white/12 text-white ring-1 ring-white/15 backdrop-blur focus:ring-2 focus:ring-white/25">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[240px]">
          <div className="text-xs font-semibold text-white/80">
            Find Properties
          </div>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <Input
              value={value.query}
              onChange={(e) => onChange({ ...value, query: e.target.value })}
              placeholder="Search by area or community"
              className="h-12 w-full rounded-full border-white/20 bg-white/12 pl-11 text-white placeholder:text-white/60 ring-1 ring-white/15 backdrop-blur focus-visible:ring-2 focus-visible:ring-white/25"
              onKeyDown={(e) => {
                if (e.key === "Enter") onSubmit();
              }}
            />
          </div>
        </div>

        <div className="lg:min-w-[170px]">
          <div className="sr-only">Quick Search</div>
          <Button
            onClick={onSubmit}
            className="h-12 w-full rounded-full bg-white text-[hsl(var(--brand-ink))] hover:bg-white/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Quick Search
          </Button>
        </div>
      </div>
    </div>
  );
}
