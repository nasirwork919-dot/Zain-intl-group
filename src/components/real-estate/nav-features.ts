export type NavCategoryKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more";

export type NavFeatureKey = string;

export type NavFeatureOption = {
  label: string;
  slug: string;
  description: string;
  image: string;
};

export type NavFeature = {
  key: NavFeatureKey;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  options: NavFeatureOption[];
};

export type NavCategoryFeaturesConfig = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  features: NavFeature[];
};

const LIGHT_IMAGE = "/placeholder.svg";

export const NAV_FEATURES: Record<NavCategoryKey, NavCategoryFeaturesConfig> = {
  buy: {
    title: "Buy",
    eyebrow: "Find your next home",
    description:
      "Choose a lane first — then explore listings with a clean, filter-first experience.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "residential",
        title: "Residential",
        eyebrow: "Buy",
        description: "Apartments, townhouses, penthouses, and villas.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "High-demand towers and lifestyle-led communities.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Family-friendly layouts with community amenities.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Penthouses",
            slug: "penthouses",
            description: "Skyline views, premium finishes, landmark addresses.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Space, privacy, and long-term lifestyle value.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all residential inventory in one place.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "off-plan",
        title: "Off Plan",
        eyebrow: "Buy",
        description: "Launches, payment plans, and completion timelines.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "New releases across Marina, Downtown, and beyond.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Community-first clusters with flexible plans.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Penthouses",
            slug: "penthouses",
            description: "Limited inventory, best-in-class views and layouts.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Long-horizon lifestyle builds in premium districts.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all off-plan options in one place.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "commercial",
        title: "Commercial",
        eyebrow: "Buy",
        description: "Offices and business-ready opportunities.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Offices",
            slug: "offices",
            description: "Prime towers, flexible sizes, central districts.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all commercial inventory.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  rent: {
    title: "Rent",
    eyebrow: "Flexible living, premium locations",
    description:
      "Pick a lane — then browse rental-ready homes with clear filters and quick next steps.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "residential",
        title: "Residential",
        eyebrow: "Rent",
        description: "Apartments, townhouses, and villas — ready to move.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "Downtown convenience, Marina lifestyle, and more.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Community living with extra space.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Privacy, gardens, and long-term comfort.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all residential rentals.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "commercial",
        title: "Commercial",
        eyebrow: "Rent",
        description: "Work-ready spaces across key districts.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Offices",
            slug: "offices",
            description: "Flexible sizes, prime towers, central addresses.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Commercial",
            slug: "commercial",
            description: "Retail and mixed-use opportunities.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all commercial rentals.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  communities: {
    title: "Communities",
    eyebrow: "Neighborhood discovery",
    description:
      "Explore Dubai’s most in-demand communities by lifestyle and location.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "by-lifestyle",
        title: "Browse by Lifestyle",
        eyebrow: "Communities",
        description: "Waterfront, family-first, luxury, and more.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Waterfront Living",
            slug: "waterfront",
            description: "Marina, canals, and skyline views.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Family Living",
            slug: "family",
            description: "Parks, schools, and community amenities.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Luxury Living",
            slug: "luxury",
            description: "Landmark addresses and premium finishes.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all communities.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "top-areas",
        title: "Top Areas",
        eyebrow: "Communities",
        description: "Most searched destinations in Dubai.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Dubai Marina",
            slug: "dubai-marina",
            description: "Waterfront lifestyle & dining.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Downtown Dubai",
            slug: "downtown-dubai",
            description: "Landmarks, walkability, and prime access.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Dubai Hills Estate",
            slug: "dubai-hills-estate",
            description: "Family-first green district.",
            image: LIGHT_IMAGE,
          },
          {
            label: "JVC",
            slug: "jvc",
            description: "Value + community convenience.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all top areas.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  developers: {
    title: "Developers",
    eyebrow: "Developer-led opportunities",
    description:
      "Explore projects from Dubai’s top developers with a launch-style experience.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "top-developers",
        title: "Top Developers",
        eyebrow: "Developers",
        description: "Start with the names buyers search most.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Emaar",
            slug: "emaar",
            description: "Downtown icons and master communities.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Nakheel",
            slug: "nakheel",
            description: "Palm projects and coastal districts.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Danube",
            slug: "danube",
            description: "Value-led launches and payment plans.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Select Group",
            slug: "select-group",
            description: "Premium towers and waterfront living.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all developers.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "by-segment",
        title: "Browse by Segment",
        eyebrow: "Developers",
        description: "A simple starting point by buyer intent.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Luxury",
            slug: "luxury",
            description: "Signature projects and high-end finishes.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Investor-friendly",
            slug: "investor",
            description: "Rental yield pockets and demand-led areas.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Family-first",
            slug: "family",
            description: "Schools, parks, and community living.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all segments.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  "featured-projects": {
    title: "Featured Projects",
    eyebrow: "Market pulse",
    description: "Trends, guides, and featured launches — curated and clear.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "reports",
        title: "Reports & Guides",
        eyebrow: "Featured Projects",
        description: "Market snapshots that help you decide faster.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Daily Transaction",
            slug: "daily-transaction",
            description: "Day-by-day market activity highlights.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Rental Transaction",
            slug: "rental-transaction",
            description: "Rental movement and demand zones.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Sale Transaction",
            slug: "sale-transaction",
            description: "Sale velocity and pricing signals.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Market Guide",
            slug: "market-guide",
            description: "A clean, buyer-friendly market overview.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "highlights",
        title: "Highlights",
        eyebrow: "Featured Projects",
        description: "Quick discovery starting points.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "New Launches",
            slug: "new-launches",
            description: "Fresh inventory and early access.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Ready Units",
            slug: "ready-units",
            description: "Move-in ready options.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Investor Picks",
            slug: "investor-picks",
            description: "High-demand, yield-friendly pockets.",
            image: LIGHT_IMAGE,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse everything featured.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  services: {
    title: "Services",
    eyebrow: "Full-service real estate",
    description:
      "From listing to handover — premium support across sales, leasing, and more.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "sales",
        title: "Sales",
        eyebrow: "Services",
        description: "Everything you need to buy or sell smoothly.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Selling",
            slug: "selling",
            description: "Pricing, marketing, and buyer qualification.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Buying",
            slug: "buying",
            description: "Shortlists, viewings, and negotiation support.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "leasing-management",
        title: "Leasing & Management",
        eyebrow: "Services",
        description: "Hands-off ownership with clear reporting.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Leasing",
            slug: "leasing",
            description: "Tenant sourcing, contracts, renewals.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Management",
            slug: "management",
            description: "Maintenance coordination and owner reporting.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "support",
        title: "Owner Support",
        eyebrow: "Services",
        description: "Extra services that remove friction.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Legal Assistance",
            slug: "legal-assistance",
            description: "Guidance for documentation and compliance.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Property Maintenance",
            slug: "property-maintenance",
            description: "Trusted vendors and ongoing upkeep.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },

  more: {
    title: "More",
    eyebrow: "Company & resources",
    description: "Browse company pages, content, and resources.",
    heroImage: LIGHT_IMAGE,
    features: [
      {
        key: "company",
        title: "Company",
        eyebrow: "More",
        description: "Learn about the team and opportunities.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "About Us",
            slug: "about-us",
            description: "Our approach, values, and focus.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Careers",
            slug: "careers",
            description: "Join the team.",
            image: LIGHT_IMAGE,
          },
        ],
      },
      {
        key: "content",
        title: "Content",
        eyebrow: "More",
        description: "News and resources you can skim quickly.",
        image: LIGHT_IMAGE,
        options: [
          {
            label: "Reports",
            slug: "reports",
            description: "Market summaries and guides.",
            image: LIGHT_IMAGE,
          },
          {
            label: "News",
            slug: "news",
            description: "Updates and announcements.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Blogs",
            slug: "blogs",
            description: "Buyer tips and area highlights.",
            image: LIGHT_IMAGE,
          },
          {
            label: "Media",
            slug: "media",
            description: "Press and brand assets.",
            image: LIGHT_IMAGE,
          },
        ],
      },
    ],
  },
};

export function getCategoryConfig(category: string | undefined) {
  return (NAV_FEATURES as Record<string, NavCategoryFeaturesConfig>)[
    category ?? ""
  ] as NavCategoryFeaturesConfig | undefined;
}

export function getFeatureConfig(category: string | undefined, feature: string) {
  const cat = getCategoryConfig(category);
  if (!cat) return undefined;
  return cat.features.find((f) => f.key === feature);
}