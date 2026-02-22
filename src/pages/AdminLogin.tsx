import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  adminLogin,
  getAdminUsername,
  isAdminLoggedIn,
} from "@/components/admin/admin-auth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [username, setUsername] = useState(getAdminUsername());
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    return username.trim().length > 3 && password.length >= 8;
  }, [password.length, username]);

  if (isAdminLoggedIn()) {
    navigate(from, { replace: true });
  }

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
                Local-only access (no Supabase Auth). Use the admin username and
                password.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Admin username"
                    className="h-11 rounded-[5px] bg-white/80 pl-9"
                    autoComplete="username"
                  />
                </div>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="h-11 rounded-[5px] bg-white/80 pl-9"
                    autoComplete="current-password"
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      if (!canSubmit) return;
                      const ok = adminLogin(username, password);
                      if (!ok) {
                        toast({
                          title: "Invalid login",
                          description: "Check your username and password.",
                          variant: "destructive",
                        });
                        return;
                      }
                      toast({
                        title: "Welcome back",
                        description: "Admin access unlocked.",
                      });
                      navigate(from, { replace: true });
                    }}
                  />
                </div>

                <Button
                  disabled={!canSubmit}
                  className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92 disabled:opacity-50"
                  onClick={() => {
                    const ok = adminLogin(username, password);
                    if (!ok) {
                      toast({
                        title: "Invalid login",
                        description: "Check your username and password.",
                        variant: "destructive",
                      });
                      return;
                    }
                    toast({
                      title: "Welcome back",
                      description: "Admin access unlocked.",
                    });
                    navigate(from, { replace: true });
                  }}
                >
                  Sign in
                </Button>

                <div className="pt-1 text-xs font-semibold text-muted-foreground">
                  Tip: bookmark <span className="text-foreground">/admin</span>
                  .
                </div>
              </div>
            </Card>
          </div>

          <div className="md:col-span-5">
            <Card className="rounded-[5px] border border-black/10 bg-white/70 p-6 ring-1 ring-black/5">
              <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                How access works
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>1) Enter the single admin username/password</li>
                <li>2) We store a local session flag in your browser</li>
                <li>3) Admin pages unlock immediately</li>
              </ul>

              <div className="mt-4 rounded-[5px] bg-[hsl(var(--brand))]/10 p-4 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                Security note: this is not secure for production. If you want
                real protected admin access, we should restore Supabase Auth and
                the allowlist.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}