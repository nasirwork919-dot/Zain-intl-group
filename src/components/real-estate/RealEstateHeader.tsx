import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/components/real-estate/site-data";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export function RealEstateHeader() {
  const active = useActiveSection([
    "top",
    "projects",
    "listings",
    "about",
    "contact",
  ]);

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
      {navLinks.map((l) => {
        const isActive = active === l.href.replace("#", "");
        return (
          <button
            key={l.href}
            onClick={() => {
              scrollTo(l.href);
              onNavigate?.();
            }}
            className={
              "group inline-flex items-center justify-between rounded-[5px] px-3 py-2 text-sm font-medium transition-colors sm:justify-start" +
              (isActive
                ? " bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))]"
                : " text-muted-foreground hover:bg-white/60 hover:text-foreground")
            }
          >
            <span>{l.label}</span>
            <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-[5px] bg-white/70 text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/5 sm:hidden">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl border border-white/30 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between px-3 py-2 sm:px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-[5px] px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/40"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#top");
              }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))] text-white shadow-sm">
                <span className="text-sm font-extrabold tracking-tight">PD</span>
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight text-foreground">
                  PrimaDom
                </span>
                <span className="block text-xs text-muted-foreground">
                  Dubai Real Estate
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <Nav />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="hidden rounded-[5px] bg-white/70 hover:bg-white sm:inline-flex"
                onClick={() => scrollTo("#contact")}
              >
                <Phone className="mr-2 h-4 w-4" />
                Request a call
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-[5px] bg-white/60 hover:bg-white sm:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Explore</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <Nav onNavigate={() => {}} />
                    <div className="mt-5 rounded-[5px] bg-muted/50 p-4">
                      <div className="text-sm font-semibold">Talk to an agent</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Get a curated shortlist in minutes.
                      </div>
                      <Button
                        className="mt-3 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/90"
                        onClick={() => scrollTo("#contact")}
                      >
                        Request a call
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}