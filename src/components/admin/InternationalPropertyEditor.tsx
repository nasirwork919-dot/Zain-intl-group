import { useEffect, useState } from "react";
import { Save, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type IntlPropertyDraft = {
  id?: string;
  title: string;
  location: string;
  country: string;
  region: "europe" | "uk" | "pakistan";
  price: number;
  currency: string;
  beds: number;
  baths: number;
  areaSqFt: number;
  tag: string;
  coverImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  propertyType: string;
  listingType: "sale" | "rent";
  featured: boolean;
  published: boolean;
};

const REGION_CURRENCIES: Record<string, string> = {
  europe: "EUR",
  uk: "GBP",
  pakistan: "PKR",
};

function parseLines(v: string) {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label className="text-xs font-semibold text-[hsl(var(--brand-ink))]/70 uppercase tracking-wide">
      {children}
    </Label>
  );
}

export function InternationalPropertyEditor({
  draft: initial,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: {
  draft: IntlPropertyDraft;
  onSave: (d: IntlPropertyDraft) => void;
  onDelete?: () => void;
  isSaving: boolean;
  isDeleting: boolean;
}) {
  const [d, setD] = useState<IntlPropertyDraft>(initial);

  useEffect(() => {
    setD(initial);
  }, [initial.id]);

  const set = <K extends keyof IntlPropertyDraft>(k: K, v: IntlPropertyDraft[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const handleRegionChange = (region: IntlPropertyDraft["region"]) => {
    setD((prev) => ({
      ...prev,
      region,
      currency: REGION_CURRENCIES[region] ?? prev.currency,
    }));
  };

  return (
    <div className="flex h-full flex-col gap-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid gap-5">

          {/* Identity */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Identity
            </div>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <FieldLabel>Title *</FieldLabel>
                <Input
                  value={d.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. 3-Bed Apartment in Kensington"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <FieldLabel>Region *</FieldLabel>
                  <Select value={d.region} onValueChange={(v) => handleRegionChange(v as IntlPropertyDraft["region"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe">🇪🇺 Europe</SelectItem>
                      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                      <SelectItem value="pakistan">🇵🇰 Pakistan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <FieldLabel>Country *</FieldLabel>
                  <Input
                    value={d.country}
                    onChange={(e) => set("country", e.target.value)}
                    placeholder="e.g. United Kingdom"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <FieldLabel>City / Area *</FieldLabel>
                <Input
                  value={d.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Kensington, London"
                />
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Pricing
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <FieldLabel>Price *</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  value={d.price || ""}
                  onChange={(e) => set("price", Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div className="grid gap-1.5">
                <FieldLabel>Currency</FieldLabel>
                <Select value={d.currency} onValueChange={(v) => set("currency", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">GBP — £ Pound</SelectItem>
                    <SelectItem value="EUR">EUR — € Euro</SelectItem>
                    <SelectItem value="PKR">PKR — ₨ Rupee</SelectItem>
                    <SelectItem value="USD">USD — $ Dollar</SelectItem>
                    <SelectItem value="AED">AED — Dirham</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <FieldLabel>Listing Type</FieldLabel>
                <Select value={d.listingType} onValueChange={(v) => set("listingType", v as "sale" | "rent")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <FieldLabel>Property Type</FieldLabel>
                <Select value={d.propertyType} onValueChange={(v) => set("propertyType", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Details */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Property Details
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="grid gap-1.5">
                <FieldLabel>Beds</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  value={d.beds || ""}
                  onChange={(e) => set("beds", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-1.5">
                <FieldLabel>Baths</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  value={d.baths || ""}
                  onChange={(e) => set("baths", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-1.5">
                <FieldLabel>Area (sqft)</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  value={d.areaSqFt || ""}
                  onChange={(e) => set("areaSqFt", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-3 grid gap-1.5">
              <FieldLabel>Tag (optional)</FieldLabel>
              <Select value={d.tag || "__none"} onValueChange={(v) => set("tag", v === "__none" ? "" : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="No tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">No tag</SelectItem>
                  <SelectItem value="Hot Deal">Hot Deal</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Off Plan">Off Plan</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Reduced">Reduced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Images
            </div>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <FieldLabel>Cover Image URL *</FieldLabel>
                <Input
                  value={d.coverImage}
                  onChange={(e) => set("coverImage", e.target.value)}
                  placeholder="https://..."
                />
                {d.coverImage && (
                  <div className="mt-1 h-24 overflow-hidden rounded-[5px] bg-black/5">
                    <img
                      src={d.coverImage}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-1.5">
                <FieldLabel>Gallery URLs (one per line)</FieldLabel>
                <Textarea
                  rows={4}
                  value={d.gallery.join("\n")}
                  onChange={(e) => set("gallery", parseLines(e.target.value))}
                  placeholder={"https://...\nhttps://..."}
                  className="font-mono text-xs"
                />
                <div className="text-[11px] font-semibold text-muted-foreground">
                  {d.gallery.length} image{d.gallery.length !== 1 ? "s" : ""} added
                </div>
              </div>
            </div>
          </Card>

          {/* Description & Amenities */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Content
            </div>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  rows={5}
                  value={d.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe the property..."
                />
              </div>
              <div className="grid gap-1.5">
                <FieldLabel>Amenities (one per line)</FieldLabel>
                <Textarea
                  rows={4}
                  value={d.amenities.join("\n")}
                  onChange={(e) => set("amenities", parseLines(e.target.value))}
                  placeholder={"Gym\nPool\nParking\nConcierge"}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </Card>

          {/* Flags */}
          <Card className="p-4 ring-1 ring-black/10 shadow-none">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50 mb-4">
              Visibility
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#111827]">Published</div>
                  <div className="text-xs font-medium text-muted-foreground">Visible to public</div>
                </div>
                <Switch checked={d.published} onCheckedChange={(v) => set("published", v)} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#111827]">Featured</div>
                  <div className="text-xs font-medium text-muted-foreground">Highlighted badge</div>
                </div>
                <Switch checked={d.featured} onCheckedChange={(v) => set("featured", v)} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-black/10 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button
            className={cn(
              "flex-1 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white",
              "hover:bg-[hsl(var(--brand-ink))]/92",
            )}
            disabled={isSaving || !d.title || !d.location || !d.country}
            onClick={() => onSave(d)}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {d.id ? "Save Changes" : "Create Listing"}
              </span>
            )}
          </Button>

          {d.id && onDelete && (
            <Button
              variant="outline"
              className="rounded-[5px] text-red-600 hover:bg-red-50 hover:text-red-700"
              disabled={isDeleting}
              onClick={onDelete}
            >
              {isDeleting ? "Deleting…" : <Trash2 className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {(!d.title || !d.location || !d.country) && (
          <div className="mt-2 text-[11px] font-semibold text-red-500">
            Title, city/area, and country are required.
          </div>
        )}
      </div>
    </div>
  );
}
