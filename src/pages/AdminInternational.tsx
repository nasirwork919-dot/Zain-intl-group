import { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Globe,
  Plus,
  Search,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  InternationalPropertyEditor,
  type IntlPropertyDraft,
} from "@/components/admin/InternationalPropertyEditor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { type IntlPropertyRow } from "@/hooks/use-international-properties";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SmartImage } from "@/components/real-estate/SmartImage";

const REGION_LABELS: Record<string, { label: string; flag: string }> = {
  europe: { label: "Europe", flag: "🇪🇺" },
  uk: { label: "United Kingdom", flag: "🇬🇧" },
  pakistan: { label: "Pakistan", flag: "🇵🇰" },
};

const emptyDraft = (): IntlPropertyDraft => ({
  title: "",
  location: "",
  country: "",
  region: "uk",
  price: 0,
  currency: "GBP",
  beds: 0,
  baths: 0,
  areaSqFt: 0,
  tag: "",
  coverImage: "",
  gallery: [],
  description: "",
  amenities: [],
  propertyType: "apartment",
  listingType: "sale",
  featured: false,
  published: true,
});

function rowToDraft(row: IntlPropertyRow): IntlPropertyDraft {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    country: row.country,
    region: row.region as IntlPropertyDraft["region"],
    price: row.price,
    currency: row.currency,
    beds: row.beds,
    baths: row.baths,
    areaSqFt: row.area_sqft,
    tag: row.tag ?? "",
    coverImage: row.cover_image,
    gallery: row.gallery ?? [],
    description: row.description,
    amenities: row.amenities ?? [],
    propertyType: row.property_type,
    listingType: row.listing_type as "sale" | "rent",
    featured: row.featured,
    published: row.published,
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Unexpected error.";
}

export default function AdminInternationalPage() {
  const qc = useQueryClient();

  const [rows, setRows] = useState<IntlPropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [publishedFilter, setPublishedFilter] = useState<string>("all");
  const [listingFilter, setListingFilter] = useState<string>("all");

  const [editorOpen, setEditorOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<IntlPropertyDraft>(emptyDraft());
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchRows() {
    setLoading(true);
    const { data, error } = await supabase
      .from("international_properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading", description: getErrorMessage(error), variant: "destructive" });
    } else {
      setRows((data ?? []) as IntlPropertyRow[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRows();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (regionFilter !== "all" && r.region !== regionFilter) return false;
      if (publishedFilter !== "all" && String(r.published) !== publishedFilter) return false;
      if (listingFilter !== "all" && r.listing_type !== listingFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.location.toLowerCase().includes(q) &&
          !r.country.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [rows, regionFilter, publishedFilter, listingFilter, search]);

  function openNew() {
    setEditDraft(emptyDraft());
    setEditorOpen(true);
  }

  function openEdit(row: IntlPropertyRow) {
    setEditDraft(rowToDraft(row));
    setEditorOpen(true);
  }

  async function handleSave(draft: IntlPropertyDraft) {
    setIsSaving(true);
    const payload = {
      title: draft.title,
      location: draft.location,
      country: draft.country,
      region: draft.region,
      price: draft.price,
      currency: draft.currency,
      beds: draft.beds,
      baths: draft.baths,
      area_sqft: draft.areaSqFt,
      tag: draft.tag || null,
      cover_image: draft.coverImage,
      gallery: draft.gallery,
      description: draft.description,
      amenities: draft.amenities,
      property_type: draft.propertyType,
      listing_type: draft.listingType,
      featured: draft.featured,
      published: draft.published,
    };

    if (draft.id) {
      const { error } = await supabase
        .from("international_properties")
        .update(payload)
        .eq("id", draft.id);

      if (error) {
        toast({ title: "Save failed", description: getErrorMessage(error), variant: "destructive" });
      } else {
        toast({ title: "Saved", description: `"${draft.title}" updated.` });
        setEditorOpen(false);
        fetchRows();
        qc.invalidateQueries({ queryKey: ["international-properties"] });
      }
    } else {
      const { error } = await supabase
        .from("international_properties")
        .insert([payload]);

      if (error) {
        toast({ title: "Create failed", description: getErrorMessage(error), variant: "destructive" });
      } else {
        toast({ title: "Created", description: `"${draft.title}" added.` });
        setEditorOpen(false);
        fetchRows();
        qc.invalidateQueries({ queryKey: ["international-properties"] });
      }
    }
    setIsSaving(false);
  }

  async function handleDelete() {
    if (!editDraft.id) return;
    if (!confirm(`Delete "${editDraft.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    const { error } = await supabase
      .from("international_properties")
      .delete()
      .eq("id", editDraft.id);

    if (error) {
      toast({ title: "Delete failed", description: getErrorMessage(error), variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `"${editDraft.title}" removed.` });
      setEditorOpen(false);
      fetchRows();
      qc.invalidateQueries({ queryKey: ["international-properties"] });
    }
    setIsDeleting(false);
  }

  const stats = useMemo(() => ({
    total: rows.length,
    published: rows.filter((r) => r.published).length,
    europe: rows.filter((r) => r.region === "europe").length,
    uk: rows.filter((r) => r.region === "uk").length,
    pakistan: rows.filter((r) => r.region === "pakistan").length,
  }), [rows]);

  return (
    <AdminShell title="International Properties">
      <div className="grid gap-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "Total", value: stats.total, color: "text-[hsl(var(--brand-ink))]" },
            { label: "Published", value: stats.published, color: "text-green-600" },
            { label: "🇪🇺 Europe", value: stats.europe, color: "text-[#111827]" },
            { label: "🇬🇧 UK", value: stats.uk, color: "text-[#111827]" },
            { label: "🇵🇰 Pakistan", value: stats.pakistan, color: "text-[#111827]" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-4 shadow-none ring-1 ring-black/10 text-center">
              <div className={cn("text-2xl font-extrabold", color)}>{value}</div>
              <div className="mt-0.5 text-xs font-semibold text-muted-foreground">{label}</div>
            </Card>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, city, country…"
              className="pl-9 h-10 rounded-[5px]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#111827]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-10 w-44 rounded-[5px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="europe">🇪🇺 Europe</SelectItem>
              <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="pakistan">🇵🇰 Pakistan</SelectItem>
            </SelectContent>
          </Select>

          <Select value={publishedFilter} onValueChange={setPublishedFilter}>
            <SelectTrigger className="h-10 w-36 rounded-[5px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Published</SelectItem>
              <SelectItem value="false">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={listingFilter} onValueChange={setListingFilter}>
            <SelectTrigger className="h-10 w-36 rounded-[5px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sale & Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="h-10 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 ml-auto"
            onClick={openNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Listing
          </Button>
        </div>

        <Separator />

        {/* Listing count */}
        <div className="text-sm font-semibold text-muted-foreground">
          {loading ? "Loading…" : `${filtered.length} listing${filtered.length !== 1 ? "s" : ""}`}
        </div>

        {/* Table */}
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-[5px] bg-black/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="py-20 text-center shadow-none ring-1 ring-black/10">
            <Globe className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <div className="mt-3 text-base font-extrabold text-[#111827]">
              No listings found
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {rows.length === 0
                ? "Create your first international property listing."
                : "Try adjusting filters or search."}
            </p>
            {rows.length === 0 && (
              <Button className="mt-5 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white" onClick={openNew}>
                <Plus className="mr-2 h-4 w-4" />
                New Listing
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-2">
            {filtered.map((row) => {
              const regionMeta = REGION_LABELS[row.region] ?? { label: row.region, flag: "🌍" };
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => openEdit(row)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-[5px] px-4 py-3 text-left",
                    "bg-white ring-1 ring-black/10 transition",
                    "hover:bg-white hover:shadow-sm hover:ring-[hsl(var(--brand))]/25",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                  )}
                >
                  {/* Thumbnail */}
                  <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-[5px] bg-black/5">
                    {row.cover_image ? (
                      <SmartImage
                        src={row.cover_image}
                        alt={row.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-extrabold text-[#111827]">
                        {row.title}
                      </span>
                      {row.featured && (
                        <Badge variant="secondary" className="text-[10px] font-semibold flex-shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-muted-foreground flex-wrap">
                      <span>{regionMeta.flag} {regionMeta.label}</span>
                      <span>·</span>
                      <span>{row.location}, {row.country}</span>
                      <span>·</span>
                      <span className="capitalize">{row.property_type}</span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm font-extrabold text-[hsl(var(--brand-ink))]">
                      {row.currency} {row.price.toLocaleString()}
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                        row.listing_type === "sale" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
                      )}>
                        {row.listing_type === "sale" ? "Sale" : "Rent"}
                      </span>
                      <Badge
                        variant={row.published ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {row.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Editor Sheet */}
      <Sheet open={editorOpen} onOpenChange={setEditorOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-lg p-0 flex flex-col"
          style={{ maxWidth: "520px" }}
        >
          <div className="border-b border-black/10 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[hsl(var(--brand-ink))]/50">
              {editDraft.id ? "Edit Listing" : "New Listing"}
            </div>
            <div className="mt-0.5 text-base font-extrabold text-[hsl(var(--brand-ink))]">
              {editDraft.id ? editDraft.title || "Untitled" : "International Property"}
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <InternationalPropertyEditor
              draft={editDraft}
              onSave={handleSave}
              onDelete={editDraft.id ? handleDelete : undefined}
              isSaving={isSaving}
              isDeleting={isDeleting}
            />
          </div>
        </SheetContent>
      </Sheet>
    </AdminShell>
  );
}
