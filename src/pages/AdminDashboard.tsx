import { useEffect, useMemo, useState } from "react";
import { Building2, Inbox, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        cta: "Manage listings",
        onClick: () => navigate("/admin/properties"),
      },
      {
        title: "Leads",
        value: leadCount === null ? "—" : String(leadCount),
        icon: Inbox,
        cta: "Open inbox",
        onClick: () => navigate("/admin/leads"),
      },
    ],
    [leadCount, navigate, propertyCount],
  );

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4">
        <Card className="rounded-[5px] border border-black/10 bg-white/80 p-6 ring-1 ring-black/5">
          <div className="text-sm font-semibold text-muted-foreground">
            Quick actions
          </div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
            Manage inventory & inquiries
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Add new properties after you receive details via WhatsApp, then they
            appear on the website.
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              className="h-11 rounded-[5px] bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand))]/90"
              onClick={() => navigate("/admin/properties?new=1")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New property
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-[5px]"
              onClick={() => navigate("/")}
            >
              View website
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {tiles.map((t) => (
            <button key={t.title} type="button" onClick={t.onClick}>
              <Card
                className={cn(
                  "rounded-[5px] border border-black/10 bg-white/70 p-6 text-left",
                  "ring-1 ring-black/5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)]",
                  "transition hover:bg-white",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      {t.title}
                    </div>
                    <div className="mt-2 font-serif text-5xl font-semibold tracking-tight text-[hsl(var(--brand-ink))]">
                      {t.value}
                    </div>
                  </div>

                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
                    <t.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-[hsl(var(--brand-ink))]">
                  {t.cta} →
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}