import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { FeaturedPropertyLaunchCard } from "@/components/real-estate/FeaturedPropertyLaunchCard";
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
import {
  usePublishedProperties,
  type PublicProperty as Property,
} from "@/hooks/use-published-properties";
import { useNavMenuInventory, type NavMenuKey } from "@/hooks/use-nav-menu-inventory";

function slugify(v: string) {
  return v
    .trim()
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/\(|\)/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

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

function hasPlacement(placements: string[], key: string) {
  return (placements ?? [])
    .map((p) => String(p).toLowerCase().trim())
    .includes(String(key).toLowerCase().trim());
}

function matchesSegment(p: Property, segment: Segment) {
  if (segment === "all") return true;

  const tag = (p.tag ?? "").trim().toLowerCase();
  const hay = `${p.title} ${p.location} ${p.description} ${(p.tag ?? "")} ${p.amenities.join(" ")}`.toLowerCase();

  if (segment === "ready") {
    return tag.includes("ready") || hay.includes("ready") || hay.includes("vacant");
  }

  if (segment === "off-plan") {
    return (
      hay.includes("off-plan") ||
      hay.includes("launch") ||
      hay.includes("handover") ||
      hay.includes("completion") ||
      hay.includes("payment plan") ||
      tag.includes("new")
    );
  }

  if (segment === "new") return tag === "new" || tag.includes("new");
  if (segment === "hot-deal") return tag === "hot deal" || tag.includes("hot");
  if (segment === "investor-pick")
    return tag === "investor pick" || tag.includes("investor");

  // These are present in your tags dataset too; keep behavior consistent.
  if (segment === "waterfront") return tag.includes("waterfront");
  if (segment === "family") return tag.includes("family");
  if (segment === "prime") return tag.includes("prime");
  if (segment === "luxury") return tag.includes("luxury");

  return true;
}

function expectedListingTypeForCategory(category: NavMenuKey) {
  if (category === "rent") return "rent" as const;
  if (category === "buy") return "sale" as const;
  return null;
}

function railOperationForCategory(category: NavMenuKey) {
  return category === "rent" ? "rent" : "buy";
}

function isNavMenuKey(v?: string): v is NavMenuKey {
  return (
    v === "buy" ||
    v === "rent" ||
    v === "communities" ||
    v === "developers" ||
    v === "featured-projects" ||
    v === "services" ||
    v === "more"
  );
}

export default function NavCategoryPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawCategory = params.category;
  const category: NavMenuKey = isNavMenuKey(rawCategory) ? rawCategory : "buy";
  const option = (params.option as string | undefined) ?? undefined;

  const { data: allProperties = [] } = usePublishedProperties();
  const { menus } = useNavMenuInventory();

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
              Redirecting you to {menus[category]?.label ?? category}.
            </div>
            <Button
              className="mt-5 h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={() => navigate(`/nav/${category}/option/all`)}
            >
              Go to results
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const initialQ = (searchParams.get("q") ?? "").trim();

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rail, setRail] = useState<BayutRailValue>(() => ({
    ...BAYUT_RAIL_DEFAULT_VALUE,
    operation: railOperationForCategory(category),
    query: initialQ,
  }));

  const expectedType = expectedListingTypeForCategory(category);

  const optionLabel =
    option === "all"
      ? "View All"
      : menus[category]?.options.find((o) => o.slug === option)?.label ??
        titleCaseSlug(option);

  const results = useMemo(() => {
    const q = rail.query.trim().toLowerCase();
    const kw = rail.keywords.trim().toLowerCase();

    const priceMin = toNumberOrNull(rail.priceMin);
    const priceMax = toNumberOrNull(rail.priceMax);
    const areaMin = toNumberOrNull(rail.areaMin);
    const areaMax = toNumberOrNull(rail.areaMax);

    // Base: enforce Buy vs Rent by listing_type when applicable.
    let base = expectedType
      ? allProperties.filter((p) => p.listingType === expectedType)
      : allProperties;

    // Placement-aware categories (everything except buy/rent/communities):
    // only show listings that have that placement.
    if (category !== "buy" && category !== "rent" && category !== "communities") {
      base = base.filter((p) => hasPlacement(p.placements, category));
    }

    return base.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.description} ${(p.tag ?? "")} ${p.amenities.join(" ")}`.toLowerCase();

      const matchesQuery = !q || hay.includes(q);
      const matchesKeywords = !kw || hay.includes(kw);

      // Option matching:
      // - Communities: option slug matches location
      // - Buy/Rent: option slug matches propertyType
      // - Other categories: option slug matches location (inventory options are locations)
      const matchesOption =
        option === "all"
          ? true
          : category === "communities"
            ? slugify(p.location) === option
            : category === "buy" || category === "rent"
              ? slugify(p.propertyType ?? "") === option
              : slugify(p.location) === option;

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
    allProperties,
    category,
    expectedType,
    menus,
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

  const labelTop = menus[category]?.label ?? category.toUpperCase();

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <BayutFiltersRail
        value={rail}
        onChange={setRail}
        onClear={() =>
          setRail({
            ...BAYUT_RAIL_DEFAULT_VALUE,
            operation: railOperationForCategory(category),
          })
        }
        className="top-[132px]"
        topOffsetPx={132}
      />

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <section className="mt-[200px] rounded-[5px] border border-white/40 bg-white/55 p-5 ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/45">
          <div className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70">
            <span className="text-[hsl(var(--brand))]">{labelTop}</span>{" "}
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
              of {allProperties.length}
            </div>
          </div>
        </section>

        <section id="results" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-[5px] border border-white/40 bg-white/40 p-5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.6)] ring-1 ring-black/10">
                <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                  Listings
                </div>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                  {labelTop} · {optionLabel}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Click any card for full details.
                </p>

                {/* Mobile: stacked list */}
                <div className="mt-6 grid gap-4 md:hidden">
                  {results.map((p) => (
                    <div key={p.id} className="h-[520px]">
                      <FeaturedPropertyLaunchCard
                        property={p}
                        onOpen={() => openProperty(p)}
                      />
                    </div>
                  ))}
                </div>

                {/* Desktop/tablet: grid */}
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
                            operation: railOperationForCategory(category),
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
                    defaultMessage={`Hi! I’m interested in ${labelTop} · ${optionLabel}. My budget is…`}
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
                          title: "Save search",
                          description:
                            "If you want real saved searches, we’ll add Supabase auth next.",
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