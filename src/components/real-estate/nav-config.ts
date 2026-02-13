export type NavCategoryKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more";

export type NavOption = { label: string; slug: string };

export const NAV_OPTIONS: Record<NavCategoryKey, NavOption[]> = {
  buy: [
    { label: "Apartments", slug: "apartments" },
    { label: "Townhouses", slug: "townhouses" },
    { label: "Penthouses", slug: "penthouses" },
    { label: "Villas", slug: "villas" },
    { label: "Offices", slug: "offices" },
    { label: "View All", slug: "all" },
  ],
  rent: [
    { label: "Apartments", slug: "apartments" },
    { label: "Offices", slug: "offices" },
    { label: "Townhouses", slug: "townhouses" },
    { label: "Villas", slug: "villas" },
    { label: "Commercial", slug: "commercial" },
  ],
  communities: [
    { label: "Dubai Marina", slug: "dubai-marina" },
    { label: "Dubai Creek Harbour", slug: "dubai-creek-harbour" },
    { label: "Jumeirah Village Circle (JVC)", slug: "jvc" },
    { label: "Dubai Hills Estate", slug: "dubai-hills" },
    { label: "Jumeirah Beach Residence (JBR)", slug: "jbr" },
    { label: "Palm Jebel Ali", slug: "palm-jebel-ali" },
    { label: "Downtown Dubai", slug: "downtown" },
    { label: "Palm Jumeirah", slug: "palm-jumeirah" },
  ],
  developers: [
    { label: "Emaar", slug: "emaar" },
    { label: "Nakheel", slug: "nakheel" },
    { label: "Danube", slug: "danube" },
    { label: "Select Group", slug: "select-group" },
    { label: "View All Developers", slug: "all" },
  ],
  "featured-projects": [
    { label: "Daily Transaction", slug: "daily-transaction" },
    { label: "Rental Transaction", slug: "rental-transaction" },
    { label: "Sale Transaction", slug: "sale-transaction" },
    { label: "Market Guide", slug: "market-guide" },
  ],
  services: [
    { label: "Selling", slug: "selling" },
    { label: "Buying", slug: "buying" },
    { label: "Leasing", slug: "leasing" },
    { label: "Management", slug: "management" },
    { label: "Legal Assistance", slug: "legal-assistance" },
    { label: "Property Maintenance", slug: "property-maintenance" },
  ],
  more: [
    { label: "About Us", slug: "about" },
    { label: "Careers", slug: "careers" },
    { label: "Reports", slug: "reports" },
    { label: "News", slug: "news" },
    { label: "Blogs", slug: "blogs" },
    { label: "Media", slug: "media" },
  ],
};

export const NAV_LABEL_TO_CATEGORY: Record<string, NavCategoryKey> = {
  // Buy
  Apartments: "buy",
  Townhouses: "buy",
  Penthouses: "buy",
  Villas: "buy",
  "View All": "buy",
  Offices: "buy",

  // Rent
  Commercial: "rent",

  // Developers
  Emaar: "developers",
  Nakheel: "developers",
  Danube: "developers",
  "Select Group": "developers",
  "View All Developers": "developers",

  // Featured Projects
  "Daily Transaction": "featured-projects",
  "Rental Transaction": "featured-projects",
  "Sale Transaction": "featured-projects",
  "Market Guide": "featured-projects",

  // Services
  Selling: "services",
  Buying: "services",
  Leasing: "services",
  Management: "services",
  "Legal Assistance": "services",
  "Property Maintenance": "services",

  // More
  "About Us": "more",
  Careers: "more",
  Reports: "more",
  News: "more",
  Blogs: "more",
  Media: "more",

  // Communities (the mega menu uses these exact strings)
  "Dubai Marina": "communities",
  "Dubai Creek Harbour": "communities",
  "Jumeirah Village Circle (JVC)": "communities",
  "Dubai Hills Estate": "communities",
  "Jumeirah Beach Residence (JBR)": "communities",
  "Palm Jebel Ali": "communities",
  "Downtown Dubai": "communities",
  "Palm Jumeirah": "communities",
};

export function slugifyNavLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/\(|\)/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}
