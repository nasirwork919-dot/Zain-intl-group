import { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AdminGateState =
  | { status: "loading" }
  | { status: "denied" }
  | { status: "allowed"; userId: string; email: string };

export function AdminGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [state, setState] = useState<AdminGateState>({ status: "loading" });

  const from = useMemo(() => {
    const next = location.pathname + location.search;
    return next.startsWith("/admin") ? next : "/admin";
  }, [location.pathname, location.search]);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user?.email) {
        if (!cancelled) setState({ status: "denied" });
        return;
      }

      const { data: adminRow, error } = await supabase
        .from("admins")
        .select("id,email,active")
        .eq("email", user.email)
        .eq("active", true)
        .maybeSingle();

      if (error) {
        // This usually indicates the table doesn't exist yet.
        toast({
          title: "Admin check failed",
          description:
            "Could not verify admin access. Ensure the `admins` table exists in Supabase.",
          variant: "destructive",
        });
        throw error;
      }

      if (!adminRow) {
        toast({
          title: "Access denied",
          description:
            "This account is not an admin. Ask your team to add your email to the allowlist.",
          variant: "destructive",
        });
        if (!cancelled) setState({ status: "denied" });
        return;
      }

      if (!cancelled)
        setState({ status: "allowed", userId: user.id, email: user.email });
    };

    check();

    const { data } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <div className="mx-auto max-w-3xl px-4 pt-28">
          <div className="rounded-[5px] border border-black/10 bg-white/80 p-6 text-left shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
            <div className="text-sm font-semibold text-muted-foreground">
              Admin
            </div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              Checking access…
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Please wait a moment.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "denied") {
    return <Navigate to={`/admin/login?from=${encodeURIComponent(from)}`} replace />;
  }

  return <>{children}</>;
}