import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  PanelLeft,
  Settings,
  LayoutDashboard,
  Building2,
  Inbox,
  ExternalLink,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { adminLogout } from "@/components/admin/admin-auth";

function SideLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-[5px] px-4 py-3 text-sm font-semibold",
          "ring-1 ring-black/10 transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
          isActive
            ? "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))] ring-[hsl(var(--brand))]/25"
            : "bg-white/70 text-[hsl(var(--brand-ink))] hover:bg-white",
        )
      }
      end
    >
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-[5px]",
          "ring-1 ring-black/10",
          "bg-white/70 text-[hsl(var(--brand-ink))]",
          "transition group-hover:bg-white",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div className="min-w-0">
        <div className="truncate">{label}</div>
        <div className="mt-0.5 text-[11px] font-semibold text-muted-foreground">
          {to === "/admin"
            ? "KPIs & quick actions"
            : to === "/admin/properties"
              ? "Listings & publishing"
              : "Inbox & inquiries"}
        </div>
      </div>
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
      {/* ambient blobs for premium depth */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[hsl(var(--brand))]/10 blur-3xl" />
        <div className="absolute -bottom-44 -right-44 h-[520px] w-[520px] rounded-full bg-[hsl(var(--brand-2))]/12 blur-3xl" />
        <div className="absolute left-1/3 top-24 h-[260px] w-[260px] rounded-full bg-white/60 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "grid h-10 w-10 place-items-center rounded-[5px]",
                "bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))]",
                "ring-1 ring-black/10",
              )}
            >
              <PanelLeft className="h-5 w-5" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="text-[10px] font-extrabold tracking-[0.22em] text-[hsl(var(--brand-ink))]/60">
                ADMIN CONSOLE
              </div>
              <div className="truncate text-base font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                {title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-10 rounded-[5px] bg-white/70 sm:inline-flex"
              onClick={() => navigate("/")}
            >
              View website
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="h-10 rounded-[5px] bg-white/70"
              onClick={() => {
                toast({
                  title: "Settings",
                  description:
                    "Tell me which settings you want (WhatsApp number, contact email, etc.) and I’ll add them here.",
                });
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>

            <Button
              className="h-10 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              onClick={() => {
                adminLogout();
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
            <div
              className={cn(
                "sticky top-20 overflow-hidden rounded-[5px]",
                "border border-black/10 bg-white/55",
                "shadow-[0_30px_90px_-70px_rgba(15,23,42,0.45)]",
                "ring-1 ring-black/5",
                "backdrop-blur supports-[backdrop-filter]:bg-white/45",
              )}
            >
              <div className="border-b border-black/10 bg-white/55 px-4 py-4 backdrop-blur">
                <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  Navigation
                </div>
                <div className="mt-1 text-xs font-semibold text-muted-foreground">
                  Manage listings and incoming inquiries.
                </div>
              </div>

              <div className="grid gap-2 p-3">
                <SideLink to="/admin" label="Dashboard" icon={LayoutDashboard} />
                <SideLink
                  to="/admin/properties"
                  label="Properties"
                  icon={Building2}
                />
                <SideLink to="/admin/leads" label="Leads" icon={Inbox} />
              </div>

              <div className="border-t border-black/10 p-4">
                <div className="rounded-[5px] bg-[hsl(var(--brand))]/10 p-4 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                  Tip: keep listings as <b>Draft</b> until images + description
                  are complete.
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9">{children}</section>
        </div>
      </main>
    </div>
  );
}