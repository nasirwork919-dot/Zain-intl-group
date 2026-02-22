import { useMemo } from "react";

import { usePublishedProperties } from "@/hooks/use-published-properties";

export type NavMenuKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more";

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

function toOptions(labels: string[]): InventoryNavOption[] {
  return labels.map((label) => ({ label, slug: slugify(label) }));
}

function uniqSorted(values: string[]) {
  return Array.from(new Set(values))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function hasPlacement(placements: string[], key: string) {
  return (placements ?? [])
    .map((p) => String(p).toLowerCase().trim())
    .includes(String(key).toLowerCase().trim());
}

function byPlacement<T extends { placements: string[] }>(items: T[], key: string) {
  return items.filter((p) => hasPlacement(p.placements, key));
}

export function useNavMenuInventory() {
  const { data: all = [], isLoading } = usePublishedProperties();

  return useMemo(() => {
    // Core rule:
    // - Buy/Rent menus are based on listingType + (optionally) placement.
    // - All other menus are strictly placement-driven (no guessing).
    const sale = all.filter((p) => p.listingType === "sale");
    const rent = all.filter((p) => p.listingType === "rent");

    const buyInventory = byPlacement(sale, "buy");
    const rentInventory = byPlacement(rent, "rent");

    // If admin didn't apply placements yet, fall back to listing type so the site
    // doesn't appear empty. Once placements are used, it becomes exact.
    const effectiveBuy = buyInventory.length ? buyInventory : sale;
    const effectiveRent = rentInventory.length ? rentInventory : rent;

    const buyTypes = uniqSorted(
      effectiveBuy.map((p) => normalizePropertyTypeLabel(p.propertyType)),
    );
    const rentTypes = uniqSorted(
      effectiveRent.map((p) => normalizePropertyTypeLabel(p.propertyType)),
    );

    const communitiesInventory = byPlacement(all, "communities");
    const communitiesLocations = uniqSorted(
      (communitiesInventory.length ? communitiesInventory : all).map((p) => p.location),
    );

    const developersLocations = uniqSorted(byPlacement(all, "developers").map((p) => p.location));
    const featuredProjectsLocations = uniqSorted(
      byPlacement(all, "featured-projects").map((p) => p.location),
    );
    const servicesLocations = uniqSorted(byPlacement(all, "services").map((p) => p.location));
    const moreLocations = uniqSorted(byPlacement(all, "more").map((p) => p.location));

    const hasBuy = buyTypes.length > 0;
    const hasRent = rentTypes.length > 0;

    const hasCommunities =
      (communitiesInventory.length ? communitiesLocations.length : all.length > 0) &&
      communitiesLocations.length > 0;

    const hasDevelopers = developersLocations.length > 0;
    const hasFeaturedProjects = featuredProjectsLocations.length > 0;
    const hasServices = servicesLocations.length > 0;
    const hasMore = moreLocations.length > 0;

    return {
      isLoading,
      hasAnyInventory: all.length > 0,

      menus: {
        buy: {
          label: "BUY",
          options: toOptions(buyTypes),
          hasAny: hasBuy,
        },
        rent: {
          label: "RENT",
          options: toOptions(rentTypes),
          hasAny: hasRent,
        },
        communities: {
          label: "COMMUNITIES",
          options: toOptions(communitiesLocations),
          hasAny: hasCommunities,
        },
        developers: {
          label: "DEVELOPERS",
          options: toOptions(developersLocations),
          hasAny: hasDevelopers,
        },
        "featured-projects": {
          label: "FEATURED PROJECTS",
          options: toOptions(featuredProjectsLocations),
          hasAny: hasFeaturedProjects,
        },
        services: {
          label: "SERVICES",
          options: toOptions(servicesLocations),
          hasAny: hasServices,
        },
        more: {
          label: "MORE",
          options: toOptions(moreLocations),
          hasAny: hasMore,
        },
      } satisfies Record<
        NavMenuKey,
        { label: string; options: InventoryNavOption[]; hasAny: boolean }
      >,
    };
  }, [all, isLoading]);
}