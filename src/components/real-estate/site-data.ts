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
];

export const locations = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Jumeirah Village Circle",
  "Dubai Hills Estate",
] as const;