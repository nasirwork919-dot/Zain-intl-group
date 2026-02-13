import { useEffect, useMemo, useState } from "react";
import { Calculator, ChevronDown, Menu, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import { CommunitiesMegaMenu } from "@/components/real-estate/CommunitiesMegaMenu";
import { DevelopersMegaMenu } from "@/components/real-estate/DevelopersMegaMenu";
import { MarketTrendsMegaMenu } from "@/components/real-estate/MarketTrendsMegaMenu";
import { ServicesMegaMenu } from "@/components/real-estate/ServicesMegaMenu";
import { MoreMegaMenu } from "@/components/real-estate/MoreMegaMenu";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  NAV_OPTIONS,
  slugifyNavLabel,
  type NavCategoryKey,
} from "@/components/real-estate/nav-config";

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
      mega?:
        | "buy"
        | "rent"
        | "communities"
        | "developers"
        | "featured-projects"
        | "services"
        | "more";
    }
  | { label: string; type: "noop"; hasChevron?: boolean };

type MobileSectionKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "featured-projects"
  | "services"
  | "more"
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
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [featuredProjectsOpen, setFeaturedProjectsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [mobileOpenSection, setMobileOpenSection] =
    useState<MobileSectionKey>(null);

  const [mobileCurrency, setMobileCurrency] = useState("AED");
  const [topCurrency, setTopCurrency] = useState<CurrencyCode>("AED");

  const scrollTo = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeMegas = () => {
    setBuyOpen(false);
    setRentOpen(false);
    setCommunitiesOpen(false);
    setDevelopersOpen(false);
    setFeaturedProjectsOpen(false);
    setServicesOpen(false);
    setMoreOpen(false);
  };

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "Buy",
        type: "route",
        href: "/nav/buy",
        hasChevron: true,
        mega: "buy",
      },
      {
        label: "Rent",
        type: "route",
        href: "/nav/rent",
        hasChevron: true,
        mega: "rent",
      },
      {
        label: "Communities",
        type: "route",
        href: "/nav/communities",
        hasChevron: true,
        mega: "communities",
      },
      {
        label: "Developers",
        type: "route",
        href: "/nav/developers",
        hasChevron: true,
        mega: "developers",
      },
      {
        label: "Featured Projects",
        type: "route",
        href: "/nav/featured-projects",
        hasChevron: true,
        mega: "featured-projects",
      },
      {
        label: "Services",
        type: "route",
        href: "/nav/services",
        hasChevron: true,
        mega: "services",
      },
      {
        label: "More",
        type: "route",
        href: "/nav/more",
        hasChevron: true,
        mega: "more",
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
              <PhonePill label="Contact Us" onClick={() => navigate("/nav/services")} />
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

                    {/* Scrollable navbar content only */}
                    <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
                      <div className="grid gap-3">
                        <MobileMenuSection
                          title="Buy"
                          open={mobileOpenSection === "buy"}
                          onToggle={() =>
                            setMobileOpenSection((k) => (k === "buy" ? null : "buy"))
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.buy.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/buy/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Rent"
                          open={mobileOpenSection === "rent"}
                          onToggle={() =>
                            setMobileOpenSection((k) => (k === "rent" ? null : "rent"))
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.rent.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/rent/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Communities"
                          open={mobileOpenSection === "communities"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "communities" ? null : "communities",
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.communities.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/communities/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Developers"
                          open={mobileOpenSection === "developers"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "developers" ? null : "developers",
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.developers.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/developers/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Featured Projects"
                          open={mobileOpenSection === "featured-projects"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "featured-projects" ? null : "featured-projects",
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS["featured-projects"].map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/featured-projects/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Services"
                          open={mobileOpenSection === "services"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "services" ? null : "services",
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.services.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/services/${o.slug}`);
                                  setMobileOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="More"
                          open={mobileOpenSection === "more"}
                          onToggle={() =>
                            setMobileOpenSection((k) => (k === "more" ? null : "more"))
                          }
                        >
                          <div className="grid gap-2">
                            {NAV_OPTIONS.more.map((o) => (
                              <MobileMenuItem
                                key={o.slug}
                                label={o.label}
                                onClick={() => {
                                  navigate(`/nav/more/${o.slug}`);
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
              const isBuy = mega === "buy";
              const isRent = mega === "rent";
              const isCommunities = mega === "communities";
              const isDevelopers = mega === "developers";
              const isFeaturedProjects = mega === "featured-projects";
              const isServices = mega === "services";
              const isMore = mega === "more";

              const expanded = isBuy
                ? buyOpen
                : isRent
                  ? rentOpen
                  : isCommunities
                    ? communitiesOpen
                    : isDevelopers
                      ? developersOpen
                      : isFeaturedProjects
                        ? featuredProjectsOpen
                        : isServices
                          ? servicesOpen
                          : isMore
                            ? moreOpen
                            : undefined;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    const closeAllAnd = () => {
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    };

                    if (isBuy) {
                      setBuyOpen((v) => !v);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isRent) {
                      setRentOpen((v) => !v);
                      setBuyOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isCommunities) {
                      setCommunitiesOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isDevelopers) {
                      setDevelopersOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isFeaturedProjects) {
                      setFeaturedProjectsOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isServices) {
                      setServicesOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isMore) {
                      setMoreOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      return;
                    }

                    closeAllAnd();
                    if (item.type === "route") navigate(item.href);
                    if (item.type === "scroll") scrollTo(item.href);
                  }}
                  onMouseEnter={() => {
                    if (isBuy) {
                      setBuyOpen(true);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isRent) {
                      setRentOpen(true);
                      setBuyOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isCommunities) {
                      setCommunitiesOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isDevelopers) {
                      setDevelopersOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isFeaturedProjects) {
                      setFeaturedProjectsOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isServices) {
                      setServicesOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setMoreOpen(false);
                    }
                    if (isMore) {
                      setMoreOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setFeaturedProjectsOpen(false);
                      setServicesOpen(false);
                    }
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-semibold",
                    "text-[#111827] hover:text-[#111827]/80",
                    isActive &&
                      !isBuy &&
                      !isRent &&
                      !isCommunities &&
                      !isDevelopers &&
                      !isFeaturedProjects &&
                      !isServices &&
                      !isMore &&
                      "underline underline-offset-8 decoration-black/30",
                  )}
                  aria-expanded={expanded}
                >
                  <span>{item.label}</span>
                  {item.hasChevron ? (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 opacity-70 transition-transform",
                        ((isBuy && buyOpen) ||
                          (isRent && rentOpen) ||
                          (isCommunities && communitiesOpen) ||
                          (isDevelopers && developersOpen) ||
                          (isFeaturedProjects && featuredProjectsOpen) ||
                          (isServices && servicesOpen) ||
                          (isMore && moreOpen)) &&
                          "rotate-180",
                      )}
                    />
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

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={closeMegas}>
      <TopBar />
      <MainBar />

      <div className="hidden lg:block">
        <BuyMegaMenu
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/buy/${slug}`);
          }}
        />

        <RentMegaMenu
          open={rentOpen}
          onClose={() => setRentOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/rent/${slug}`);
          }}
        />

        <CommunitiesMegaMenu
          open={communitiesOpen}
          onClose={() => setCommunitiesOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/communities/${slug}`);
          }}
        />

        <DevelopersMegaMenu
          open={developersOpen}
          onClose={() => setDevelopersOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/developers/${slug}`);
          }}
        />

        <MarketTrendsMegaMenu
          open={featuredProjectsOpen}
          onClose={() => setFeaturedProjectsOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/featured-projects/${slug}`);
          }}
        />

        <ServicesMegaMenu
          open={servicesOpen}
          onClose={() => setServicesOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/services/${slug}`);
          }}
        />

        <MoreMegaMenu
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          onNavigate={(label) => {
            const slug = slugifyNavLabel(label);
            navigate(`/nav/more/${slug}`);
          }}
        />
      </div>
    </header>
  );
}
