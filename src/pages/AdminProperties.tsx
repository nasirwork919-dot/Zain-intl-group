import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Plus, Search, Wand2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  PropertyEditor,
  type AdminPropertyDraft,
} from "@/components/admin/PropertyEditor";
import { NewListingSetup } from "@/components/admin/NewListingSetup";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { seedPremiumListings } from "@/components/admin/seed-premium-listings";
import { SmartImage } from "@/components/real-estate/SmartImage";
import { Badge } from "@/components/ui/badge";

type DbProperty = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area_sqft: number;
  tag: string | null;
  cover_image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  published: boolean;
  created_at: string;

  listing_type: string;
  property_type: string;
  placements: string[];
  featured: boolean;
};

const DRAFT_STORAGE_KEY = "zain_admin_new_property_draft_v1";
const MODE_STORAGE_KEY = "zain_admin_properties_mode_v1";

const emptyDraft = (): AdminPropertyDraft => ({
  title: "",
  location: "",
  price: 0,
  beds: 0,
  baths: 0,
  areaSqFt: 0,
  tag: "",
  coverImage: "",
  gallery: [],
  description: "",
  amenities: [],
  published: true,

  listingType: "sale",
  propertyType: "apartment",
  placements: ["buy"],
  featured: false,
});

function mapToDraft(p: DbProperty): AdminPropertyDraft {
  const placements = (p.placements ?? []) as any[];

  return {
    id: p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    areaSqFt: p.area_sqft,
    tag: p.tag ?? "",
    coverImage: p.cover_image,
    gallery: p.gallery ?? [],
    description: p.description,
    amenities: p.amenities ?? [],
    published: p.published,

    listingType: (p.listing_type as any) ?? "sale",
    propertyType: (p.property_type as any) ?? "apartment",
    placements: placements.length ? (placements as any) : (["buy"] as any),
    featured: !!p.featured,
  };
}

function formatCompact(n: number) {
  try {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
  } catch {
    return String(n);
  }
}

type ViewMode = "list" | "new";

function safeReadDraft(): AdminPropertyDraft | null {
  const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AdminPropertyDraft;
    if (!parsed || typeof parsed !== "object") return null;
    // Minimal shape check
    if (typeof parsed.title !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function AdminPropertiesPage() {
  const [params] = useSearchParams();
  const startNew = params.get("new") === "1";

  const [items, setItems] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [seeding, setSeeding] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [view, setView] = useState<ViewMode>(() => {
    if (startNew) return "new";
    const saved = sessionStorage.getItem(MODE_STORAGE_KEY);
    return saved === "new" ? "new" : "list";
  });

  const [newMode, setNewMode] = useState<"setup" | "details">(() => {
    // If there's an existing draft, resume details; otherwise start setup.
    return safeReadDraft() ? "details" : "setup";
  });

  const [draft, setDraft] = useState<AdminPropertyDraft>(() => {
    const existing = safeReadDraft();
    return existing ?? emptyDraft();
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const persistDraft = (next: AdminPropertyDraft) => {
    setDraft(next);
    // Only persist unsaved "new" drafts (no id)
    if (!next.id) {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
    }
  };

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id,title,location,price,beds,baths,area_sqft,tag,cover_image,gallery,description,amenities,published,created_at,listing_type,property_type,placements,featured",
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    setItems((data ?? []) as DbProperty[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(MODE_STORAGE_KEY, view);
  }, [view]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.tag ?? ""} ${p.listing_type} ${p.property_type}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return items.find((x) => x.id === selectedId) ?? null;
  }, [items, selectedId]);

  const save = async () => {
    setSaving(true);

    const payload = {
      title: draft.title,
      location: draft.location,
      price: draft.price,
      beds: draft.beds,
      baths: draft.baths,
      area_sqft: draft.areaSqFt,
      tag: draft.tag.trim() ? draft.tag.trim() : null,
      cover_image: draft.coverImage,
      gallery: draft.gallery,
      description: draft.description,
      amenities: draft.amenities,
      published: draft.published,

      listing_type: draft.listingType,
      property_type: draft.propertyType,
      placements: draft.placements,
      featured: draft.featured,
    };

    if (draft.id) {
      const { error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", draft.id);
      if (error) throw error;

      toast({ title: "Saved", description: "Property updated." });
    } else {
      const { error } = await supabase.from("properties").insert(payload);
      if (error) throw error;

      toast({ title: "Created", description: "New property added." });
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      persistDraft(emptyDraft());
      setNewMode("setup");
      setView("list");
    }

    await load();
    setSaving(false);
  };

  const del = async () => {
    if (!draft.id) return;
    setDeleting(true);

    const { error } = await supabase.from("properties").delete().eq("id", draft.id);
    if (error) throw error;

    toast({ title: "Deleted", description: "Property removed." });
    setSelectedId(null);
    setView("list");
    await load();
    setDeleting(false);
  };

  const openNew = () => {
    setSelectedId(null);
    setView("new");

    const existing = safeReadDraft();
    if (existing) {
      persistDraft(existing);
      setNewMode("details");
      return;
    }

    persistDraft(emptyDraft());
    setNewMode("setup");
  };

  const openEdit = (p: DbProperty) => {
    setSelectedId(p.id);
    setView("new");
    setNewMode("details");
    // Editing an existing property should not overwrite the "new draft" draft storage
    setDraft(mapToDraft(p));
  };

  const backToList = () => {
    setView("list");
    setSelectedId(null);
    // Do NOT clear draft: requirement says changes should still be there if back clicked.
    if (!draft.id) {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  };

  const listHeader = (
    <Card
      className={cn(
        "rounded-[5px] border border-black/10 bg-white/70 p-6 ring-1 ring-black/5",
        "backdrop-blur supports-[backdrop-filter]:bg-white/55",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
            LISTINGS
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
            Properties
          </div>
          <div className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
            Click a card to edit, or create a new property with a draft that
            won’t disappear if you go back.
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <Button
            className="h-11 rounded-[5px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
            onClick={openNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            New property
          </Button>

          <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-2">
            <Button
              variant="outline"
              className="h-10 rounded-[5px] bg-white/70"
              disabled={seeding}
              onClick={async () => {
                setSeeding(true);
                const { inserted } = await seedPremiumListings();
                toast({
                  title: "Luxury seed complete",
                  description:
                    inserted === 0
                      ? "Seed listings already exist."
                      : `Inserted ${inserted} luxury listings.`,
                });
                await load();
                setSeeding(false);
              }}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {seeding ? "Seeding..." : "Seed luxury"}
            </Button>

            <Button
              variant="outline"
              className="h-10 rounded-[5px] bg-white/70"
              onClick={load}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-12">
        <div className="sm:col-span-8">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-[5px] bg-white/80"
            placeholder="Search by title, location, tag, type…"
          />
        </div>
        <div className="sm:col-span-4">
          <div className="flex h-11 items-center justify-between rounded-[5px] bg-white/75 px-4 text-sm font-semibold text-muted-foreground ring-1 ring-black/10">
            <span>Total</span>
            <span className="text-[hsl(var(--brand-ink))]">
              {loading ? "—" : items.length}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  const isEditingExisting = !!draft.id;

  return (
    <AdminShell title="Properties">
      {view === "list" ? (
        <div className="grid gap-4">
          {listHeader}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <Card className="rounded-[5px] border border-black/10 bg-white/70 p-6 ring-1 ring-black/5 sm:col-span-2 lg:col-span-3">
                <div className="text-sm font-semibold text-muted-foreground">
                  Loading…
                </div>
              </Card>
            ) : filtered.length === 0 ? (
              <Card className="rounded-[5px] border border-black/10 bg-white/70 p-6 ring-1 ring-black/5 sm:col-span-2 lg:col-span-3">
                <div className="text-lg font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  No properties found
                </div>
                <div className="mt-1 text-sm font-semibold text-muted-foreground">
                  Try a different keyword.
                </div>
              </Card>
            ) : (
              filtered.map((p) => {
                const status = p.published ? "Published" : "Draft";
                const typeHint = p.listing_type === "rent" ? "Rent" : "Sale";

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openEdit(p)}
                    className="text-left"
                  >
                    <Card
                      className={cn(
                        "group overflow-hidden rounded-[5px] border border-black/10 bg-white/70",
                        "ring-1 ring-black/5 shadow-[0_18px_55px_-45px_rgba(15,23,42,0.35)]",
                        "transition hover:bg-white hover:-translate-y-0.5",
                      )}
                    >
                      <div className="relative">
                        <SmartImage
                          src={p.cover_image}
                          alt={p.title}
                          className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />

                        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                          <Badge className="rounded-[5px] bg-white/85 text-foreground hover:bg-white">
                            {typeHint}
                          </Badge>
                          <Badge
                            className={cn(
                              "rounded-[5px] hover:bg-white/85",
                              status === "Published"
                                ? "bg-[hsl(var(--brand))]/15 text-[hsl(var(--brand-ink))]"
                                : "bg-white/85 text-foreground",
                            )}
                          >
                            {status}
                          </Badge>
                          {p.featured ? (
                            <Badge className="rounded-[5px] bg-[hsl(var(--brand-2))]/18 text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-2))]/18">
                              Featured
                            </Badge>
                          ) : null}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-lg font-extrabold tracking-tight text-white drop-shadow">
                            {p.title}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold text-white/85">
                            {p.location}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-muted-foreground">
                              Price
                            </div>
                            <div className="truncate text-sm font-extrabold text-[hsl(var(--brand-ink))]">
                              {formatCompact(p.price)} AED
                            </div>
                            {p.tag ? (
                              <div className="mt-2 text-xs font-semibold text-muted-foreground">
                                Tag:{" "}
                                <span className="text-foreground">{p.tag}</span>
                              </div>
                            ) : (
                              <div className="mt-2 text-xs font-semibold text-muted-foreground">
                                Tag: —
                              </div>
                            )}
                          </div>

                          <div className="rounded-[5px] bg-muted/35 px-3 py-2 text-right ring-1 ring-black/5">
                            <div className="text-[11px] font-semibold text-muted-foreground">
                              Beds / Baths
                            </div>
                            <div className="text-xs font-extrabold text-[hsl(var(--brand-ink))]">
                              {p.beds} / {p.baths}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              className="h-11 rounded-[5px] bg-white/70"
              onClick={backToList}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to properties
            </Button>

            {!isEditingExisting ? (
              <div className="rounded-[5px] bg-white/70 px-4 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10">
                Draft saved automatically while you work.
              </div>
            ) : (
              <div className="rounded-[5px] bg-white/70 px-4 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10">
                Editing existing property
              </div>
            )}
          </div>

          {!isEditingExisting && newMode === "setup" ? (
            <NewListingSetup
              value={draft}
              onChange={persistDraft}
              onCancel={() => {
                // Back keeps draft, per request
                backToList();
              }}
              onContinue={() => {
                toast({
                  title: "Setup saved",
                  description: "Now fill in the listing details.",
                });
                setNewMode("details");
              }}
            />
          ) : (
            <PropertyEditor
              value={draft}
              onChange={(next) => {
                // Persist only new drafts
                if (!next.id) {
                  persistDraft(next);
                } else {
                  setDraft(next);
                }
              }}
              onSave={save}
              onDelete={selected ? del : undefined}
              saving={saving}
              deleting={deleting}
            />
          )}

          {!isEditingExisting ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <ArrowLeft className="h-4 w-4 opacity-70" />
              You can go back anytime — your new property draft will still be
              here.
            </div>
          ) : null}
        </div>
      )}
    </AdminShell>
  );
}