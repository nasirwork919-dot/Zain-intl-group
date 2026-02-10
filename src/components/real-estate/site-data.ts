export type Property = {
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
};

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Listings", href: "#listings" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const featuredStats = [
  { label: "Active Listings", value: "240+" },
  { label: "Luxury Projects", value: "18" },
  { label: "Client Satisfaction", value: "4.9/5" },
] as const;

export const featuredProperties: Property[] = [
  {
    id: "p1",
    title: "Palm-view Signature Apartment",
    location: "Dubai Marina",
    price: 2650000,
    currency: "AED",
    beds: 2,
    baths: 2,
    areaSqFt: 1410,
    tag: "Hot Deal",
    coverImage:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A bright, modern home with a resort-grade amenity deck and direct access to waterfront dining. Designed for effortless city living with high ceilings and full-height glazing.",
    amenities: [
      "Infinity pool",
      "Gym & sauna",
      "Concierge",
      "Private parking",
      "Smart access",
    ],
  },
  {
    id: "p2",
    title: "Downtown Skyline Penthouse",
    location: "Downtown Dubai",
    price: 11900000,
    currency: "AED",
    beds: 4,
    baths: 5,
    areaSqFt: 4100,
    tag: "New",
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    ],
    description:
      "A statement residence above the city: expansive terraces, curated finishes, and panoramic skyline views. Perfect for entertaining with a chef’s kitchen and private lift lobby.",
    amenities: [
      "Sky lounge",
      "Private terrace",
      "Valet",
      "Cinema room",
      "Residents-only pool",
    ],
  },
  {
    id: "p3",
    title: "Family Villa with Garden Courtyard",
    location: "Dubai Hills Estate",
    price: 7350000,
    currency: "AED",
    beds: 5,
    baths: 6,
    areaSqFt: 5200,
    tag: "Ready",
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
    ],
    description:
      "A calm, spacious villa with indoor-outdoor flow, shaded courtyard seating, and a quiet community feel minutes from top schools and golf.",
    amenities: [
      "Private garden",
      "Maid’s room",
      "Two-car garage",
      "Community park",
      "24/7 security",
    ],
  },

  {
    id: "p4",
    title: "Business Bay Canal-view Loft",
    location: "Business Bay",
    price: 1890000,
    currency: "AED",
    beds: 1,
    baths: 2,
    areaSqFt: 980,
    tag: "Investor Pick",
    coverImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A double-height loft with canal views and a walkable, central address. Ideal for short-term yields with premium building amenities and easy Downtown access.",
    amenities: [
      "Canal promenade",
      "Rooftop pool",
      "Co-working lounge",
      "Concierge",
      "Gym",
    ],
  },
  {
    id: "p5",
    title: "JVC Modern Townhouse Cluster",
    location: "Jumeirah Village Circle",
    price: 2480000,
    currency: "AED",
    beds: 3,
    baths: 4,
    areaSqFt: 2250,
    tag: "Family",
    coverImage:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A quiet townhouse pocket with generous living space, upgraded finishes, and easy access to parks, schools, and neighborhood retail — made for day-to-day comfort.",
    amenities: [
      "Community pool",
      "Kids play area",
      "Private patio",
      "Covered parking",
      "Security",
    ],
  },
  {
    id: "p6",
    title: "Marina Waterfront 3BR Residence",
    location: "Dubai Marina",
    price: 5450000,
    currency: "AED",
    beds: 3,
    baths: 4,
    areaSqFt: 2350,
    tag: "Waterfront",
    coverImage:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A spacious waterfront home with full-height glazing, sunrise views, and a prime address steps from marina dining and beach access — perfect for lifestyle buyers.",
    amenities: [
      "Private beach access",
      "Infinity pool",
      "Valet parking",
      "Gym & sauna",
      "Concierge",
    ],
  },
  {
    id: "p7",
    title: "Downtown 2BR with Burj Views",
    location: "Downtown Dubai",
    price: 3920000,
    currency: "AED",
    beds: 2,
    baths: 2,
    areaSqFt: 1320,
    tag: "Prime",
    coverImage:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A bright, efficient 2BR with iconic skyline framing and effortless access to Dubai Mall, the Boulevard, and top-tier dining — a high-demand rental pocket.",
    amenities: [
      "Burj views",
      "Direct mall access",
      "Residents’ pool",
      "Gym",
      "24/7 security",
    ],
  },
  {
    id: "p8",
    title: "Dubai Hills Golf-side Villa",
    location: "Dubai Hills Estate",
    price: 9850000,
    currency: "AED",
    beds: 5,
    baths: 6,
    areaSqFt: 6100,
    tag: "Luxury",
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1800&q=80",
    ],
    description:
      "A golf-side villa with generous entertaining space, shaded terraces, and serene green views — designed for long-term family living with premium community amenities.",
    amenities: [
      "Golf view",
      "Private garden",
      "Maid’s room",
      "Clubhouse access",
      "Gated community",
    ],
  },
];

export const locations = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Jumeirah Village Circle",
  "Dubai Hills Estate",
] as const;