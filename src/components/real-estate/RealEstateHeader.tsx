import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, ChevronDown, Menu, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BuyMegaMenu } from "@/components/real-estate/BuyMegaMenu";
import { toast } from "@/hooks/use-toast";
import { RentMegaMenu } from "@/components/real-estate/RentMegaMenu";
import { MarketTrendsMegaMenu } from "@/components/real-estate/MarketTrendsMegaMenu";
import { ServicesMegaMenu } from "@/components/real-estate/ServicesMegaMenu";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_OPTIONS, slugifyNavLabel } from "@/components/real-estate/nav-config";

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
  | {
      label: string;
      type: "route" | "scroll";
      href: string;
      hasChevron?: boolean;
      mega?: "buy" | "rent" | "featured-projects" | "services" | "off-plan";
    }
  | { label: string; type: "noop"; hasChevron?: boolean };

type MobileSectionKey =
  | "buy"
  | "rent"
  | "off-plan"
  | "featured-projects"
  | "services"
  | null;

function MobileMenuSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[5px] bg-muted/35 ring-1 ring-black/5">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold",
          "hover:bg-muted/50 rounded-[5px]",
        )}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-70 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </div>
  );
}

function MobileMenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-[5px] px-3 py-3 text-left text-sm font-semibold",
        "bg-white/70 ring-1 ring-black/5 hover:bg-white",
        "text-[#11124a]",
      )}
    >
      <span>{label}</span>
    </button>
  );
}

type CurrencyCode = "AED" | "EUR" | "GBP" | "USD";

export function RealEstateHeader() {
  const navigate = useNavigate();
  const active = useActiveSection([
    "top",
    "projects",
    "listings",
    "about",
    "contact",
  ]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [buyOpen, setBuyOpen] = useState(false);
  const [rentOpen, setRentOpen] = useState(false);
  const [featuredProjectsOpen, setFeaturedProjectsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [mobileOpenSection, setMobileOpenSection] =
    useState<MobileSectionKey>(null);

  const [mobileCurrency, setMobileCurrency] = useState("AED");
  const [topCurrency, setTopCurrency] = useState<CurrencyCode>("AED");

  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleClose = (ms = 140) => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setBuyOpen(false);
      setRentOpen(false);
      setFeaturedProjectsOpen(false);
      setServicesOpen(false);
    }, ms);
  };

  const closeMegas = () => {
    cancelClose();
    setBuyOpen(false);
    setRentOpen(false);
    setFeaturedProjectsOpen(false);
    setServicesOpen(false);
  };

  const openOnly = (key: "buy" | "rent" | "featured-projects" | "services") => {
    cancelClose();
    setBuyOpen(key === "buy");
    setRentOpen(key === "rent");
    setFeaturedProjectsOpen(key === "featured-projects");
    setServicesOpen(key === "services");
  };

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "BUY",
        type: "route",
        href: "/nav/buy",
        hasChevron: true,
        mega: "buy",
      },
      {
        label: "RENT",
        type: "route",
        href: "/nav/rent",
        hasChevron: true,
        mega: "rent",
      },
      {
        label: "OFF-PLAN",
        type: "route",
        href: "/nav/buy/off-plan",
        hasChevron: false,
        mega: "off-plan",
      },
      {
        label: "FEATURED PROJECTS",
        type: "route",
        href: "/nav/featured-projects",
        hasChevron: true,
        mega: "featured-projects",
      },
      {
        label: "OUR SERVICES",
        type: "route",
        href: "/nav/services",
        hasChevron: true,
        mega: "services",
      },
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

  const TopCurrencyTabs = () => {
    const codes: CurrencyCode[] = ["AED", "EUR", "GBP", "USD"];

    const tabClass = (active: boolean) =>
      cn(
        "rounded-full px-3 py-1.5 text-xs font-semibold transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
        active ? "text-white" : "text-white/80 hover:text-white",
      );

    return (
      <div className="inline-flex items-center gap-4">
        {codes.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => {
              setTopCurrency(code);
              toast({
                title: "Currency updated",
                description: `Selected ${code}.`,
              });
            }}
            className={tabClass(topCurrency === code)}
            aria-pressed={topCurrency === code}
          >
            {code}
          </button>
        ))}
      </div>
    );
  };

  const TopBar = () => (
    <div className="w-full bg-[#1f2937] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <UtilityPill>List Your Property</UtilityPill>
          </div>

          <div className="hidden lg:flex" />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/90 sm:flex">
              <div className="hidden items-center gap-3 lg:flex">
                <UtilityPill>List Your Property</UtilityPill>
              </div>

              <TopCurrencyTabs />
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <PhonePill label="Free Property Valuation" />
              <PhonePill
                label="Contact Us"
                onClick={() => navigate("/nav/services")}
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

            <div className="md:hidden">
              <Sheet
                open={mobileOpen}
                onOpenChange={(v) => {
                  setMobileOpen(v);
                  if (!v) setMobileOpenSection(null);
                }}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 rounded-full border-white/20 bg-white/10 px-4 text-white ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
                    aria-label="Open menu"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[340px] p-0">
                  <div className="flex h-full flex-col">
                    <div className="px-4 pt-4">
                      <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                      </SheetHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
                      <div className="grid gap-3">
                        <MobileMenuSection
                          title="BUY"
                          open={mobileOpenSection === "buy"}
                          onToggle={() => {
                            navigate("/nav/buy");
                            setMobileOpen(false);
                          }}
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.buy.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label.toUpperCase()}
                                onClick={() => {
                                  navigate(`/nav/buy/option/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="RENT"
                          open={mobileOpenSection === "rent"}
                          onToggle={() => {
                            navigate("/nav/rent");
                            setMobileOpen(false);
                          }}
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.rent.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label.toUpperCase()}
                                onClick={() => {
                                  navigate(`/nav/rent/option/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="OFF-PLAN"
                          open={mobileOpenSection === "off-plan"}
                          onToggle={() => {
                            navigate("/nav/buy/off-plan");
                            setMobileOpen(false);
                          }}
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.buy.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label.toUpperCase()}
                                onClick={() => {
                                  navigate(`/nav/buy/option/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="FEATURED PROJECTS"
                          open={mobileOpenSection === "featured-projects"}
                          onToggle={() => {
                            navigate("/nav/featured-projects");
                            setMobileOpen(false);
                          }}
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS["featured-projects"].map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label.toUpperCase()}
                                onClick={() => {
                                  navigate(
                                    `/nav/featured-projects/option/${o.slug}`,
                                  );
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="OUR SERVICES"
                          open={mobileOpenSection === "services"}
                          onToggle={() => {
                            navigate("/nav/services");
                            setMobileOpen(false);
                          }}
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.services.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label.toUpperCase()}
                                onClick={() => {
                                  navigate(`/nav/services/option/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <div className="rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
                          <div className="text-xs font-semibold text-muted-foreground">
                            Currency
                          </div>

                          <div className="mt-3">
                            <Select
                              value={mobileCurrency}
                              onValueChange={(v) => setMobileCurrency(v)}
                            >
                              <SelectTrigger className="h-11 rounded-[5px] bg-white/70 ring-1 ring-black/5">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent className="rounded-[5px]">
                                <SelectItem value="AED">AED</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                              </SelectContent>
                            </Select>

                            <Separator className="my-4" />

                            <Button
                              className="h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                              onClick={() => {
                                toast({
                                  title: "Saved",
                                  description: `Currency: ${mobileCurrency}`,
                                });
                                setMobileOpen(false);
                              }}
                            >
                              Save preferences
                            </Button>
                          </div>
                        </div>
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
            onClick={() => navigate("/")}
            className="flex items-center gap-3 rounded-xl px-1 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35"
            aria-label="Go to home"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
                <BrandLogo variant="mark" className="h-9 w-9" />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-black tracking-tight text-[#111827]">
                  Zain
                </div>
                <div className="-mt-0.5 text-sm font-black tracking-tight text-[#111827]">
                  International Group
                </div>
                <div className="mt-0.5 text-[10px] font-semibold tracking-[0.22em] text-[#6b7280]">
                  REAL ESTATE · DUBAI
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

              const mega = item.type !== "noop" ? item.mega : undefined;

              const expanded =
                mega === "buy"
                  ? buyOpen
                  : mega === "rent"
                    ? rentOpen
                    : mega === "featured-projects"
                      ? featuredProjectsOpen
                      : mega === "services"
                        ? servicesOpen
                        : undefined;

              const baseLinkClass = cn(
                "inline-flex items-center gap-1 text-sm font-semibold tracking-[0.08em]",
                "text-[#111827] hover:text-[#111827]/80",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35 rounded-[5px] px-2 py-1",
                isActive &&
                  !mega &&
                  "underline underline-offset-8 decoration-black/30",
              );

              const onHoverOpen = () => {
                if (!mega) return;
                if (mega === "off-plan") return;
                openOnly(mega);
              };

              if (item.type === "route") {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onMouseEnter={() => {
                      onHoverOpen();
                      cancelClose();
                    }}
                    onMouseLeave={() => {
                      scheduleClose(140);
                    }}
                    onClick={() => closeMegas()}
                    className={baseLinkClass}
                    aria-expanded={expanded}
                  >
                    <span>{item.label}</span>
                    {item.hasChevron ? (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform",
                          expanded && "rotate-180",
                        )}
                      />
                    ) : null}
                  </Link>
                );
              }

              if (item.type === "scroll") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={() => {
                      onHoverOpen();
                      cancelClose();
                    }}
                    onMouseLeave={() => scheduleClose(140)}
                    onClick={() => {
                      closeMegas();
                      scrollTo(item.href);
                    }}
                    className={baseLinkClass}
                    aria-expanded={expanded}
                  >
                    <span>{item.label}</span>
                    {item.hasChevron ? (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform",
                          expanded && "rotate-180",
                        )}
                      />
                    ) : null}
                  </button>
                );
              }

              return null;
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
            onClick={() =>
              toast({
                title: "Calculator",
                description: "We can add a mortgage calculator next.",
              })
            }
          >
            <Calculator className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const anyOpen = buyOpen || rentOpen || featuredProjectsOpen || servicesOpen;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => {
        if (anyOpen) scheduleClose(140);
      }}
    >
      <TopBar />
      <MainBar />

      <div
        className="hidden lg:block"
        onMouseEnter={() => cancelClose()}
        onMouseLeave={() => scheduleClose(140)}
      >
        <BuyMegaMenu
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/buy/option/${slug}`);
          }}
        />

        <RentMegaMenu
          open={rentOpen}
          onClose={() => setRentOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/rent/option/${slug}`);
          }}
        />

        <MarketTrendsMegaMenu
          open={featuredProjectsOpen}
          onClose={() => setFeaturedProjectsOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/featured-projects/option/${slug}`);
          }}
        />

        <ServicesMegaMenu
          open={servicesOpen}
          onClose={() => setServicesOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/services/option/${slug}`);
          }}
        />
      </div>
    </header>
  );
}