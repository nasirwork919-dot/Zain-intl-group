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
import {
  type HeroBarFilters,
  HeroSearchBar,
} from "@/components/real-estate/HeroSearchBar";
import { LeadCapture } from "@/components/real-estate/LeadCapture";
import { ScrollUpButton } from "@/components/ScrollUpButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { StickyResultsBar } from "@/components/real-estate/StickyResultsBar";

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

export default function NavCategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = (params.category as NavCategoryKey) ?? "buy";
  const option = (params.option as string | undefined) ?? undefined;

  // If someone opens /nav/:category without an option, send them to the landing page with cards.
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

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [heroBar, setHeroBar] = useState<HeroBarFilters>({
    operation: category === "rent" ? "rent" : "buy",
    propertyType: "apartment",
    query: "",
  });

  const results = useMemo(() => {
    const q = heroBar.query.trim().toLowerCase();

    // Minimal filtering for now: keyword only, plus category/option bias in title/location.
    const base = featuredProperties;

    const optLabel = config.options.find((o) => o.slug === option)?.label;
    const optNeedle = (optLabel ?? titleCaseSlug(option)).toLowerCase();

    return base.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.description} ${(p.tag ?? "")} ${p.amenities.join(" ")}`.toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      const matchesOption = !option || option === "all" || hay.includes(optNeedle);
      return matchesQuery && matchesOption;
    });
  }, [heroBar.query, option, config.options]);

  const openProperty = (p: Property) => {
    setActiveProperty(p);
    setDialogOpen(true);
  };

  const pageTitle = option
    ? `${config.title} · ${config.options.find((o) => o.slug === option)?.label ?? titleCaseSlug(option)}`
    : config.title;

  const heroBg =
    config.key === "services"
      ? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=3200&q=85"
      : "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=3200&q=90";

  const ctaTitle = config.key === "services" ? "Talk to an advisor" : "Request a shortlist";

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      {/* Hero */}
      <section className="relative flex overflow-hidden pt-20 min-h-[720px] sm:min-h-[820px] lg:min-h-[920px]">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0b1220]/45" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
              {config.eyebrow}
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/80">
              {config.description}
            </p>

            <div className="mx-auto mt-10 max-w-5xl">
              <HeroSearchBar
                value={heroBar}
                onChange={setHeroBar}
                onSubmit={() => {
                  const anchor = document.getElementById("results");
                  anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>

            {/* Option selector grid */}
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {config.options.map((o) => {
                const active = o.slug === (option ?? "");
                return (
                  <button
                    key={o.slug}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/nav/${category}/${o.slug}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
                      )
                    }
                    className={cn(
                      "rounded-[16px] px-4 py-3 text-xs font-semibold",
                      "ring-1 ring-white/20",
                      "transition",
                      active
                        ? "bg-white text-[#0b1025]"
                        : "bg-white/10 text-white hover:bg-white/15",
                      "backdrop-blur",
                    )}
                    aria-pressed={active}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filters bar (Bayut-style refinement) */}
      <StickyResultsBar
        value={heroBar}
        onChange={setHeroBar}
        onSubmit={() => {
          const anchor = document.getElementById("results");
          anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="-mt-10"
        tone="light"
      />

      {/* Featured listings */}
      <section id="results" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-[5px] border border-white/40 bg-white/40 p-5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.6)] ring-1 ring-black/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Featured listings
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                {option
                  ? config.options.find((o) => o.slug === option)?.label ?? "Results"
                  : "Browse all"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Use the filters bar to refine. Click any card for full details.
              </p>
            </div>
            <div className="rounded-[5px] border border-black/5 bg-white/70 px-4 py-2 text-sm text-muted-foreground ring-1 ring-black/10">
              Showing{" "}
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              of {featuredProperties.length}
            </div>
          </div>

          <div className="mt-6">
            <FeaturedListingsMobileSlider properties={results} onOpenProperty={openProperty} />
          </div>

          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-3">
            {results.map((p) => (
              <div key={p.id} className="h-[520px]">
                <FeaturedPropertyLaunchCard property={p} onOpen={() => openProperty(p)} />
              </div>
            ))}
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
              <div className="text-lg font-extrabold tracking-tight">No matches yet</div>
              <div className="mt-1 text-sm text-muted-foreground">Try a broader keyword.</div>
              <Button
                className="mt-4 h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                onClick={() => setHeroBar((p) => ({ ...p, query: "" }))}
              >
                Clear keyword
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="overflow-hidden rounded-[5px] border border-white/40 bg-white/65 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.65)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55">
          <div className="p-6 sm:p-7">
            <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">Next step</div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{ctaTitle}</div>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Share your budget, preferred areas, and timeline — we’ll respond with a curated shortlist and clear next steps.
            </p>

            <Separator className="my-6" />

            <div className="grid gap-4 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <LeadCapture defaultMessage={`Hi! I’m interested in ${pageTitle}. My budget is…`} />
              </div>
              <div className="md:col-span-5">
                <div className="rounded-[5px] border border-black/5 bg-white/70 p-5 ring-1 ring-black/10">
                  <div className="text-sm font-extrabold tracking-tight">What we’ll send you</div>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {[
                      "Curated options that match your criteria",
                      "Payment plans & timeline breakdown",
                      "ROI/rental insight where relevant",
                      "Priority access to availability",
                    ].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <Button
                    className="mt-5 h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                    onClick={() =>
                      toast({
                        title: "Request received",
                        description: "We’ll reach out shortly with a shortlist and next steps.",
                      })
                    }
                  >
                    Request now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <SiteFooter
        onGetInTouch={() => {
          const el = document.getElementById("results");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onNavigateSection={(hash) => {
          // for footer scroll-to-top button
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