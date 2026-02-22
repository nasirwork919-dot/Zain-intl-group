import { useMemo } from "react";

import { usePublishedProperties } from "@/hooks/use-published-properties";

export type InventoryNavOption = { label: string; slug: string };

function slugify(v: string) {
  return v
    .trim()
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/\(|\)/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function normalizePropertyTypeLabel(t: string) {
  const v = (t ?? "").trim().toLowerCase();
  if (!v) return "Other";
  if (v === "apartment") return "Apartments";
  if (v === "villa") return "Villas";
  if (v === "townhouse") return "Townhouses";
  if (v === "penthouse") return "Penthouses";
  if (v === "office") return "Offices";
  if (v === "commercial") return "Commercial";
  if (v === "land") return "Land";
  return titleCaseFromSlug(slugify(v));
}

export function useNavInventory() {
  const { data: all = [], isLoading } = usePublishedProperties();

  return useMemo(() => {
    const sale = all.filter((p) => p.listingType === "sale");
    const rent = all.filter((p) => p.listingType === "rent");

    const buyTypes = Array.from(
      new Set(sale.map((p) => normalizePropertyTypeLabel(p.propertyType))),
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    const rentTypes = Array.from(
      new Set(rent.map((p) => normalizePropertyTypeLabel(p.propertyType))),
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    const communities = Array.from(new Set(all.map((p) => p.location)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    const toOptions = (labels: string[]): InventoryNavOption[] =>
      labels.map((label) => ({ label, slug: slugify(label) }));

    const buyOptions = toOptions(buyTypes);
    const rentOptions = toOptions(rentTypes);
    const communityOptions = toOptions(communities);

    return {
      isLoading,
      hasAnyInventory: all.length > 0,

      buyOptions,
      rentOptions,
      communityOptions,

      buyCount: sale.length,
      rentCount: rent.length,
      communitiesCount: communities.length,
    };
  }, [all, isLoading]);
}