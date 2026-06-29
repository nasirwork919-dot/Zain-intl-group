import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type IntlRegion = "europe" | "uk" | "pakistan";

export type IntlPropertyRow = {
  id: string;
  title: string;
  location: string;
  country: string;
  region: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  area_sqft: number;
  tag: string | null;
  cover_image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  property_type: string;
  listing_type: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type InternationalProperty = {
  id: string;
  title: string;
  location: string;
  country: string;
  region: IntlRegion;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  areaSqFt: number;
  tag?: string;
  coverImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  propertyType: string;
  listingType: "sale" | "rent";
  featured: boolean;
  published: boolean;
  createdAt: string;
};

function mapRow(row: IntlPropertyRow): InternationalProperty {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    country: row.country,
    region: row.region as IntlRegion,
    price: row.price,
    currency: row.currency,
    beds: row.beds,
    baths: row.baths,
    areaSqFt: row.area_sqft,
    tag: row.tag ?? undefined,
    coverImage: row.cover_image,
    gallery: row.gallery ?? [],
    description: row.description,
    amenities: row.amenities ?? [],
    propertyType: row.property_type ?? "apartment",
    listingType: (row.listing_type as "sale" | "rent") ?? "sale",
    featured: !!row.featured,
    published: !!row.published,
    createdAt: row.created_at,
  };
}

export function useInternationalProperties(region?: IntlRegion) {
  return useQuery({
    queryKey: ["international-properties", region ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("international_properties")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (region) {
        query = query.eq("region", region);
      }

      const { data, error } = await query;
      if (error) throw error;
      return ((data ?? []) as IntlPropertyRow[]).map(mapRow);
    },
  });
}

export function useInternationalPropertyById(id: string) {
  return useQuery({
    queryKey: ["international-property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("international_properties")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (error) throw error;
      return mapRow(data as IntlPropertyRow);
    },
    enabled: !!id,
  });
}

export function useAllInternationalPropertiesAdmin() {
  return useQuery({
    queryKey: ["admin-international-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("international_properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as IntlPropertyRow[];
    },
  });
}

export function formatIntlPrice(price: number, currency: string): string {
  const symbols: Record<string, string> = {
    GBP: "£",
    EUR: "€",
    PKR: "₨",
    USD: "$",
    AED: "AED",
  };
  const sym = symbols[currency] ?? currency;
  if (price >= 1_000_000) return `${sym}${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${sym}${(price / 1_000).toFixed(0)}K`;
  return `${sym}${price.toLocaleString()}`;
}
