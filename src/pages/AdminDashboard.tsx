import { useEffect, useMemo, useState } from "react";
import { Building2, Inbox, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function KpiTile({
  title,
  value,
  icon: Icon,
  hint,
  cta,
  onClick,
  tone = "brand",
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
  cta: string;
  onClick: () => void;
  tone?: "brand" | "violet";
}) {
  const tint =
    tone === "brand"
      ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))]"
      : "bg-[hsl(var(--brand-2))]/12 text-[hsl(var(--brand-ink))]";

  return (
    <button type="button" onClick={onClick} className="text-left">
      <Card
        className={cn(
          "relative overflow-hidden rounded-[5px] border border-black/10 bg-white/70 p-6",
          "ring-1 ring-black/5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)]",
          "transition hover:bg-white",
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-black/[0.03] blur-2xl" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground">
              {title}
            </div>
            <div className="mt-2 font-serif text-5xl font-semibold tracking-tight text-[hsl(var(--brand-ink))]">
              {value}
            </div>
            <div className="mt-2 text-sm font-semibold text-muted-foreground">
              {hint}
            </div>
          </div>

          <div
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-[5px]",
              "ring-1 ring-black/10",
              tint,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--brand-ink))]">
          {cta} <ArrowRight className="h-4 w-4 opacity-80" />
        </div>
      </Card>
    </button>
  );
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [propertyCount, setPropertyCount] = useState<number | null>(null);
  const [leadCount, setLeadCount] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const [{ count: pCount }, { count: lCount }] = await Promise.all([
        supabase.from("properties").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
      ]);
      setPropertyCount(pCount ?? 0);
      setLeadCount(lCount ?? 0);
    };
    run();
  }, []);

  const tiles = useMemo(
    () => [
      {
        title: "Properties",
        value: propertyCount === null ? "—" : String(propertyCount),
        icon: Building2,
        hint: "Create, edit, publish and manage gallery/amenities.",
        cta: "Manage listings",
        onClick: () => navigate("/admin/properties"),
        tone: "brand" as const,
      },
      {
        title: "Leads",
        value: leadCount === null ? "—" : String(leadCount),
        icon: Inbox,
        hint: "Review inquiries and follow up with buyers quickly.",
        cta: "Open inbox",
        onClick: () => navigate("/admin/leads"),
        tone: "violet" as const,
      },
    ],
    [leadCount, navigate, propertyCount],
  );

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4">
        <Card className="rounded-[5px] border border-black/10 bg-white/75 p-7 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="text-xs font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
            QUICK ACTIONS
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
            Manage inventory & inquiries
          </div>
          <div className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
            Add new properties after you receive details via WhatsApp, then
            publish when ready — they’ll appear across the website instantly.
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              className="h-11 rounded-[5px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
              onClick={() => navigate("/admin/properties?new=1")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New property
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-[5px] bg-white/70"
              onClick={() => navigate("/")}
            >
              View website
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {tiles.map((t) => (
            <KpiTile key={t.title} {...t} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}