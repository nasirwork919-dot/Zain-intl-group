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

// Light, premium-feeling imagery set (bright exposures, minimal dark overlays elsewhere in UI).
const IMAGES = {
  hero: {
    buy: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=3200&q=82",
    rent: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=3200&q=82",
    communities:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3200&q=82",
    developers:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3200&q=82",
    featured:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3200&q=82",
    services:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=3200&q=82",
    more: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=3200&q=82",
  },
  buy: {
    residential:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
    offplan:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    commercial:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
    options: {
      apartments:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=82",
      townhouses:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=82",
      penthouses:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=82",
      villas:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
      offices:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
      all: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
  },
  rent: {
    residential:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=82",
    commercial:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    options: {
      apartments:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=82",
      townhouses:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=82",
      villas:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
      offices:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
      commercial:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
      all: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
  },
  communities: {
    lifestyle:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
    topareas:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
    options: {
      waterfront:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
      family:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=82",
      luxury:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=82",
      "dubai-marina":
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
      "downtown-dubai":
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
      "dubai-hills-estate":
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=82",
      jvc: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
      all: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
    },
  },
  developers: {
    top: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
    segment:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=82",
    options: {
      emaar:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
      nakheel:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
      danube:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
      "select-group":
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
      luxury:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=82",
      investor:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
      family:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=82",
      all: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
    },
  },
  featured: {
    reports:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    highlights:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=82",
    options: {
      "daily-transaction":
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=82",
      "rental-transaction":
        "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=82",
      "sale-transaction":
        "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=2200&q=82",
      "market-guide":
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2200&q=82",
      "new-launches":
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
      "ready-units":
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
      "investor-picks":
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
      all: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
  },
  services: {
    sales:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=82",
    leasing:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    support:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2200&q=82",
    options: {
      selling:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=82",
      buying:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
      leasing:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
      management:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2200&q=82",
      "legal-assistance":
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
      "property-maintenance":
        "https://images.unsplash.com/photo-1581579188871-936a3fce3fce?auto=format&fit=crop&w=2200&q=82",
    },
  },
  more: {
    company:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    content:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    options: {
      "about-us":
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
      careers:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
      reports:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=82",
      news: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
      blogs:
        "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=82",
      media:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2200&q=82",
    },
  },
} as const;

export const NAV_FEATURES: Record<NavCategoryKey, NavCategoryFeaturesConfig> = {
  buy: {
    title: "Buy",
    eyebrow: "Find your next home",
    description:
      "Choose a lane first — then explore listings with a clean, filter-first experience.",
    heroImage: IMAGES.hero.buy,
    features: [
      {
        key: "residential",
        title: "Residential",
        eyebrow: "Buy",
        description: "Apartments, townhouses, penthouses, and villas.",
        image: IMAGES.buy.residential,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "High-demand towers and lifestyle-led communities.",
            image: IMAGES.buy.options.apartments,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Family-friendly layouts with community amenities.",
            image: IMAGES.buy.options.townhouses,
          },
          {
            label: "Penthouses",
            slug: "penthouses",
            description: "Skyline views, premium finishes, landmark addresses.",
            image: IMAGES.buy.options.penthouses,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Space, privacy, and long-term lifestyle value.",
            image: IMAGES.buy.options.villas,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all residential inventory in one place.",
            image: IMAGES.buy.options.all,
          },
        ],
      },
      {
        key: "off-plan",
        title: "Off Plan",
        eyebrow: "Buy",
        description: "Launches, payment plans, and completion timelines.",
        image: IMAGES.buy.offplan,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "New releases across Marina, Downtown, and beyond.",
            image: IMAGES.buy.options.apartments,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Community-first clusters with flexible plans.",
            image: IMAGES.buy.options.townhouses,
          },
          {
            label: "Penthouses",
            slug: "penthouses",
            description: "Limited inventory, best-in-class views and layouts.",
            image: IMAGES.buy.options.penthouses,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Long-horizon lifestyle builds in premium districts.",
            image: IMAGES.buy.options.villas,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all off-plan options in one place.",
            image: IMAGES.buy.options.all,
          },
        ],
      },
      {
        key: "commercial",
        title: "Commercial",
        eyebrow: "Buy",
        description: "Offices and business-ready opportunities.",
        image: IMAGES.buy.commercial,
        options: [
          {
            label: "Offices",
            slug: "offices",
            description: "Prime towers, flexible sizes, central districts.",
            image: IMAGES.buy.options.offices,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all commercial inventory.",
            image: IMAGES.buy.options.all,
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
    heroImage: IMAGES.hero.rent,
    features: [
      {
        key: "residential",
        title: "Residential",
        eyebrow: "Rent",
        description: "Apartments, townhouses, and villas — ready to move.",
        image: IMAGES.rent.residential,
        options: [
          {
            label: "Apartments",
            slug: "apartments",
            description: "Downtown convenience, Marina lifestyle, and more.",
            image: IMAGES.rent.options.apartments,
          },
          {
            label: "Townhouses",
            slug: "townhouses",
            description: "Community living with extra space.",
            image: IMAGES.rent.options.townhouses,
          },
          {
            label: "Villas",
            slug: "villas",
            description: "Privacy, gardens, and long-term comfort.",
            image: IMAGES.rent.options.villas,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all residential rentals.",
            image: IMAGES.rent.options.all,
          },
        ],
      },
      {
        key: "commercial",
        title: "Commercial",
        eyebrow: "Rent",
        description: "Work-ready spaces across key districts.",
        image: IMAGES.rent.commercial,
        options: [
          {
            label: "Offices",
            slug: "offices",
            description: "Flexible sizes, prime towers, central addresses.",
            image: IMAGES.rent.options.offices,
          },
          {
            label: "Commercial",
            slug: "commercial",
            description: "Retail and mixed-use opportunities.",
            image: IMAGES.rent.options.commercial,
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all commercial rentals.",
            image: IMAGES.rent.options.all,
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
    heroImage: IMAGES.hero.communities,
    features: [
      {
        key: "by-lifestyle",
        title: "Browse by Lifestyle",
        eyebrow: "Communities",
        description: "Waterfront, family-first, luxury, and more.",
        image: IMAGES.communities.lifestyle,
        options: [
          {
            label: "Waterfront Living",
            slug: "waterfront",
            description: "Marina, canals, and skyline views.",
            image: IMAGES.communities.options.waterfront,
          },
          {
            label: "Family Living",
            slug: "family",
            description: "Parks, schools, and community amenities.",
            image: IMAGES.communities.options.family,
          },
          {
            label: "Luxury Living",
            slug: "luxury",
            description: "Landmark addresses and premium finishes.",
            image: IMAGES.communities.options.luxury,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all communities.",
            image: IMAGES.communities.options.all,
          },
        ],
      },
      {
        key: "top-areas",
        title: "Top Areas",
        eyebrow: "Communities",
        description: "Most searched destinations in Dubai.",
        image: IMAGES.communities.topareas,
        options: [
          {
            label: "Dubai Marina",
            slug: "dubai-marina",
            description: "Waterfront lifestyle & dining.",
            image: IMAGES.communities.options["dubai-marina"],
          },
          {
            label: "Downtown Dubai",
            slug: "downtown-dubai",
            description: "Landmarks, walkability, and prime access.",
            image: IMAGES.communities.options["downtown-dubai"],
          },
          {
            label: "Dubai Hills Estate",
            slug: "dubai-hills-estate",
            description: "Family-first green district.",
            image: IMAGES.communities.options["dubai-hills-estate"],
          },
          {
            label: "JVC",
            slug: "jvc",
            description: "Value + community convenience.",
            image: IMAGES.communities.options.jvc,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all top areas.",
            image: IMAGES.communities.options.all,
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
    heroImage: IMAGES.hero.developers,
    features: [
      {
        key: "top-developers",
        title: "Top Developers",
        eyebrow: "Developers",
        description: "Start with the names buyers search most.",
        image: IMAGES.developers.top,
        options: [
          {
            label: "Emaar",
            slug: "emaar",
            description: "Downtown icons and master communities.",
            image: IMAGES.developers.options.emaar,
          },
          {
            label: "Nakheel",
            slug: "nakheel",
            description: "Palm projects and coastal districts.",
            image: IMAGES.developers.options.nakheel,
          },
          {
            label: "Danube",
            slug: "danube",
            description: "Value-led launches and payment plans.",
            image: IMAGES.developers.options.danube,
          },
          {
            label: "Select Group",
            slug: "select-group",
            description: "Premium towers and waterfront living.",
            image: IMAGES.developers.options["select-group"],
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse all developers.",
            image: IMAGES.developers.options.all,
          },
        ],
      },
      {
        key: "by-segment",
        title: "Browse by Segment",
        eyebrow: "Developers",
        description: "A simple starting point by buyer intent.",
        image: IMAGES.developers.segment,
        options: [
          {
            label: "Luxury",
            slug: "luxury",
            description: "Signature projects and high-end finishes.",
            image: IMAGES.developers.options.luxury,
          },
          {
            label: "Investor-friendly",
            slug: "investor",
            description: "Rental yield pockets and demand-led areas.",
            image: IMAGES.developers.options.investor,
          },
          {
            label: "Family-first",
            slug: "family",
            description: "Schools, parks, and community living.",
            image: IMAGES.developers.options.family,
          },
          {
            label: "View All",
            slug: "all",
            description: "See all segments.",
            image: IMAGES.developers.options.all,
          },
        ],
      },
    ],
  },

  "featured-projects": {
    title: "Featured Projects",
    eyebrow: "Market pulse",
    description: "Trends, guides, and featured launches — curated and clear.",
    heroImage: IMAGES.hero.featured,
    features: [
      {
        key: "reports",
        title: "Reports & Guides",
        eyebrow: "Featured Projects",
        description: "Market snapshots that help you decide faster.",
        image: IMAGES.featured.reports,
        options: [
          {
            label: "Daily Transaction",
            slug: "daily-transaction",
            description: "Day-by-day market activity highlights.",
            image: IMAGES.featured.options["daily-transaction"],
          },
          {
            label: "Rental Transaction",
            slug: "rental-transaction",
            description: "Rental movement and demand zones.",
            image: IMAGES.featured.options["rental-transaction"],
          },
          {
            label: "Sale Transaction",
            slug: "sale-transaction",
            description: "Sale velocity and pricing signals.",
            image: IMAGES.featured.options["sale-transaction"],
          },
          {
            label: "Market Guide",
            slug: "market-guide",
            description: "A clean, buyer-friendly market overview.",
            image: IMAGES.featured.options["market-guide"],
          },
        ],
      },
      {
        key: "highlights",
        title: "Highlights",
        eyebrow: "Featured Projects",
        description: "Quick discovery starting points.",
        image: IMAGES.featured.highlights,
        options: [
          {
            label: "New Launches",
            slug: "new-launches",
            description: "Fresh inventory and early access.",
            image: IMAGES.featured.options["new-launches"],
          },
          {
            label: "Ready Units",
            slug: "ready-units",
            description: "Move-in ready options.",
            image: IMAGES.featured.options["ready-units"],
          },
          {
            label: "Investor Picks",
            slug: "investor-picks",
            description: "High-demand, yield-friendly pockets.",
            image: IMAGES.featured.options["investor-picks"],
          },
          {
            label: "View All",
            slug: "all",
            description: "Browse everything featured.",
            image: IMAGES.featured.options.all,
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
    heroImage: IMAGES.hero.services,
    features: [
      {
        key: "sales",
        title: "Sales",
        eyebrow: "Services",
        description: "Everything you need to buy or sell smoothly.",
        image: IMAGES.services.sales,
        options: [
          {
            label: "Selling",
            slug: "selling",
            description: "Pricing, marketing, and buyer qualification.",
            image: IMAGES.services.options.selling,
          },
          {
            label: "Buying",
            slug: "buying",
            description: "Shortlists, viewings, and negotiation support.",
            image: IMAGES.services.options.buying,
          },
        ],
      },
      {
        key: "leasing-management",
        title: "Leasing & Management",
        eyebrow: "Services",
        description: "Hands-off ownership with clear reporting.",
        image: IMAGES.services.leasing,
        options: [
          {
            label: "Leasing",
            slug: "leasing",
            description: "Tenant sourcing, contracts, renewals.",
            image: IMAGES.services.options.leasing,
          },
          {
            label: "Management",
            slug: "management",
            description: "Maintenance coordination and owner reporting.",
            image: IMAGES.services.options.management,
          },
        ],
      },
      {
        key: "support",
        title: "Owner Support",
        eyebrow: "Services",
        description: "Extra services that remove friction.",
        image: IMAGES.services.support,
        options: [
          {
            label: "Legal Assistance",
            slug: "legal-assistance",
            description: "Guidance for documentation and compliance.",
            image: IMAGES.services.options["legal-assistance"],
          },
          {
            label: "Property Maintenance",
            slug: "property-maintenance",
            description: "Trusted vendors and ongoing upkeep.",
            image: IMAGES.services.options["property-maintenance"],
          },
        ],
      },
    ],
  },

  more: {
    title: "More",
    eyebrow: "Company & resources",
    description: "Browse company pages, content, and resources.",
    heroImage: IMAGES.hero.more,
    features: [
      {
        key: "company",
        title: "Company",
        eyebrow: "More",
        description: "Learn about the team and opportunities.",
        image: IMAGES.more.company,
        options: [
          {
            label: "About Us",
            slug: "about-us",
            description: "Our approach, values, and focus.",
            image: IMAGES.more.options["about-us"],
          },
          {
            label: "Careers",
            slug: "careers",
            description: "Join the team.",
            image: IMAGES.more.options.careers,
          },
        ],
      },
      {
        key: "content",
        title: "Content",
        eyebrow: "More",
        description: "News and resources you can skim quickly.",
        image: IMAGES.more.content,
        options: [
          {
            label: "Reports",
            slug: "reports",
            description: "Market summaries and guides.",
            image: IMAGES.more.options.reports,
          },
          {
            label: "News",
            slug: "news",
            description: "Updates and announcements.",
            image: IMAGES.more.options.news,
          },
          {
            label: "Blogs",
            slug: "blogs",
            description: "Buyer tips and area highlights.",
            image: IMAGES.more.options.blogs,
          },
          {
            label: "Media",
            slug: "media",
            description: "Press and brand assets.",
            image: IMAGES.more.options.media,
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