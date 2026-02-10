import { useMemo, useState } from "react";
import { Bath, BedDouble, ChevronLeft, ChevronRight, Ruler } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { formatAED } from "@/components/real-estate/format";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/real-estate/SmartImage";

export function CuratedOpportunityCard({
  property,
  onOpen,
}: {
  property: Property;
  onOpen: () => void;
}) {
  const images = useMemo(
    () => (property.gallery?.length ? property.gallery : [property.coverImage]),
    [property.coverImage, property.gallery],
  );
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <article className="group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-[hsl(var(--brand-ink))]">
              For Sale
            </span>{" "}
            in Dubai, {property.location}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "relative mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10",
          "bg-white",
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpen();
          }}
          className="block w-full text-left"
          aria-label={`Open ${property.title}`}
        >
          <SmartImage
            src={images[idx]}
            alt={property.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-64"
            loading="lazy"
          />
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/10 transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/10 transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {images.slice(0, 5).map((src, i) => {
                const active = i === idx;
                return (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    className={cn(
                      "h-2.5 w-2.5 rounded-full ring-1 transition",
                      active
                        ? "bg-white ring-white/80"
                        : "bg-white/45 ring-white/50 hover:bg-white/70",
                    )}
                    aria-label={`Select image ${i + 1}`}
                    onClick={() => setIdx(i)}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <BedDouble className="h-4 w-4 text-[hsl(var(--brand))]" />
          {property.beds} Beds
        </span>
        <span className="inline-flex items-center gap-2">
          <Bath className="h-4 w-4 text-[hsl(var(--brand))]" />
          {property.baths} Baths
        </span>
        <span className="inline-flex items-center gap-2">
          <Ruler className="h-4 w-4 text-[hsl(var(--brand))]" />
          {property.areaSqFt.toLocaleString()} SQ.FT
        </span>
      </div>

      <div className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {formatAED(property.price)}
      </div>
    </article>
  );
}