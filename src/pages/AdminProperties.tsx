import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { AdminShell } from "@/components/admin/AdminShell";
import {
  PropertyEditor,
  type AdminPropertyDraft,
} from "@/components/admin/PropertyEditor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
};

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
});

function mapToDraft(p: DbProperty): AdminPropertyDraft {
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
  };
}

function formatCompact(n: number) {
  try {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
  } catch {
    return String(n);
  }
}

export default function AdminPropertiesPage() {
  const [params] = useSearchParams();
  const startNew = params.get("new") === "1";

  const [items, setItems] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | "new" | null>(
    startNew ? "new" : null,
  );

  const [draft, setDraft] = useState<AdminPropertyDraft>(emptyDraft());
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id,title,location,price,beds,baths,area_sqft,tag,cover_image,gallery,description,amenities,published,created_at",
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
    if (selectedId === "new") {
      setDraft(emptyDraft());
      return;
    }
    if (!selectedId) return;
    const found = items.find((x) => x.id === selectedId);
    if (found) setDraft(mapToDraft(found));
  }, [items, selectedId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.tag ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const selected = useMemo(() => {
    if (selectedId === "new") return null;
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
      setSelectedId(null);
    }

    await load();
    setSaving(false);
  };

  const del = async () => {
    if (!draft.id) return;
    setDeleting(true);

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", draft.id);
    if (error) throw error;

    toast({ title: "Deleted", description: "Property removed." });
    setSelectedId(null);
    await load();
    setDeleting(false);
  };

  return (
    <AdminShell title="Properties">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Card className="rounded-[5px] border border-black/10 bg-white/65 p-4 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/55">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
                  LISTINGS
                </div>
                <div className="mt-1 text-lg font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  Properties
                </div>
              </div>

              <Button
                className="h-10 rounded-[5px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
                onClick={() => setSelectedId("new")}
              >
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            </div>

            <div className="mt-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 rounded-[5px] bg-white/80 pl-9"
                  placeholder="Search title, location, tag…"
                />
              </div>

              <div className="mt-3 flex items-center justify-between rounded-[5px] bg-white/70 px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10">
                <span>Total</span>
                <span className="text-[hsl(var(--brand-ink))]">
                  {items.length}
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {loading ? (
                <div className="rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/5">
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/5">
                  No properties found.
                </div>
              ) : (
                filtered.map((p) => {
                  const active = selectedId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className={cn(
                        "w-full rounded-[5px] p-4 text-left transition",
                        "ring-1 ring-black/10",
                        active
                          ? "bg-[hsl(var(--brand))]/10"
                          : "bg-white/75 hover:bg-white",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                            {p.title}
                          </div>
                          <div className="mt-1 text-xs font-semibold text-muted-foreground">
                            {p.location} ·{" "}
                            {p.published ? "Published" : "Draft"}
                            {p.tag ? ` · ${p.tag}` : ""}
                          </div>
                        </div>

                        <div className="shrink-0 rounded-[5px] bg-white/80 px-2.5 py-1.5 text-xs font-extrabold text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
                          {formatCompact(p.price)} AED
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {selectedId === null ? (
            <Card className="rounded-[5px] border border-black/10 bg-white/70 p-7 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/55">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold text-muted-foreground">
                Select a listing
              </div>
              <div className="mt-2 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                Choose a property to edit
              </div>
              <div className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
                Or click <b>New</b> to add a listing — keep it draft until it’s
                complete, then publish.
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button
                  className="h-11 rounded-[5px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
                  onClick={() => setSelectedId("new")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New property
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-[5px] bg-white/70"
                  onClick={load}
                >
                  Refresh list
                </Button>
              </div>
            </Card>
          ) : (
            <PropertyEditor
              value={draft}
              onChange={setDraft}
              onSave={save}
              onDelete={selected ? del : undefined}
              saving={saving}
              deleting={deleting}
            />
          )}
        </div>
      </div>
    </AdminShell>
  );
}