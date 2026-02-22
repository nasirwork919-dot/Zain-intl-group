import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type DbPropertyRow = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area_sqft: number;
  tag: string | null;
  cover_image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  published: boolean;
  created_at: string;
  updated_at: string;

  listing_type: string;
  property_type: string;
  placements: string[];
  featured: boolean;
};

export type PublicProperty = {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: "AED";
  beds: number;
  baths: number;
  areaSqFt: number;
  tag?: string;
  coverImage: string;
  gallery: string[];
  description: string;
  amenities: string[];

  listingType: "sale" | "rent";
  propertyType: string;
  placements: string[];
  featured: boolean;
};

function mapRowToPublic(row: DbPropertyRow): PublicProperty {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    currency: "AED",
    beds: row.beds,
    baths: row.baths,
    areaSqFt: row.area_sqft,
    tag: row.tag ?? undefined,
    coverImage: row.cover_image,
    gallery: row.gallery ?? [],
    description: row.description,
    amenities: row.amenities ?? [],

    listingType: (row.listing_type as "sale" | "rent") ?? "sale",
    propertyType: row.property_type ?? "apartment",
    placements: row.placements ?? [],
    featured: !!row.featured,
  };
}

export function usePublishedProperties() {
  return useQuery({
    queryKey: ["public-properties", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          "id,title,location,price,beds,baths,area_sqft,tag,cover_image,gallery,description,amenities,published,created_at,updated_at,listing_type,property_type,placements,featured",
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      const rows = (data ?? []) as DbPropertyRow[];
      return rows.map(mapRowToPublic);
    },
  });
}