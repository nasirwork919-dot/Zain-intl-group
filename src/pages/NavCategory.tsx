import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import {
  featuredProperties,
  type Property,
} from "@/components/real-estate/site-data";
import { FeaturedPropertyLaunchCard } from "@/components/real-estate/FeaturedPropertyLaunchCard";
import { FeaturedListingsMobileSlider } from "@/components/real-estate/FeaturedListingsMobileSlider";
import { PropertyDialog } from "@/components/real-estate/PropertyDialog";
import { LeadCapture } from "@/components/real-estate/LeadCapture";
import { ScrollUpButton } from "@/components/ScrollUpButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  BayutFiltersRail,
  type BayutRailValue,
  BAYUT_RAIL_DEFAULT_VALUE,
  type Segment,
} from "@/components/real-estate/BayutFiltersRail";

export type NavCategoryKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more";

type NavCategoryConfig = {
  key: NavCategoryKey;
  title: string;
  eyebrow: string;
  description: string;
  options: { label: string; slug: string; hint?: string }[];
};

const CONFIG: Record<NavCategoryKey, NavCategoryConfig> = {
  buy: {
    key: "buy",
    title: "Buy",
    eyebrow: "Find your next home",
    description:
      "Explore curated residential, off-plan, and commercial listings with a filter-first experience.",
    options: [
      { label: "Apartments", slug: "apartments" },
      { label: "Townhouses", slug: "townhouses" },
      { label: "Penthouses", slug: "penthouses" },
      { label: "Villas", slug: "villas" },
      { label: "Offices", slug: "offices" },
      { label: "View All", slug: "all" },
    ],
  },
  rent: {
    key: "rent",
    title: "Rent",
    eyebrow: "Flexible living, premium locations",
    description:
      "Shortlist rental-ready homes and commercial spaces with clear filters and quick next steps.",
    options: [
      { label: "Apartments", slug: "apartments" },
      { label: "Offices", slug: "offices" },
      { label: "Townhouses", slug: "townhouses" },
      { label: "Villas", slug: "villas" },
      { label: "Commercial", slug: "commercial" },
    ],
  },
  communities: {
    key: "communities",
    title: "Communities",
    eyebrow: "Neighborhood discovery",
    description:
      "Browse Dubai’s most in-demand communities and explore listings by lifestyle and location.",
    options: [
      { label: "Dubai Marina", slug: "dubai-marina" },
      { label: "Dubai Creek Harbour", slug: "dubai-creek-harbour" },
      { label: "Jumeirah Village Circle (JVC)", slug: "jvc" },
      { label: "Dubai Hills Estate", slug: "dubai-hills" },
      { label: "Jumeirah Beach Residence (JBR)", slug: "jbr" },
      { label: "Palm Jebel Ali", slug: "palm-jebel-ali" },
      { label: "Downtown Dubai", slug: "downtown" },
      { label: "Palm Jumeirah", slug: "palm-jumeirah" },
    ],
  },
  developers: {
    key: "developers",
    title: "Developers",
    eyebrow: "Developer-led opportunities",
    description:
      "Explore projects from Dubai’s top developers with a launch-style, filterable listing experience.",
    options: [
      { label: "Emaar", slug: "emaar" },
      { label: "Nakheel", slug: "nakheel" },
      { label: "Danube", slug: "danube" },
      { label: "Select Group", slug: "select-group" },
      { label: "View All Developers", slug: "all" },
    ],
  },
  "featured-projects": {
    key: "featured-projects",
    title: "Featured Projects",
    eyebrow: "Market pulse",
    description:
      "Trends, guides, and featured launches — curated for buyers, investors, and end-users.",
    options: [
      { label: "Daily Transaction", slug: "daily-transaction" },
      { label: "Rental Transaction", slug: "rental-transaction" },
      { label: "Sale Transaction", slug: "sale-transaction" },
      { label: "Market Guide", slug: "market-guide" },
    ],
  },
  services: {
    key: "services",
    title: "Services",
    eyebrow: "Full-service real estate",
    description:
      "From listing to handover — premium support across sales, leasing, management, and more.",
    options: [
      { label: "Selling", slug: "selling" },
      { label: "Buying", slug: "buying" },
      { label: "Leasing", slug: "leasing" },
      { label: "Management", slug: "management" },
      { label: "Legal Assistance", slug: "legal-assistance" },
      { label: "Property Maintenance", slug: "property-maintenance" },
    ],
  },
  more: {
    key: "more",
    title: "More",
    eyebrow: "Company & resources",
    description:
      "Learn more about us, explore content, and discover what’s next.",
    options: [
      { label: "About Us", slug: "about" },
      { label: "Careers", slug: "careers" },
      { label: "Reports", slug: "reports" },
      { label: "News", slug: "news" },
      { label: "Blogs", slug: "blogs" },
      { label: "Media", slug: "media" },
    ],
  },
};

function titleCaseSlug(slug?: string) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function toNumberOrNull(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n)) return null;
  return n;
}

function matchesSegment(p: Property, segment: Segment) {
  if (segment === "all") return true;

  const hay = `${p.title} ${p.location} ${p.description} ${(p.tag ?? "")} ${p.amenities.join(" ")}`.toLowerCase();

  if (segment === "ready") {
    return (
      (p.tag ?? "").toLowerCase().includes("ready") ||
      hay.includes("ready") ||
      hay.includes("vacant")
    );
  }

  // off-plan
  return (
    (p.tag ?? "").toLowerCase().includes("new") ||
    (p.tag ?? "").toLowerCase().includes("off") ||
    hay.includes("off-plan") ||
    hay.includes("launch") ||
    hay.includes("handover") ||
    hay.includes("completion") ||
    hay.includes("payment plan")
  );
}

export default function NavCategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = (params.category as NavCategoryKey) ?? "buy";
  const option = (params.option as string | undefined) ?? undefined;

  if (!option) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32">
          <div className="rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
            <div className="text-lg font-extrabold tracking-tight">
              Choose an option
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Redirecting you to the {category} options.
            </div>
            <Button
              className="mt-5 h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={() => navigate(`/nav/${category}`)}
            >
              Go to options
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const config = CONFIG[category];

  const initialQ = (searchParams.get("q") ?? "").trim();

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rail, setRail] = useState<BayutRailValue>(() => ({
    ...BAYUT_RAIL_DEFAULT_VALUE,
    operation: category === "rent" ? "rent" : "buy",
    query: initialQ,
  }));

  const results = useMemo(() => {
    const q = rail.query.trim().toLowerCase();
    const kw = rail.keywords.trim().toLowerCase();

    const priceMin = toNumberOrNull(rail.priceMin);
    const priceMax = toNumberOrNull(rail.priceMax);
    const areaMin = toNumberOrNull(rail.areaMin);
    const areaMax = toNumberOrNull(rail.areaMax);

    const base = featuredProperties;

    const optLabel = config.options.find((o) => o.slug === option)?.label;
    const optNeedle = (optLabel ?? titleCaseSlug(option)).toLowerCase();

    return base.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.description} ${(p.tag ?? "")} ${p.amenities.join(" ")}`.toLowerCase();

      const matchesQuery = !q || hay.includes(q);
      const matchesKeywords = !kw || hay.includes(kw);

      const matchesOption =
        !option || option === "all" || hay.includes(optNeedle);

      const matchesSeg = matchesSegment(p, rail.segment);

      const matchesPriceMin =
        priceMin === null || priceMin <= 0 ? true : p.price >= priceMin;
      const matchesPriceMax =
        priceMax === null || priceMax <= 0 ? true : p.price <= priceMax;

      const matchesAreaMin =
        areaMin === null || areaMin <= 0 ? true : p.areaSqFt >= areaMin;
      const matchesAreaMax =
        areaMax === null || areaMax <= 0 ? true : p.areaSqFt <= areaMax;

      return (
        matchesQuery &&
        matchesKeywords &&
        matchesOption &&
        matchesSeg &&
        matchesPriceMin &&
        matchesPriceMax &&
        matchesAreaMin &&
        matchesAreaMax
      );
    });
  }, [
    config.options,
    option,
    rail.areaMax,
    rail.areaMin,
    rail.keywords,
    rail.priceMax,
    rail.priceMin,
    rail.query,
    rail.segment,
  ]);

  const openProperty = (p: Property) => {
    setActiveProperty(p);
    setDialogOpen(true);
    navigate(`/property/${p.id}`);
  };

  const optionLabel =
    config.options.find((o) => o.slug === option)?.label ??
    titleCaseSlug(option);

  const pageTitle = `${config.title} · ${optionLabel}`;

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <BayutFiltersRail
        value={rail}
        onChange={setRail}
        onClear={() =>
          setRail({
            ...BAYUT_RAIL_DEFAULT_VALUE,
            operation: category === "rent" ? "rent" : "buy",
          })
        }
        className="top-[132px]"
        topOffsetPx={132}
      />

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <section className="mt-[200px] rounded-[5px] border border-white/40 bg-white/55 p-5 ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/45">
          <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70">
            For {rail.operation === "rent" ? "Rent" : "Sale"} ·{" "}
            <span className="text-[hsl(var(--brand))]">Dubai Properties</span>{" "}
            <span className="text-[hsl(var(--brand-ink))]/45">›</span>{" "}
            <span className="text-[hsl(var(--brand))]">{config.title}</span>{" "}
            <span className="text-[hsl(var(--brand-ink))]/45">›</span>{" "}
            <span className="text-[hsl(var(--brand-ink))]">{optionLabel}</span>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {optionLabel}
              </h1>
              <div className="mt-2 text-sm text-muted-foreground">
                Results update based on your filters.
              </div>
            </div>

            <div className="rounded-[5px] border border-black/5 bg-white/70 px-4 py-2 text-sm text-muted-foreground ring-1 ring-black/10">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{" "}
              of {featuredProperties.length}
            </div>
          </div>
        </section>

        <section id="results" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-[5px] border border-white/40 bg-white/40 p-5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.6)] ring-1 ring-black/10">
                <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                  Featured listings
                </div>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                  Properties {rail.operation === "rent" ? "for rent" : "for sale"}{" "}
                  in {optionLabel}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Click any card for full details.
                </p>

                <div className="mt-6">
                  <FeaturedListingsMobileSlider
                    properties={results}
                    onOpenProperty={openProperty}
                  />
                </div>

                <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2">
                  {results.map((p) => (
                    <div key={p.id} className="h-[520px]">
                      <FeaturedPropertyLaunchCard
                        property={p}
                        onOpen={() => openProperty(p)}
                      />
                    </div>
                  ))}
                </div>

                {results.length === 0 ? (
                  <div className="mt-10 rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
                    <div className="text-lg font-extrabold tracking-tight">
                      No matches yet
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Try a broader keyword or remove advanced filters.
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Button
                        variant="outline"
                        className="h-11 rounded-[5px]"
                        onClick={() => setRail((p) => ({ ...p, query: "" }))}
                      >
                        Clear query
                      </Button>
                      <Button
                        className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                        onClick={() =>
                          setRail({
                            ...BAYUT_RAIL_DEFAULT_VALUE,
                            operation: category === "rent" ? "rent" : "buy",
                          })
                        }
                      >
                        Reset all filters
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-[252px]">
                <Card className="rounded-[5px] border border-white/40 bg-white/65 p-5 shadow-[0_18px_55px_-45px_rgba(15,23,42,0.45)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55">
                  <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                    Contact Us
                  </div>
                  <div className="mt-2 text-xl font-extrabold tracking-tight">
                    Register your interest for {optionLabel}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Get pricing, payment plans, and best availability.
                  </div>

                  <Separator className="my-4" />

                  <LeadCapture
                    defaultMessage={`Hi! I’m interested in ${optionLabel}. My budget is…`}
                  />

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      className="h-11 rounded-[5px]"
                      onClick={() =>
                        toast({
                          title: "WhatsApp",
                          description:
                            "We can wire WhatsApp CTAs with your real number next.",
                        })
                      }
                    >
                      WhatsApp
                    </Button>
                    <Button
                      className={cn(
                        "h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
                      )}
                      onClick={() =>
                        toast({
                          title: "Saved search",
                          description:
                            "If you want real saved searches, we’ll add Supabase next.",
                        })
                      }
                    >
                      Save Search
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        onGetInTouch={() => {
          const el = document.getElementById("results");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onNavigateSection={(hash) => {
          if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <PropertyDialog
        property={activeProperty}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRequest={(p) => {
          setDialogOpen(false);
          toast({
            title: "Requesting details",
            description: `We prefilled the form for “${p.title}”.`,
          });
        }}
      />

      <ScrollUpButton />
    </div>
  );
}