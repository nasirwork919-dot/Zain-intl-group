import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useSearchParams } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") ?? "/admin";

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        navigate(from, { replace: true });
      }
    });

    return () => data.subscription.unsubscribe();
  }, [from, navigate]);

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <Card
              className={cn(
                "rounded-[5px] border border-black/10 bg-white/85 p-6",
                "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.4)] ring-1 ring-black/5",
              )}
            >
              <div className="text-sm font-semibold text-muted-foreground">
                Admin panel
              </div>
              <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[hsl(var(--brand-ink))]">
                Sign in
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Use your admin email. Access is allowlisted.
              </p>

              <div className="mt-6">
                <Auth
                  supabaseClient={supabase}
                  providers={[]}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: "hsl(var(--brand))",
                          brandAccent: "hsl(var(--brand))",
                        },
                      },
                    },
                  }}
                  theme="light"
                />
              </div>
            </Card>
          </div>

          <div className="md:col-span-5">
            <Card className="rounded-[5px] border border-black/10 bg-white/70 p-6 ring-1 ring-black/5">
              <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                How access works
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>1) Sign in with email/password</li>
                <li>
                  2) Your email must be added to the <b>admins</b> allowlist
                </li>
                <li>3) Then you can manage listings & leads</li>
              </ul>

              <div className="mt-4 rounded-[5px] bg-[hsl(var(--brand))]/10 p-4 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                If you want “magic link” login instead of passwords, tell me and
                I’ll switch it.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}