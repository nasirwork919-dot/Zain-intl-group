import { useMemo, useState } from "react";
import { Image as ImageIcon, Save, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type AdminPropertyDraft = {
  id?: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  areaSqFt: number;
  tag: string;
  coverImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  published: boolean;
};

function parseLines(v: string) {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function PropertyEditor({
  value,
  onChange,
  onSave,
  onDelete,
  saving,
  deleting,
  className,
}: {
  value: AdminPropertyDraft;
  onChange: (next: AdminPropertyDraft) => void;
  onSave: () => void;
  onDelete?: () => void;
  saving?: boolean;
  deleting?: boolean;
  className?: string;
}) {
  const [galleryText, setGalleryText] = useState(value.gallery.join("\n"));
  const [amenitiesText, setAmenitiesText] = useState(value.amenities.join("\n"));

  const canSave = useMemo(() => {
    return (
      value.title.trim().length >= 4 &&
      value.location.trim().length >= 2 &&
      value.coverImage.trim().length >= 8 &&
      value.description.trim().length >= 20 &&
      Number.isFinite(value.price) &&
      value.price > 0
    );
  }, [value.coverImage, value.description, value.location, value.price, value.title]);

  return (
    <Card
      className={cn(
        "rounded-[5px] border border-black/10 bg-white/80 p-6 ring-1 ring-black/5",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-muted-foreground">
            Listing
          </div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
            {value.id ? "Edit property" : "New property"}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Paste image URLs for now. If you want uploads, we’ll add Supabase
            Storage next.
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {onDelete ? (
            <Button
              variant="outline"
              className="h-11 rounded-[5px]"
              disabled={deleting}
              onClick={() => {
                onDelete();
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          ) : null}

          <Button
            className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 disabled:opacity-50"
            disabled={!canSave || saving}
            onClick={() => {
              const g = parseLines(galleryText);
              const a = parseLines(amenitiesText);

              if (g.length === 0) {
                toast({
                  title: "Gallery required",
                  description:
                    "Add at least one gallery image URL (can be same as cover).",
                  variant: "destructive",
                });
                return;
              }
              if (a.length === 0) {
                toast({
                  title: "Amenities required",
                  description: "Add at least one amenity.",
                  variant: "destructive",
                });
                return;
              }

              onChange({ ...value, gallery: g, amenities: a });
              onSave();
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="grid gap-5">
        <div className="flex items-center justify-between gap-3 rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
          <div>
            <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Published
            </div>
            <div className="mt-1 text-xs font-semibold text-muted-foreground">
              Only published listings show on the website.
            </div>
          </div>
          <Switch
            checked={value.published}
            onCheckedChange={(v) => onChange({ ...value, published: v })}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Title *</Label>
            <Input
              value={value.title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              className="h-11 rounded-[5px] bg-white/80"
              placeholder="Palm-view Signature Apartment"
            />
          </div>

          <div className="grid gap-2">
            <Label>Location *</Label>
            <Input
              value={value.location}
              onChange={(e) => onChange({ ...value, location: e.target.value })}
              className="h-11 rounded-[5px] bg-white/80"
              placeholder="Dubai Marina"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <div className="grid gap-2">
            <Label>Price (AED) *</Label>
            <Input
              value={String(value.price || "")}
              onChange={(e) =>
                onChange({
                  ...value,
                  price: Number(String(e.target.value).replace(/[^0-9]/g, "")) || 0,
                })
              }
              inputMode="numeric"
              className="h-11 rounded-[5px] bg-white/80"
              placeholder="2650000"
            />
          </div>
          <div className="grid gap-2">
            <Label>Beds</Label>
            <Input
              value={String(value.beds)}
              onChange={(e) =>
                onChange({ ...value, beds: Number(e.target.value) || 0 })
              }
              inputMode="numeric"
              className="h-11 rounded-[5px] bg-white/80"
            />
          </div>
          <div className="grid gap-2">
            <Label>Baths</Label>
            <Input
              value={String(value.baths)}
              onChange={(e) =>
                onChange({ ...value, baths: Number(e.target.value) || 0 })
              }
              inputMode="numeric"
              className="h-11 rounded-[5px] bg-white/80"
            />
          </div>
          <div className="grid gap-2">
            <Label>Area (sqft)</Label>
            <Input
              value={String(value.areaSqFt)}
              onChange={(e) =>
                onChange({ ...value, areaSqFt: Number(e.target.value) || 0 })
              }
              inputMode="numeric"
              className="h-11 rounded-[5px] bg-white/80"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Tag (optional)</Label>
          <Input
            value={value.tag}
            onChange={(e) => onChange({ ...value, tag: e.target.value })}
            className="h-11 rounded-[5px] bg-white/80"
            placeholder="Hot Deal"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Cover image URL *</Label>
            <div className="relative">
              <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={value.coverImage}
                onChange={(e) => onChange({ ...value, coverImage: e.target.value })}
                className="h-11 rounded-[5px] bg-white/80 pl-9"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Gallery URLs (one per line) *</Label>
            <Textarea
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              className="min-h-[90px] rounded-[5px] bg-white/80"
              placeholder="https://...\nhttps://..."
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Description *</Label>
          <Textarea
            value={value.description}
            onChange={(e) => onChange({ ...value, description: e.target.value })}
            className="min-h-[120px] rounded-[5px] bg-white/80"
            placeholder="A bright, modern home with..."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Amenities (one per line) *</Label>
            <Textarea
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
              className="min-h-[120px] rounded-[5px] bg-white/80"
              placeholder="Infinity pool\nGym & sauna\nConcierge"
            />
          </div>

          <div className="rounded-[5px] border border-black/10 bg-white/70 p-4 ring-1 ring-black/5">
            <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Tips
            </div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>• Keep titles short (buyers scan fast)</li>
              <li>• Use high-res, bright images</li>
              <li>• First gallery image should match the cover</li>
              <li>• Add a tag like “Ready”, “New”, “Waterfront”</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}