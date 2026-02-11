import { ArrowUpRight, Calendar, Tag } from "lucide-react";

import { SmartImage } from "@/components/real-estate/SmartImage";
import type { Property } from "@/components/real-estate/site-data";
import { formatAED } from "@/components/real-estate/format";
import { cn } from "@/lib/utils";

export function CuratedLaunchCard({
  property,
  completionDate,
  onOpen,
  className,
}: {
  property: Property;
  completionDate: string;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[28px]",
        "ring-1 ring-white/10",
        "bg-white/5",
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

      <div className="relative z-[1]">
        <SmartImage
          src={property.coverImage}
          alt={property.title}
          className="h-[440px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[520px]"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
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
                ZAIN INTERNATIONAL GROUP
              </div>
              <div className="text-[10px] font-semibold tracking-[0.22em] text-white/70">
                REAL ESTATE · DUBAI
              </div>
            </div>
          </div>

          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                "bg-white/0 text-white",
                "ring-1 ring-white/60",
                "backdrop-blur",
                "transition",
                "hover:bg-white/10",
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
        <div className="max-w-[90%]">
          <div className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            {property.title}
          </div>
          <div className="mt-1 text-sm font-medium text-white/80">
            {property.location}
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2",
              "text-[13px] font-semibold text-[hsl(var(--brand-ink))]",
              "shadow-sm ring-1 ring-black/5",
            )}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
              <Tag className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap">
              Price from {formatAED(property.price)}
            </span>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2",
              "text-[13px] font-semibold text-[hsl(var(--brand-ink))]",
              "shadow-sm ring-1 ring-black/5",
            )}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--brand-2))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
              <Calendar className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap">
              Completion Date {completionDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}