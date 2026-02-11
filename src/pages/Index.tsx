import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Star,
} from "lucide-react";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import {
  type HeroBarFilters,
  HeroSearchBar,
} from "@/components/real-estate/HeroSearchBar";
import {
  HeroSearch,
  type SearchFilters,
} from "@/components/real-estate/HeroSearch";
import {
  featuredProperties,
  featuredStats,
  type Property,
} from "@/components/real-estate/site-data";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { PropertyDialog } from "@/components/real-estate/PropertyDialog";
import { LeadCapture } from "@/components/real-estate/LeadCapture";
import { CuratedOpportunities } from "@/components/real-estate/CuratedOpportunities";
import { ScrollingTextSeparator } from "@/components/real-estate/ScrollingTextSeparator";
import { ExperienceStatsStrip } from "@/components/real-estate/ExperienceStatsStrip";
import { ExploreCommunities } from "@/components/real-estate/ExploreCommunities";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { FeaturedListingsMobileSlider } from "@/components/real-estate/FeaturedListingsMobileSlider";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    location: "any",
    beds: "any",
    maxPrice: 20000000,
  });

  const [heroBar, setHeroBar] = useState<HeroBarFilters>({
    operation: "buy",
    propertyType: "apartment",
    query: "",
  });

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return featuredProperties.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q)) ||
        (p.tag ?? "").toLowerCase().includes(q);

      const matchesLocation =
        filters.location === "any" || p.location === filters.location;

      const matchesBeds = filters.beds === "any" || p.beds >= filters.beds;

      const matchesPrice = p.price <= filters.maxPrice;

      return matchesQuery && matchesLocation && matchesBeds && matchesPrice;
    });
  }, [filters]);

  const openProperty = (p: Property) => {
    setActiveProperty(p);
    setDialogOpen(true);
  };

  const resetListingFilters = () => {
    setFilters({
      query: "",
      location: "any",
      beds: "any",
      maxPrice: 20000000,
    });
    setHeroBar((prev) => ({ ...prev, query: "" }));
  };

  return (
    <div id="top" className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      {/* Hero (background slider + only title + search controls) */}
      <section className="relative overflow-hidden pt-20 min-h-[600px] sm:min-h-[680px]">
        {/* background slider */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0">
            {[
              "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=3200&q=90",
              "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=3200&q=90",
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3200&q=90",
            ].map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 hero-slide"
                style={{ animationDelay: `${idx * 8}s` }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* subtle wash so text stays crisp */}
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:pb-14 lg:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))]/70">
              At the Heart of Every Home is You
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))] sm:text-5xl lg:text-6xl">
              Let’s Find Your Perfect Haven Together
            </h1>

            <div className="mx-auto mt-8 max-w-5xl">
              <HeroSearchBar
                value={heroBar}
                onChange={setHeroBar}
                onSubmit={() => {
                  setFilters((prev) => ({ ...prev, query: heroBar.query }));
                  document
                    .getElementById("listings")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>

          <style>{`
            /* Each slide: fade-in -> HOLD -> fade-out -> stay hidden.
               Total cycle per slide group = 24s (3 slides * 8s).
               This creates a clear delay/hold so it doesn't constantly transition. */
            @keyframes heroHoldFade {
              0% { opacity: 0; transform: scale(1.02); }
              10% { opacity: 1; transform: scale(1.0); }
              70% { opacity: 1; transform: scale(1.0); }
              85% { opacity: 0; transform: scale(1.005); }
              100% { opacity: 0; transform: scale(1.005); }
            }
            .hero-slide{ animation: heroHoldFade 24s ease-in-out infinite; will-change: opacity, transform; }

            @media (prefers-reduced-motion: reduce){
              .hero-slide{ animation: none !important; opacity: 0 !important; }
              .hero-slide:first-of-type{ opacity: 1 !important; }
            }
          `}</style>
        </div>
      </section>

      <ExperienceStatsStrip className="-mt-2" />

      <ScrollingTextSeparator label="A handpicked edit" />

      <CuratedOpportunities
        onOpenProperty={openProperty}
        onViewAll={() => {
          resetListingFilters();
          toast({
            title: "Showing all listings",
            description: "Filters cleared — here are all featured properties.",
          });
        }}
      />

      <ScrollingTextSeparator
        label="Signature projects"
        items={[
          "Off-plan specialists",
          "Payment plans",
          "Prime communities",
          "Developer launches",
          "Handover ready",
          "Investor-friendly",
        ]}
      />

      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
              Signature projects
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
              New launches & prime communities
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              A boutique selection across Downtown, Marina, and family-first
              green districts — built for lifestyle and long-term value.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <Card className="rounded-[5px] border-2 border-[hsl(var(--brand-ink))]/12 bg-white/65 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.55)] ring-1 ring-[hsl(var(--brand-ink))]/6 backdrop-blur supports-[backdrop-filter]:bg-white/55 transition hover:-translate-y-0.5 hover:border-[hsl(var(--brand))]/26 md:col-span-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-extrabold tracking-tight">
                  Off-plan specialists
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Compare launches, handover timelines, and payment plans in one
                  clean view.
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {[
                "Verified developer inventory",
                "Transparent fees & projections",
                "Shortlists tailored to your criteria",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand-ink))]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-5 h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request a shortlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Trusted guidance",
                desc: "Market insight, not pressure — with clear next steps.",
              },
              {
                icon: Globe,
                title: "Global buyer-ready",
                desc: "Remote viewings, documentation, and closing support.",
              },
              {
                icon: Star,
                title: "Luxury focus",
                desc: "Premium finishes, waterfront living, and landmark addresses.",
              },
              {
                icon: CheckCircle2,
                title: "Fast matching",
                desc: "Your requirements → curated options within minutes.",
              },
            ].map((c) => (
              <Card
                key={c.title}
                className="rounded-[5px] border-2 border-[hsl(var(--brand-ink))]/12 bg-white/65 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.55)] ring-1 ring-[hsl(var(--brand-ink))]/6 backdrop-blur supports-[backdrop-filter]:bg-white/55 transition hover:-translate-y-0.5 hover:border-[hsl(var(--brand))]/26"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[hsl(var(--brand-2))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-base font-extrabold tracking-tight">
                  {c.title}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {c.desc}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[5px] border border-white/40 bg-white/45 ring-1 ring-black/10">
          <ExploreCommunities
            onSearchCommunity={(location) => {
              setFilters((prev) => ({ ...prev, location: location as any }));
              document
                .getElementById("listings")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
              toast({
                title: "Community selected",
                description: `Showing listings in ${location}.`,
              });
            }}
          />
        </div>
      </div>

      <ScrollingTextSeparator
        label="Featured listings"
        items={[
          "Ready inventory",
          "Waterfront views",
          "Investor picks",
          "Family villas",
          "Penthouse living",
          "Marina lifestyle",
        ]}
      />

      <section id="listings" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-[5px] border border-white/40 bg-white/40 p-5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.6)] ring-1 ring-black/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Listings
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Featured properties
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Results update based on your filters. Click any card for full
                details.
              </p>
            </div>
            <div className="rounded-[5px] border border-black/5 bg-white/70 px-4 py-2 text-sm text-muted-foreground ring-1 ring-black/10">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{" "}
              of {featuredProperties.length}
            </div>
          </div>

          <div className="mt-6">
            <FeaturedListingsMobileSlider
              properties={results}
              onOpenProperty={openProperty}
            />
          </div>

          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-3">
            {results.map((p, idx) => (
              <PropertyCard
                key={p.id}
                property={p}
                featured={idx === 0}
                onClick={() => openProperty(p)}
              />
            ))}
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
              <div className="text-lg font-extrabold tracking-tight">
                No matches yet
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Try a broader budget or clear the keyword.
              </div>
              <Button
                className="mt-4 h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                onClick={() => resetListingFilters()}
              >
                Reset filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 md:grid-cols-12">
          <Card className="overflow-hidden rounded-[5px] border border-white/40 bg-white/65 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.65)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:col-span-7">
            <div className="p-6 sm:p-7">
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                About Zain International Group
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                A calmer way to buy in Dubai
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We combine local market knowledge with a buyer-first process.
                Whether you’re investing or relocating, we help you compare the
                right options quickly — with clean pricing, payment plans, and
                guidance from first message to handover.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Curated inventory",
                    desc: "Only projects we would recommend to friends.",
                  },
                  {
                    title: "Clarity-first",
                    desc: "Numbers, not noise — with realistic timelines.",
                  },
                  {
                    title: "End-to-end support",
                    desc: "From viewings to documentation and closing.",
                  },
                  {
                    title: "Post-sale care",
                    desc: "Handover, snagging, and leasing guidance.",
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="rounded-[5px] border border-black/5 bg-white/70 p-4 ring-1 ring-black/10"
                  >
                    <div className="text-sm font-extrabold tracking-tight">
                      {i.title}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {i.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-[5px] border border-white/40 bg-white/65 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.65)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1600&q=80"
              alt="Modern living room"
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="text-sm font-semibold">What you’ll get</div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {["Project comparisons", "Payment plan breakdowns", "ROI & rental insights", "Priority access"].map(
                  (t) => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ),
                )}
              </ul>

              <Button
                variant="secondary"
                className="mt-5 h-11 w-full rounded-[5px] bg-white/70 hover:bg-white"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get a free consultation
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <LeadCapture
              defaultMessage={
                activeProperty
                  ? `Hi! I’d like details about: ${activeProperty.title} (${activeProperty.location}). My budget is…`
                  : "Hi! I’m looking for a property in Dubai. My budget is…"
              }
            />
          </div>

          <Card className="rounded-[5px] border border-white/40 bg-white/65 p-6 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.55)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55 md:col-span-5">
            <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
              Contact
            </div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">
              Let’s match you fast
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Tell us what you want. We’ll respond with a shortlist that fits.
            </div>

            <Separator className="my-5" />

            <div className="grid gap-3">
              {[
                { label: "WhatsApp", value: "+971 55 123 4567" },
                { label: "Email", value: "hello@primadom.ae" },
                { label: "Office", value: "Dubai, United Arab Emirates" },
              ].map((i) => (
                <div
                  key={i.label}
                  className="rounded-[5px] border border-black/5 bg-white/70 p-4 ring-1 ring-black/10"
                >
                  <div className="text-xs font-medium text-muted-foreground">
                    {i.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {i.value}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="mt-5 h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={() =>
                toast({
                  title: "We’re online",
                  description: "Send your criteria and we’ll respond quickly.",
                })
              }
            >
              Message us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-4 text-xs text-muted-foreground">
              This is a demo UI inspired by premium real estate sites.
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-white/30 bg-white/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold tracking-tight">
            Zain International Group{" "}
            <span className="text-muted-foreground">· Dubai</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zain International Group. All rights
            reserved.
          </div>
        </div>
      </footer>

      <PropertyDialog
        property={activeProperty}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRequest={(p) => {
          setDialogOpen(false);
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
          toast({
            title: "Requesting details",
            description: `We prefilled the form for “${p.title}”.`,
          });
        }}
      />

      <ScrollUpButton />
    </div>
  );
};

export default Index;