import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bath,
  BedDouble,
  Check,
  ChevronLeft,
  MapPin,
  Ruler,
} from "lucide-react";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { StickyResultsBar } from "@/components/real-estate/StickyResultsBar";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { SmartImage } from "@/components/real-estate/SmartImage";
import { FeaturedPropertyLaunchCard } from "@/components/real-estate/FeaturedPropertyLaunchCard";
import { formatAED } from "@/components/real-estate/format";
import {
  featuredProperties,
  type Property,
} from "@/components/real-estate/site-data";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function getById(id?: string) {
  if (!id) return null;
  return featuredProperties.find((p) => p.id === id) ?? null;
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = getById(id);

  const [activeIdx, setActiveIdx] = useState(0);

  const images = useMemo(() => {
    if (!property) return [];
    return property.gallery?.length ? property.gallery : [property.coverImage];
  }, [property]);

  const related = useMemo(() => {
    if (!property) return [];
    // "Related": same location first, then fill.
    const same = featuredProperties.filter(
      (p) => p.id !== property.id && p.location === property.location,
    );
    const rest = featuredProperties.filter(
      (p) => p.id !== property.id && p.location !== property.location,
    );
    return [...same, ...rest].slice(0, 8);
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-32">
          <Card className="rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
            <div className="text-lg font-extrabold tracking-tight">
              Listing not found
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              This property isn’t available.
            </div>
            <div className="mt-5 flex justify-center">
              <Button
                className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                onClick={() => navigate("/")}
              >
                Go home
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const mainSrc = images[activeIdx] ?? images[0] ?? "/placeholder.svg";

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      {/* Sticky search/filters (premium pattern) */}
      <StickyResultsBar
        value={{
          operation: "buy",
          propertyType: "apartment",
          query: "",
        }}
        onChange={() => {
          toast({
            title: "Filters",
            description:
              "Tell me what these filters should control on the details page (related listings vs. global search) and I’ll wire it.",
          });
        }}
        onSubmit={() => {
          toast({
            title: "Search",
            description:
              "We can route this to your listings/results page with the query applied.",
          });
        }}
        className="mt-2"
        tone="light"
      />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-8">
        {/* Back */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={cn(
              "inline-flex items-center gap-2 rounded-[5px] px-3 py-2 text-sm font-semibold",
              "bg-white/70 text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
              "transition hover:bg-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <Badge className="rounded-[5px] bg-white/80 text-foreground hover:bg-white">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {property.location}
            </Badge>
            {property.tag ? (
              <Badge className="rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand))]/12">
                {property.tag}
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Hero image */}
        <section className="mt-4 overflow-hidden rounded-[5px] border border-white/50 bg-white/70 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.6)] ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55">
          <div className="relative">
            <SmartImage
              src={mainSrc}
              alt={property.title}
              className="h-[320px] w-full object-cover sm:h-[420px]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/0" />

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="sm:hidden inline-flex items-center gap-2">
                    <Badge className="rounded-[5px] bg-white/85 text-foreground hover:bg-white">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {property.location}
                    </Badge>
                    {property.tag ? (
                      <Badge className="rounded-[5px] bg-white/85 text-foreground hover:bg-white">
                        {property.tag}
                      </Badge>
                    ) : null}
                  </div>

                  <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {property.title}
                  </h1>
                </div>

                <div className="shrink-0 rounded-[5px] bg-white/90 px-3 py-2 text-right shadow-sm ring-1 ring-black/10">
                  <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
                    PRICE
                  </div>
                  <div className="text-sm font-extrabold text-[hsl(var(--brand-ink))] sm:text-base">
                    {formatAED(property.price)}
                  </div>
                </div>
              </div>

              {/* thumbnails */}
              {images.length > 1 ? (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((src, i) => {
                    const active = i === activeIdx;
                    return (
                      <button
                        key={`${src}-${i}`}
                        type="button"
                        onClick={() => setActiveIdx(i)}
                        className={cn(
                          "flex-none overflow-hidden rounded-[5px] ring-1 transition",
                          active
                            ? "ring-white/80"
                            : "ring-white/30 hover:ring-white/60",
                        )}
                        aria-label={`Select image ${i + 1}`}
                      >
                        <SmartImage
                          src={src}
                          alt=""
                          className="h-14 w-20 object-cover"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="text-base font-extrabold tracking-tight">
                  Overview
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-[5px] bg-muted/45 p-3 ring-1 ring-black/5">
                    <div className="text-xs text-muted-foreground">Beds</div>
                    <div className="mt-1 inline-flex items-center gap-1 font-semibold">
                      <BedDouble className="h-4 w-4" /> {property.beds}
                    </div>
                  </div>
                  <div className="rounded-[5px] bg-muted/45 p-3 ring-1 ring-black/5">
                    <div className="text-xs text-muted-foreground">Baths</div>
                    <div className="mt-1 inline-flex items-center gap-1 font-semibold">
                      <Bath className="h-4 w-4" /> {property.baths}
                    </div>
                  </div>
                  <div className="rounded-[5px] bg-muted/45 p-3 ring-1 ring-black/5">
                    <div className="text-xs text-muted-foreground">Area</div>
                    <div className="mt-1 inline-flex items-center gap-1 font-semibold">
                      <Ruler className="h-4 w-4" />{" "}
                      {property.areaSqFt.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  {property.description}
                </p>

                <div className="mt-5">
                  <div className="text-sm font-extrabold tracking-tight">
                    Amenities
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {property.amenities.map((a) => (
                      <li key={a} className="inline-flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-4">
                <Card className="rounded-[5px] border border-black/5 bg-white/70 p-4 ring-1 ring-black/10">
                  <div className="text-sm font-extrabold tracking-tight">
                    Ready to proceed?
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Request details, payment plan, and best availability.
                  </div>

                  <Separator className="my-4" />

                  <Button
                    className="h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                    onClick={() => {
                      toast({
                        title: "Request sent",
                        description:
                          "Thanks! An agent will reach out shortly with details and availability.",
                      });
                      const el = document.getElementById("related");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Request details
                  </Button>

                  <Button
                    variant="outline"
                    className="mt-2 h-11 w-full rounded-[5px]"
                    onClick={() => navigate(-1)}
                  >
                    Close
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related listings */}
        <section id="related" className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
                Related listings
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
                You might also like
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Similar options based on location and buyer interest.
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {related.map((p) => (
              <div key={p.id} className="w-[84vw] max-w-[360px] flex-none">
                <FeaturedPropertyLaunchCard
                  property={p}
                  onOpen={() => navigate(`/property/${p.id}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter
        onGetInTouch={() =>
          toast({
            title: "Contact",
            description: "Tell me where you want the contact CTA to land here.",
          })
        }
        onNavigateSection={(hash) => {
          if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}