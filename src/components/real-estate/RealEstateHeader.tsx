import { useEffect, useMemo, useState } from "react";
import { Calculator, ChevronDown, Menu, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

type NavItem =
  | { label: string; type: "scroll"; href: string; hasChevron?: boolean }
  | { label: string; type: "noop"; hasChevron?: boolean };

export function RealEstateHeader() {
  const active = useActiveSection([
    "top",
    "projects",
    "listings",
    "about",
    "contact",
  ]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Buy", type: "scroll", href: "#listings", hasChevron: true },
      { label: "Rent", type: "scroll", href: "#listings", hasChevron: true },
      {
        label: "Communities",
        type: "scroll",
        href: "#projects",
        hasChevron: true,
      },
      {
        label: "Developers",
        type: "scroll",
        href: "#projects",
        hasChevron: true,
      },
      { label: "Market Trends", type: "scroll", href: "#about" },
      {
        label: "Featured Projects",
        type: "scroll",
        href: "#projects",
      },
      { label: "Services", type: "scroll", href: "#contact", hasChevron: true },
      { label: "More", type: "scroll", href: "#about", hasChevron: true },
    ],
    [],
  );

  const activeId = active;

  const UtilityPill = ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold leading-none",
        "bg-white text-[#111827]",
        "shadow-sm ring-1 ring-black/10",
        "hover:bg-white/95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className,
      )}
    >
      {children}
    </button>
  );

  const PhonePill = ({
    label,
    onClick,
  }: {
    label: string;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
        "bg-white text-[#111827] ring-1 ring-black/10",
        "hover:bg-white/95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
      )}
    >
      <Phone className="h-4 w-4" />
      {label}
    </button>
  );

  const TopBar = () => (
    <div className="w-full bg-[#1f2937] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UtilityPill>Your Voice Matters</UtilityPill>
            <UtilityPill>List Your Property</UtilityPill>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/90 sm:flex">
              <button
                type="button"
                className="hover:text-white"
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                className="hover:text-white/95"
                aria-label="Switch to Arabic"
              >
                AR
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-white"
                aria-label="Currency"
              >
                AED
                <ChevronDown className="h-4 w-4 opacity-90" />
              </button>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <PhonePill label="Free Property Valuation" />
              <PhonePill
                label="Contact Us"
                onClick={() => scrollTo("#contact")}
              />
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
                  "bg-white text-[#111827] ring-1 ring-black/10",
                  "hover:bg-white/95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                )}
              >
                <User className="h-4 w-4" />
                Login
              </button>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 rounded-full border-white/20 bg-white/10 px-4 text-white ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                    aria-label="Open menu"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>

                  <div className="mt-4 grid gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (item.type === "scroll") scrollTo(item.href);
                          setMobileOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold",
                          "bg-muted/40 ring-1 ring-black/5 hover:bg-muted/55",
                        )}
                      >
                        <span>{item.label}</span>
                        {item.hasChevron ? (
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        ) : null}
                      </button>
                    ))}

                    <div className="mt-3 grid gap-2 rounded-2xl bg-muted/35 p-3 ring-1 ring-black/5">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span>Language</span>
                        <span className="text-foreground">EN · AR</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span>Currency</span>
                        <span className="text-foreground">AED</span>
                      </div>

                      <div className="mt-2 grid gap-2">
                        <PhonePill label="Free Property Valuation" />
                        <PhonePill
                          label="Contact Us"
                          onClick={() => {
                            scrollTo("#contact");
                            setMobileOpen(false);
                          }}
                        />
                        <button
                          type="button"
                          className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                            "bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
                          )}
                        >
                          <User className="h-4 w-4" />
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MainBar = () => (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollTo("#top")}
            className="flex items-center gap-3 rounded-xl px-1 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35"
            aria-label="Go to top"
          >
            <div className="flex items-center gap-3">
              <div className="relative grid h-11 w-11 place-items-center rounded-xl">
                <span className="text-[34px] font-black leading-none text-[#111827]">
                  D
                </span>
                <span className="absolute right-0 top-1.5 h-2.5 w-2.5 rounded-full bg-[#4b5563]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-black tracking-tight text-[#111827]">
                  D&B
                </div>
                <div className="-mt-0.5 text-sm font-black tracking-tight text-[#111827]">
                  PROPERTIES
                </div>
                <div className="mt-0.5 text-[10px] font-semibold tracking-[0.22em] text-[#6b7280]">
                  DUBAI AND BEYOND
                </div>
              </div>
            </div>
          </button>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.type === "scroll"
                  ? activeId === item.href.replace("#", "")
                  : false;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.type === "scroll") scrollTo(item.href);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-semibold",
                    "text-[#111827] hover:text-[#111827]/80",
                    isActive && "underline underline-offset-8 decoration-black/30",
                  )}
                >
                  <span>{item.label}</span>
                  {item.hasChevron ? (
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  ) : null}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            className={cn(
              "hidden lg:inline-flex",
              "h-11 w-11 items-center justify-center rounded-xl",
              "bg-[#111827] text-white shadow-sm hover:bg-[#111827]/90",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35",
            )}
            aria-label="Calculator"
          >
            <Calculator className="h-5 w-5" />
          </button>

          <button
            type="button"
            className={cn(
              "lg:hidden hidden sm:inline-flex",
              "h-11 w-11 items-center justify-center rounded-xl",
              "bg-[#111827] text-white shadow-sm hover:bg-[#111827]/90",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35",
            )}
            aria-label="Calculator"
          >
            <Calculator className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar />
      <MainBar />
    </header>
  );
}