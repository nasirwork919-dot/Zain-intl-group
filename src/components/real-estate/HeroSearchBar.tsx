import { useState } from "react";

import { HeroSearchBarLayout } from "@/components/real-estate/HeroSearchBarLayout";
import {
  HeroFiltersDropdown,
} from "@/components/real-estate/HeroFiltersDropdown";

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

  return (
    <HeroFiltersDropdown open={filtersOpen} onOpenChange={setFiltersOpen}>
      <HeroSearchBarLayout
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onOpenFilters={() => setFiltersOpen(true)}
      />
    </HeroFiltersDropdown>
  );
}
