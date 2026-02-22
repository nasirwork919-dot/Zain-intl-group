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
  return Array.from(new Set(values)).filter(Boolean).sort((a, b) => a.localeCompare(b));
}

function hasPlacement(placements: string[], key: string) {
  return (placements ?? []).map((p) => String(p).toLowerCase()).includes(key);
}

export function useNavMenuInventory() {
  const { data: all = [], isLoading } = usePublishedProperties();

  return useMemo(() => {
    const byPlacement = (placement: NavMenuKey) =>
      all.filter((p) => hasPlacement(p.placements, placement));

    const buyBase = all.filter((p) => p.listingType === "sale");
    const rentBase = all.filter((p) => p.listingType === "rent");

    // Buy/Rent dropdowns: show property types that actually exist for that listing type.
    // If placements are used, we also try to respect them (but fall back to listing type).
    const buyTypes = uniqSorted(
      buyBase.map((p) => normalizePropertyTypeLabel(p.propertyType)),
    );
    const rentTypes = uniqSorted(
      rentBase.map((p) => normalizePropertyTypeLabel(p.propertyType)),
    );

    // Communities: list actual locations
    const communityLocations = uniqSorted(all.map((p) => p.location));

    // For the rest (developers/featured-projects/services/more): we don't have
    // dedicated content entities, so we list locations that have listings in that placement.
    const developersLocations = uniqSorted(byPlacement("developers").map((p) => p.location));
    const featuredProjectsLocations = uniqSorted(
      byPlacement("featured-projects").map((p) => p.location),
    );
    const servicesLocations = uniqSorted(byPlacement("services").map((p) => p.location));
    const moreLocations = uniqSorted(byPlacement("more").map((p) => p.location));

    return {
      isLoading,
      hasAnyInventory: all.length > 0,

      menus: {
        buy: {
          label: "BUY",
          options: toOptions(buyTypes),
          hasAny: buyTypes.length > 0,
        },
        rent: {
          label: "RENT",
          options: toOptions(rentTypes),
          hasAny: rentTypes.length > 0,
        },
        communities: {
          label: "COMMUNITIES",
          options: toOptions(communityLocations),
          hasAny: communityLocations.length > 0,
        },
        developers: {
          label: "DEVELOPERS",
          options: toOptions(developersLocations),
          hasAny: developersLocations.length > 0,
        },
        "featured-projects": {
          label: "FEATURED PROJECTS",
          options: toOptions(featuredProjectsLocations),
          hasAny: featuredProjectsLocations.length > 0,
        },
        services: {
          label: "SERVICES",
          options: toOptions(servicesLocations),
          hasAny: servicesLocations.length > 0,
        },
        more: {
          label: "MORE",
          options: toOptions(moreLocations),
          hasAny: moreLocations.length > 0,
        },
      } satisfies Record<NavMenuKey, { label: string; options: InventoryNavOption[]; hasAny: boolean }>,
    };
  }, [all, isLoading]);
}