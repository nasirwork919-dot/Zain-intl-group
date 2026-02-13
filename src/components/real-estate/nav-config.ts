export type NavCategoryKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more";

export type NavOption = { label: string; slug: string; image?: string };

export const NAV_OPTIONS: Record<NavCategoryKey, NavOption[]> = {
  buy: [
    {
      label: "Apartments",
      slug: "apartments",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Townhouses",
      slug: "townhouses",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Penthouses",
      slug: "penthouses",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Villas",
      slug: "villas",
      image:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Offices",
      slug: "offices",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "View All",
      slug: "all",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  rent: [
    {
      label: "Apartments",
      slug: "apartments",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Offices",
      slug: "offices",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Townhouses",
      slug: "townhouses",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Villas",
      slug: "villas",
      image:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Commercial",
      slug: "commercial",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  communities: [
    {
      label: "Dubai Marina",
      slug: "dubai-marina",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Dubai Creek Harbour",
      slug: "dubai-creek-harbour",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Jumeirah Village Circle (JVC)",
      slug: "jvc",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Dubai Hills Estate",
      slug: "dubai-hills",
      image:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Jumeirah Beach Residence (JBR)",
      slug: "jbr",
      image:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Palm Jebel Ali",
      slug: "palm-jebel-ali",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Downtown Dubai",
      slug: "downtown",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Palm Jumeirah",
      slug: "palm-jumeirah",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  developers: [
    {
      label: "Emaar",
      slug: "emaar",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Nakheel",
      slug: "nakheel",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Danube",
      slug: "danube",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Select Group",
      slug: "select-group",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "View All Developers",
      slug: "all",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  "featured-projects": [
    {
      label: "Daily Transaction",
      slug: "daily-transaction",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Rental Transaction",
      slug: "rental-transaction",
      image:
        "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Sale Transaction",
      slug: "sale-transaction",
      image:
        "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Market Guide",
      slug: "market-guide",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  services: [
    {
      label: "Selling",
      slug: "selling",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Buying",
      slug: "buying",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Leasing",
      slug: "leasing",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Management",
      slug: "management",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Legal Assistance",
      slug: "legal-assistance",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Property Maintenance",
      slug: "property-maintenance",
      image:
        "https://images.unsplash.com/photo-1581579188871-936a3fce3fce?auto=format&fit=crop&w=2200&q=82",
    },
  ],
  more: [
    {
      label: "About Us",
      slug: "about",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Careers",
      slug: "careers",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Reports",
      slug: "reports",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "News",
      slug: "news",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Blogs",
      slug: "blogs",
      image:
        "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=82",
    },
    {
      label: "Media",
      slug: "media",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2200&q=82",
    },
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