import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { SmartImage } from "@/components/real-estate/SmartImage";
import { formatAED } from "@/components/real-estate/format";
import { cn } from "@/lib/utils";

export function FeaturedPropertyLaunchCard({
  property,
  onOpen,
  className,
}: {
  property: Property;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-[28px]",
        "ring-1 ring-white/10 bg-white/5",
        "shadow-[0_26px_90px_-65px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-[2] focus:outline-none"
        aria-label={`Open ${property.title}`}
      />

      <div className="relative z-[1] h-full w-full">
        <SmartImage
          src={property.coverImage}
          alt={property.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/12" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      </div>

      {/* Top controls */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[3] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-none inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
              <span className="text-lg font-black tracking-tight text-white">
                Z
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="text-xs font-extrabold tracking-[0.08em] text-white">
                FEATURED LISTING
              </div>
              <div className="text-[10px] font-semibold tracking-[0.22em] text-white/70">
                ZAIN INTERNATIONAL GROUP
              </div>
            </div>
          </div>

          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                "bg-white/0 text-white ring-1 ring-white/60 backdrop-blur",
                "transition hover:bg-white/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              )}
              aria-label="Open"
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom overlay content */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
              {property.title}
            </div>

            <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white/80">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-white/95 px-3 py-2 text-right shadow-sm ring-1 ring-black/5">
            <div className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
              FROM
            </div>
            <div className="text-sm font-extrabold text-[hsl(var(--brand-ink))]">
              {formatAED(property.price)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/85">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
            <BedDouble className="h-4 w-4" />
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
            <Bath className="h-4 w-4" />
            {property.baths} Baths
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
            <Ruler className="h-4 w-4" />
            {property.areaSqFt.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </article>
  );
}