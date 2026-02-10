import { useMemo, useState } from "react";
import { Bath, BedDouble, Check, MapPin, Ruler } from "lucide-react";

import type { Property } from "@/components/real-estate/site-data";
import { formatAED } from "@/components/real-estate/format";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PropertyDialog({
  property,
  open,
  onOpenChange,
  onRequest,
}: {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (property: Property) => void;
}) {
  const images = useMemo(() => {
    if (!property) return [];
    return property.gallery?.length ? property.gallery : [property.coverImage];
  }, [property]);

  const [activeIdx, setActiveIdx] = useState(0);

  // reset image when property changes or dialog opens
  if (!property) return null;

  const mainSrc = images[activeIdx] ?? images[0];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (v) setActiveIdx(0);
      }}
    >
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl p-0">
        <div className="grid md:grid-cols-5">
          <div className="relative md:col-span-3">
            <img
              src={mainSrc}
              alt={property.title}
              className="h-64 w-full object-cover md:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/0" />

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <Badge className="mb-2 rounded-full bg-white/85 text-foreground hover:bg-white">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    {property.location}
                  </Badge>
                  <div className="text-2xl font-extrabold tracking-tight text-white">
                    {property.title}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/90 px-3 py-2 text-right shadow-sm ring-1 ring-black/5">
                  <div className="text-xs font-medium text-muted-foreground">
                    From
                  </div>
                  <div className="text-base font-extrabold text-foreground">
                    {formatAED(property.price)}
                  </div>
                </div>
              </div>

              {images.length > 1 ? (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className={cn(
                        "overflow-hidden rounded-2xl ring-1 transition",
                        i === activeIdx
                          ? "ring-white/80"
                          : "ring-white/30 hover:ring-white/60",
                      )}
                      aria-label={`Select image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-14 w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="p-5">
              <DialogHeader>
                <DialogTitle className="text-left">Overview</DialogTitle>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-2xl bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">Beds</div>
                  <div className="mt-1 inline-flex items-center gap-1 font-semibold">
                    <BedDouble className="h-4 w-4" /> {property.beds}
                  </div>
                </div>
                <div className="rounded-2xl bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">Baths</div>
                  <div className="mt-1 inline-flex items-center gap-1 font-semibold">
                    <Bath className="h-4 w-4" /> {property.baths}
                  </div>
                </div>
                <div className="rounded-2xl bg-muted/50 p-3">
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

              <div className="mt-4">
                <div className="text-sm font-semibold">Amenities</div>
                <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
                  {property.amenities.map((a) => (
                    <li key={a} className="inline-flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))]">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Button
                  className="h-11 rounded-2xl bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                  onClick={() => onRequest(property)}
                >
                  Request details
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-2xl"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                Tip: select thumbnails on the left to view other images.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}