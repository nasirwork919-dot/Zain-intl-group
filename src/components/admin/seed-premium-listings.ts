import { supabase } from "@/integrations/supabase/client";

type SeedListing = {
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
  listing_type: "sale" | "rent";
  property_type:
    | "apartment"
    | "villa"
    | "townhouse"
    | "penthouse"
    | "office"
    | "commercial"
    | "land"
    | "other";
  placements: string[];
  featured: boolean;
};

const LUXURY_SEED: SeedListing[] = [
  {
    title: "Skyline Signature Penthouse · Burj Views",
    location: "Downtown Dubai",
    price: 16500000,
    beds: 4,
    baths: 5,
    area_sqft: 5200,
    tag: "Luxury",
    cover_image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "A statement penthouse above the city with expansive terraces, curated finishes, and full skyline framing. Designed for entertaining with a chef-grade kitchen, private lift lobby, and bright, gallery-like interiors.",
    amenities: [
      "Private terrace",
      "Concierge",
      "Residents-only pool",
      "Gym & sauna",
      "Private parking",
    ],
    published: true,
    listing_type: "sale",
    property_type: "penthouse",
    placements: ["buy", "featured", "featured-projects"],
    featured: true,
  },
  {
    title: "Palm Jumeirah Waterfront Villa · Private Pool",
    location: "Palm Jumeirah",
    price: 42000000,
    beds: 6,
    baths: 7,
    area_sqft: 8200,
    tag: "Waterfront",
    cover_image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "Ultra-private waterfront villa with resort-grade outdoor living, direct beach access, and refined interiors. Ideal for end-users seeking a landmark address and long-term lifestyle value.",
    amenities: [
      "Private pool",
      "Direct beach access",
      "Landscaped garden",
      "Maid’s room",
      "Gated community",
    ],
    published: true,
    listing_type: "sale",
    property_type: "villa",
    placements: ["buy", "communities", "featured"],
    featured: true,
  },
  {
    title: "Dubai Marina 3BR Residence · Full Sea View",
    location: "Dubai Marina",
    price: 7800000,
    beds: 3,
    baths: 4,
    area_sqft: 2600,
    tag: "Prime",
    cover_image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "A bright, waterfront home with full-height glazing, sunrise views, and a prime address steps from dining and beach access. Balanced layout, premium finishes, and strong end-user appeal.",
    amenities: [
      "Infinity pool",
      "Valet parking",
      "Gym",
      "Concierge",
      "Private parking",
    ],
    published: true,
    listing_type: "sale",
    property_type: "apartment",
    placements: ["buy", "featured", "communities"],
    featured: true,
  },
  {
    title: "Business Bay Canal Loft · Double-Height Living",
    location: "Business Bay",
    price: 1950000,
    beds: 1,
    baths: 2,
    area_sqft: 980,
    tag: "Investor Pick",
    cover_image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "A high-ceiling loft with canal views and a walkable, central address. Excellent for yield-driven buyers with premium amenities and fast Downtown connectivity.",
    amenities: [
      "Canal promenade",
      "Rooftop pool",
      "Co-working lounge",
      "Gym",
      "Concierge",
    ],
    published: true,
    listing_type: "sale",
    property_type: "apartment",
    placements: ["buy", "featured-projects"],
    featured: false,
  },
  {
    title: "Dubai Hills Estate Family Villa · Garden Courtyard",
    location: "Dubai Hills Estate",
    price: 9800000,
    beds: 5,
    baths: 6,
    area_sqft: 6100,
    tag: "Family",
    cover_image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "A calm, spacious villa with indoor-outdoor flow, shaded courtyard seating, and a quiet community feel near schools and golf. Perfect for long-term family living.",
    amenities: [
      "Private garden",
      "Two-car garage",
      "Community park",
      "24/7 security",
      "Clubhouse access",
    ],
    published: true,
    listing_type: "sale",
    property_type: "villa",
    placements: ["buy", "communities", "featured"],
    featured: true,
  },
  {
    title: "Downtown 2BR · Boulevard Access · High Floor (Rent)",
    location: "Downtown Dubai",
    price: 320000,
    beds: 2,
    baths: 2,
    area_sqft: 1350,
    tag: "Ready",
    cover_image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "High-floor 2BR with clean finishes and immediate Boulevard access. Move-in ready with excellent walkability to Dubai Mall and top-tier dining.",
    amenities: [
      "Direct mall access",
      "Residents pool",
      "Gym",
      "24/7 security",
      "Concierge",
    ],
    published: true,
    listing_type: "rent",
    property_type: "apartment",
    placements: ["rent", "featured"],
    featured: true,
  },
  {
    title: "Dubai Marina 2BR · Furnished · Waterfront Lifestyle (Rent)",
    location: "Dubai Marina",
    price: 260000,
    beds: 2,
    baths: 2,
    area_sqft: 1280,
    tag: "Waterfront",
    cover_image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "Premium furnished 2BR in Dubai Marina with a bright layout and waterfront access. Ideal for tenants seeking a lifestyle address with amenities and connectivity.",
    amenities: ["Furnished", "Pool deck", "Gym", "Concierge", "Covered parking"],
    published: true,
    listing_type: "rent",
    property_type: "apartment",
    placements: ["rent", "communities"],
    featured: false,
  },
  {
    title: "Business Bay Office · Grade A · Flexible Layout (Rent)",
    location: "Business Bay",
    price: 540000,
    beds: 0,
    baths: 1,
    area_sqft: 2100,
    tag: "New",
    cover_image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=85",
      "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2400&q=85",
    ],
    description:
      "Grade A office in Business Bay with flexible planning, strong natural light, and premium tower amenities — positioned for teams that want a central address.",
    amenities: [
      "Reception",
      "Visitor parking",
      "24/7 security",
      "High-speed elevators",
      "Nearby metro",
    ],
    published: true,
    listing_type: "rent",
    property_type: "office",
    placements: ["rent"],
    featured: false,
  },
];

export async function seedPremiumListings() {
  const titles = LUXURY_SEED.map((x) => x.title);

  const { data: existing, error: existingError } = await supabase
    .from("properties")
    .select("id,title")
    .in("title", titles);

  if (existingError) throw existingError;

  const existingTitles = new Set((existing ?? []).map((r) => r.title));
  const toInsert = LUXURY_SEED.filter((x) => !existingTitles.has(x.title));

  if (toInsert.length === 0) {
    return { inserted: 0 };
  }

  const { error: insertError } = await supabase.from("properties").insert(toInsert);
  if (insertError) throw insertError;

  return { inserted: toInsert.length };
}