import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, PanelLeft, Settings } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function SideLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-between rounded-[5px] px-4 py-3 text-sm font-semibold",
          "ring-1 ring-black/10 transition",
          isActive
            ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
            : "bg-white/75 text-[hsl(var(--brand-ink))] hover:bg-white",
        )
      }
      end
    >
      <span>{label}</span>
    </NavLink>
  );
}

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/10">
              <PanelLeft className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/65">
                ADMIN
              </div>
              <div className="text-base font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                {title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-[5px]"
              onClick={() => {
                toast({
                  title: "Settings",
                  description:
                    "Tell me what settings you want and I’ll add them here.",
                });
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>

            <Button
              className="h-10 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin/login", { replace: true });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-20">
        <div className="grid gap-4 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-20 rounded-[5px] border border-black/10 bg-white/70 p-3 ring-1 ring-black/5">
              <div className="grid gap-2">
                <SideLink to="/admin" label="Dashboard" />
                <SideLink to="/admin/properties" label="Properties" />
                <SideLink to="/admin/leads" label="Leads" />
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9">{children}</section>
        </div>
      </main>
    </div>
  );
}