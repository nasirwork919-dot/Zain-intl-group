import { BedDouble, Bath, Ruler, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Property } from "@/components/real-estate/site-data";
import { formatAED } from "@/components/real-estate/format";
import { SmartImage } from "@/components/real-estate/SmartImage";

export function PropertyCard({
  property,
  onClick,
  featured,
}: {
  property: Property;
  onClick?: () => void;
  featured?: boolean;
}) {
  return (
    <Card
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={cn(
        "group overflow-hidden rounded-3xl border-white/20 bg-white/70 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.55)] backdrop-blur supports-[backdrop-filter]:bg-white/55 transition hover:-translate-y-0.5 hover:bg-white/80",
        onClick && "cursor-pointer",
        featured && "ring-1 ring-[hsl(var(--brand))]/25",
      )}
    >
      <div className="relative">
        <SmartImage
          src={property.coverImage}
          alt={property.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {property.tag ? (
            <Badge className="rounded-full bg-white/85 text-foreground hover:bg-white">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-[hsl(var(--brand-ink))]" />
              {property.tag}
            </Badge>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white drop-shadow">
                {property.location}
              </div>
              <div className="mt-0.5 text-lg font-bold tracking-tight text-white drop-shadow">
                {property.title}
              </div>
            </div>
            <div className="rounded-2xl bg-white/85 px-3 py-2 text-right shadow-sm ring-1 ring-black/5">
              <div className="text-xs font-medium text-muted-foreground">
                From
              </div>
              <div className="text-sm font-bold text-foreground">
                {formatAED(property.price)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-1">
            <BedDouble className="h-4 w-4" />
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-1">
            <Bath className="h-4 w-4" />
            {property.baths} Baths
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-1">
            <Ruler className="h-4 w-4" />
            {property.areaSqFt.toLocaleString()} sqft
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
          {property.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-foreground ring-1 ring-black/5"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}