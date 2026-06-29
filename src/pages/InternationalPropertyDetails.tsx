import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import {
  useInternationalPropertyById,
  formatIntlPrice,
  type IntlRegion,
} from "@/hooks/use-international-properties";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

const REGION_LABELS: Record<IntlRegion, string> = {
  europe: "Europe",
  uk: "United Kingdom",
  pakistan: "Pakistan",
};

export default function InternationalPropertyDetailsPage() {
  const { region, id } = useParams<{ region: string; id: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const { data: property, isLoading, error } = useInternationalPropertyById(id ?? "");

  const allImages = property
    ? [property.coverImage, ...property.gallery].filter(Boolean)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <div className="mx-auto max-w-7xl px-4 pt-40">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-[4/3] animate-pulse rounded-[5px] bg-black/8" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded bg-black/8" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-black/8" />
              <div className="h-10 w-1/3 animate-pulse rounded bg-black/8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <div className="flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
          <div className="text-5xl">🏚️</div>
          <div className="mt-4 text-xl font-extrabold text-[#111827]">Property not found</div>
          <Button className="mt-6" onClick={() => navigate(`/international/${region}`)}>
            Back to listings
          </Button>
        </div>
      </div>
    );
  }

  const regionLabel = REGION_LABELS[property.region] ?? property.region;

  const whatsappLines = [
    "Hello ZAiN Int'l Group",
    `I'm interested in an international property:`,
    ``,
    `Property: ${property.title}`,
    `Location: ${property.location}, ${property.country}`,
    `Price: ${formatIntlPrice(property.price, property.currency)}`,
    `Listing type: ${property.listingType === "sale" ? "For Sale" : "For Rent"}`,
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <div className="mx-auto max-w-7xl px-4 pt-40 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold text-[#111827]/50">
          <Link to="/international" className="hover:text-[#111827] transition">
            International
          </Link>
          <span>/</span>
          <Link to={`/international/${region}`} className="hover:text-[#111827] transition">
            {regionLabel}
          </Link>
          <span>/</span>
          <span className="truncate text-[#111827]">{property.title}</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Images */}
          <div>
            <div className="relative overflow-hidden rounded-[5px] bg-black/5">
              <img
                src={allImages[activeImg] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"}
                alt={property.title}
                className="aspect-[16/10] w-full object-cover"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                    {activeImg + 1} / {allImages.length}
                  </div>
                </>
              )}

              {property.tag && (
                <div className="absolute left-3 top-3">
                  <Badge className="bg-[hsl(var(--brand))] text-white">{property.tag}</Badge>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    className={cn(
                      "h-16 w-24 flex-shrink-0 overflow-hidden rounded-[5px] ring-2 transition",
                      idx === activeImg
                        ? "ring-[hsl(var(--brand))]"
                        : "ring-black/10 hover:ring-black/20",
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="mt-8">
                <h2 className="text-lg font-extrabold text-[#111827]">About this property</h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#111827]/65">
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-extrabold text-[#111827]">Amenities</h2>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 rounded-[5px] bg-white px-3 py-2.5 text-sm font-semibold text-[#111827] ring-1 ring-black/10"
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[hsl(var(--brand))]" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-[148px] space-y-4">
              <div className="rounded-[5px] bg-white p-6 ring-1 ring-black/10">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--brand))]/10 px-3 py-1 text-xs font-semibold text-[hsl(var(--brand-ink))]">
                    {regionLabel}
                  </span>
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    property.listingType === "sale" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
                  )}>
                    For {property.listingType === "sale" ? "Sale" : "Rent"}
                  </span>
                  {property.featured && (
                    <Badge variant="secondary" className="text-xs font-semibold">Featured</Badge>
                  )}
                </div>

                <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#111827]">
                  {property.title}
                </h1>

                <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#111827]/55">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  {property.location}, {property.country}
                </div>

                <div className="mt-5 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  {formatIntlPrice(property.price, property.currency)}
                  {property.listingType === "rent" && (
                    <span className="text-base font-semibold text-[#111827]/40"> / month</span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: Bed, value: property.beds, label: "Beds" },
                    { icon: Bath, value: property.baths, label: "Baths" },
                    { icon: Maximize2, value: property.areaSqFt, label: "Sqft" },
                  ].map(({ icon: Icon, value, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 rounded-[5px] bg-[hsl(var(--page))] py-3 ring-1 ring-black/8"
                    >
                      <Icon className="h-4 w-4 text-[hsl(var(--brand-ink))]/60" />
                      <span className="text-base font-extrabold text-[#111827]">
                        {value > 0 ? value.toLocaleString() : "—"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#111827]/45">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs font-semibold text-[#111827]/40 capitalize">
                  {property.propertyType}
                </div>
              </div>

              {/* Contact card */}
              <div className="rounded-[5px] bg-white p-6 ring-1 ring-black/10">
                <div className="text-sm font-extrabold text-[#111827]">Interested in this property?</div>
                <p className="mt-1 text-xs font-medium text-[#111827]/55">
                  Contact our international team for a viewing or more information.
                </p>

                <div className="mt-5 grid gap-3">
                  <a
                    href={buildWhatsAppUrl({ lines: whatsappLines })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-[5px] py-3 text-sm font-semibold",
                      "bg-[#25D366] text-white hover:bg-[#25D366]/90 transition",
                    )}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Enquiry
                  </a>

                  <a
                    href="tel:+971000000000"
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-[5px] py-3 text-sm font-semibold",
                      "bg-[#111827] text-white hover:bg-[#111827]/90 transition",
                    )}
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-[5px]"
                onClick={() => navigate(`/international/${region}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {regionLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
