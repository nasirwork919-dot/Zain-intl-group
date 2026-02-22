import { useEffect, useMemo, useState } from "react";
import { Inbox } from "lucide-react";

import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LeadRow = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
};

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("id,name,phone,email,message,source,created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems((data ?? []) as LeadRow[]);
      setLoading(false);
    };
    load();
  }, []);

  const empty = useMemo(() => !loading && items.length === 0, [items.length, loading]);

  return (
    <AdminShell title="Leads">
      <Card className="rounded-[5px] border border-black/10 bg-white/80 p-6 ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground">
              Inbox
            </div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Leads
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              New inquiries submitted from the website forms.
            </div>
          </div>

          <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
            <Inbox className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {loading ? (
            <div className="rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/5">
              Loading…
            </div>
          ) : empty ? (
            <div className="rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/5">
              No leads yet.
            </div>
          ) : (
            items.map((l) => (
              <div
                key={l.id}
                className={cn(
                  "rounded-[5px] border border-black/10 bg-white/70 p-4",
                  "ring-1 ring-black/5",
                )}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                      {l.name || "Unnamed lead"}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-muted-foreground">
                      {new Date(l.created_at).toLocaleString()}{" "}
                      {l.source ? `· ${l.source}` : ""}
                    </div>
                  </div>

                  <div className="grid gap-1 text-sm">
                    {l.phone ? <div><span className="font-semibold">Phone:</span> {l.phone}</div> : null}
                    {l.email ? <div><span className="font-semibold">Email:</span> {l.email}</div> : null}
                  </div>
                </div>

                {l.message ? (
                  <div className="mt-3 rounded-[5px] bg-muted/35 p-3 text-sm text-muted-foreground ring-1 ring-black/5">
                    {l.message}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </Card>
    </AdminShell>
  );
}