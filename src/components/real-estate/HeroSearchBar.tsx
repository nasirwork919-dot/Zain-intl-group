import { HeroSearchBarLayout } from "@/components/real-estate/HeroSearchBarLayout";

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
  return <HeroSearchBarLayout value={value} onChange={onChange} onSubmit={onSubmit} />;
}