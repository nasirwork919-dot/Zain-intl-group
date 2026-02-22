import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { type SearchFilters } from "@/components/real-estate/HeroSearch";
import { LeadCapture } from "@/components/real-estate/LeadCapture";
import { CuratedOpportunities } from "@/components/real-estate/CuratedOpportunities";
import { ScrollingTextSeparator } from "@/components/real-estate/ScrollingTextSeparator";
import { ExperienceStatsStrip } from "@/components/real-estate/ExperienceStatsStrip";
import { ExploreCommunities } from "@/components/real-estate/ExploreCommunities";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { FeaturedListingsMobileSlider } from "@/components/real-estate/FeaturedListingsMobileSlider";
import { YourHomeYourWay } from "@/components/real-estate/YourHomeYourWay";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { FeaturedPropertyLaunchCard } from "@/components/real-estate/FeaturedPropertyLaunchCard";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  usePublishedProperties,
  type PublicProperty as Property,
} from "@/hooks/use-published-properties";

function hasPlacement(placements: string[], key: string) {
  return (placements ?? [])
    .map((p) => String(p).toLowerCase().trim())
    .includes(String(key).toLowerCase().trim());
}

const Index = () => {
  const navigate = useNavigate();

  const { data: allProperties = [] } = usePublishedProperties();

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

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return allProperties.filter((p) => {
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
  }, [allProperties, filters]);

  const featuredResults = useMemo(() => {
    // Priority order:
    // 1) Admin "featured" flag OR placement "featured"
    // 2) Otherwise, show results
    const featured = results.filter(
      (p) => p.featured || hasPlacement(p.placements, "featured"),
    );
    return featured.length ? featured : results;
  }, [results]);

  const openProperty = (p: Property) => {
    setActiveProperty(p);
    navigate(`/property/${p.id}`);
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

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      {/* Hero (background slider + only title + search controls) */}
      <section className="relative flex overflow-hidden pt-24 min-h-[760px] sm:pt-20 sm:min-h-[820px] lg:min-h-[920px]">
        {/* background slider */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0">
            {[
              // Luxury skyline / premium facade / high-end interiors
              "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=3200&q=90",
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=3200&q=90",
              "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=3200&q=90",
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

          {/* no white wash; keep readability with a subtle dark veil */}
          <div className="absolute inset-0 bg-[#0b1220]/35" />
        </div>

        <div className="relative mx-auto my-8 flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 sm:my-0 sm:py-20 lg:py-24">
          <div className="mx-auto my-8 w-full max-w-4xl text-center sm:my-10 lg:my-12">
            <div className="text-xs font-semibold tracking-[0.14em] text-white/85">
              At the Heart of Every Home is You
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let’s Find Your Perfect Haven Together
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-white/85 sm:text-base">
              Your Efficient Partner in Real Estate Since{" "}
              <span className="text-white">2011</span>
            </p>

            <div className="mx-auto mt-7 max-w-5xl">
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
            description: "Filters cleared — here are all published properties.",
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
              onClick={() => scrollTo("#contact")}
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
              toast({
                title: "Community selected",
                description: `Showing listings in ${location}.`,
              });
              navigate(`/nav/buy/option/all?q=${encodeURIComponent(location)}`);
            }}
          />
        </div>
      </div>

      <YourHomeYourWay className="mt-6" />

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
                Mark listings as <b>Featured</b> (or select placement{" "}
                <b>Featured</b>) in the admin panel to show them here.
              </p>
            </div>
            <div className="rounded-[5px] border border-black/5 bg-white/70 px-4 py-2 text-sm text-muted-foreground ring-1 ring-black/10">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {featuredResults.length}
              </span>{" "}
              of {allProperties.length}
            </div>
          </div>

          <div className="mt-6">
            <FeaturedListingsMobileSlider
              properties={featuredResults}
              onOpenProperty={openProperty}
            />
          </div>

          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-3">
            {featuredResults.map((p) => (
              <div key={p.id} className="h-[520px]">
                <FeaturedPropertyLaunchCard
                  property={p}
                  onOpen={() => openProperty(p)}
                />
              </div>
            ))}
          </div>

          {featuredResults.length === 0 ? (
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
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85"
              alt="Luxury interior"
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="text-sm font-semibold">What you’ll get</div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {[
                  "Project comparisons",
                  "Payment plan breakdowns",
                  "ROI & rental insights",
                  "Priority access",
                ].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                className="mt-5 h-11 w-full rounded-[5px] bg-white/70 hover:bg-white"
                onClick={() => scrollTo("#contact")}
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
              Listings shown here are now pulled from the admin-published
              inventory.
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter
        onGetInTouch={() => scrollTo("#contact")}
        onNavigateSection={(hash) => scrollTo(hash)}
      />

      <ScrollUpButton />
    </div>
  );
};

export default Index;