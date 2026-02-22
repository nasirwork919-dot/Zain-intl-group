import { useEffect, useMemo, useState } from "react";
import { Inbox, Copy, Mail, Phone, MessageSquareText } from "lucide-react";

import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

type LeadRow = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
};

function copyToClipboard(label: string, value: string) {
  navigator.clipboard.writeText(value);
  toast({ title: "Copied", description: `${label} copied to clipboard.` });
}

function InfoPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[5px] bg-white/75 px-3 py-2 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 ring-1 ring-black/5">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-muted-foreground">{label}:</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

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

  const empty = useMemo(
    () => !loading && items.length === 0,
    [items.length, loading],
  );

  return (
    <AdminShell title="Leads">
      <Card className="rounded-[5px] border border-black/10 bg-white/75 p-7 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
              INBOX
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Leads
            </div>
            <div className="mt-2 max-w-2xl text-sm font-semibold text-muted-foreground">
              New inquiries submitted from the website forms.
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <InfoPill
                icon={Inbox}
                label="Total"
                value={loading ? "—" : String(items.length)}
              />
              <InfoPill
                icon={MessageSquareText}
                label="Tip"
                value="Copy phone/email and follow up fast"
              />
            </div>
          </div>

          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand-2))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
            <Inbox className="h-6 w-6" />
          </div>
        </div>

        <Separator className="my-6 bg-black/10" />

        <div className="grid gap-3">
          {loading ? (
            <div className="rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/5">
              Loading…
            </div>
          ) : empty ? (
            <div className="rounded-[5px] bg-white/70 p-6 text-center ring-1 ring-black/10">
              <div className="text-lg font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                No leads yet
              </div>
              <div className="mt-1 text-sm font-semibold text-muted-foreground">
                When visitors submit the forms, they’ll appear here.
              </div>
            </div>
          ) : (
            items.map((l) => {
              const name = l.name?.trim() || "Unnamed lead";
              const when = new Date(l.created_at).toLocaleString();

              return (
                <div
                  key={l.id}
                  className={cn(
                    "rounded-[5px] border border-black/10 bg-white/70 p-5",
                    "ring-1 ring-black/5 shadow-[0_20px_60px_-55px_rgba(15,23,42,0.25)]",
                  )}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                        {name}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-muted-foreground">
                        {when} {l.source ? `· ${l.source}` : ""}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {l.phone ? (
                        <Button
                          variant="outline"
                          className="h-9 rounded-[5px] bg-white/70"
                          onClick={() => copyToClipboard("Phone", l.phone!)}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Copy phone
                          <Copy className="ml-2 h-4 w-4 opacity-70" />
                        </Button>
                      ) : null}

                      {l.email ? (
                        <Button
                          variant="outline"
                          className="h-9 rounded-[5px] bg-white/70"
                          onClick={() => copyToClipboard("Email", l.email!)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Copy email
                          <Copy className="ml-2 h-4 w-4 opacity-70" />
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {l.phone ? (
                      <div className="rounded-[5px] bg-muted/30 p-3 text-sm ring-1 ring-black/5">
                        <div className="text-xs font-semibold text-muted-foreground">
                          Phone
                        </div>
                        <div className="mt-1 font-semibold text-[hsl(var(--brand-ink))]">
                          {l.phone}
                        </div>
                      </div>
                    ) : null}
                    {l.email ? (
                      <div className="rounded-[5px] bg-muted/30 p-3 text-sm ring-1 ring-black/5">
                        <div className="text-xs font-semibold text-muted-foreground">
                          Email
                        </div>
                        <div className="mt-1 font-semibold text-[hsl(var(--brand-ink))]">
                          {l.email}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {l.message ? (
                    <div className="mt-4 rounded-[5px] bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-black/10">
                      {l.message}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </Card>
    </AdminShell>
  );
}