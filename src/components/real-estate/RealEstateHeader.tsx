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
import { BuyMegaMenu } from "@/components/real-estate/BuyMegaMenu";
import { toast } from "@/hooks/use-toast";
import { TopBarPreferencesPopover } from "@/components/real-estate/TopBarPreferencesPopover";
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
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

type NavItem =
  | {
      label: string;
      type: "scroll";
      href: string;
      hasChevron?: boolean;
      mega?:
        | "buy"
        | "rent"
        | "communities"
        | "developers"
        | "marketTrends"
        | "services"
        | "more";
    }
  | { label: string; type: "noop"; hasChevron?: boolean };

type MobileSectionKey =
  | "buy"
  | "rent"
  | "communities"
  | "developers"
  | "marketTrends"
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
          "hover:bg-muted/50 rounded-[5px]"
        )}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-70 transition-transform",
            open && "rotate-180"
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
        "text-[#11124a]"
      )}
    >
      <span>{label}</span>
    </button>
  );
}

export function RealEstateHeader() {
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
  const [marketTrendsOpen, setMarketTrendsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [mobileOpenSection, setMobileOpenSection] = useState<MobileSectionKey>(
    null
  );

  const [mobileLanguage, setMobileLanguage] = useState("en");
  const [mobileCurrency, setMobileCurrency] = useState("AED");

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
    setMarketTrendsOpen(false);
    setServicesOpen(false);
    setMoreOpen(false);
  };

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "Buy",
        type: "scroll",
        href: "#listings",
        hasChevron: true,
        mega: "buy",
      },
      {
        label: "Rent",
        type: "scroll",
        href: "#listings",
        hasChevron: true,
        mega: "rent",
      },
      {
        label: "Communities",
        type: "scroll",
        href: "#projects",
        hasChevron: true,
        mega: "communities",
      },
      {
        label: "Developers",
        type: "scroll",
        href: "#projects",
        hasChevron: true,
        mega: "developers",
      },
      {
        label: "Market Trends",
        type: "scroll",
        href: "#about",
        hasChevron: true,
        mega: "marketTrends",
      },
      {
        label: "Featured Projects",
        type: "scroll",
        href: "#projects",
      },
      {
        label: "Services",
        type: "scroll",
        href: "#contact",
        hasChevron: true,
        mega: "services",
      },
      {
        label: "More",
        type: "scroll",
        href: "#about",
        hasChevron: true,
        mega: "more",
      },
    ],
    []
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
        className
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
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
          <div className="flex items-center gap-3 lg:hidden">
            <UtilityPill>Your Voice Matters</UtilityPill>
            <UtilityPill>List Your Property</UtilityPill>
          </div>

          <div className="hidden lg:flex" />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/90 sm:flex">
              <div className="hidden items-center gap-3 lg:flex">
                <UtilityPill>Your Voice Matters</UtilityPill>
                <UtilityPill>List Your Property</UtilityPill>
              </div>

              <TopBarPreferencesPopover
                trigger={
                  <div className="inline-flex items-center gap-4">
                    <span className="hover:text-white">EN</span>
                    <span className="hover:text-white/95">AR</span>
                    <span className="inline-flex items-center gap-1 hover:text-white">
                      AED
                      <ChevronDown className="h-4 w-4 opacity-90" />
                    </span>
                  </div>
                }
              />
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <PhonePill label="Free Property Valuation" />
              <PhonePill label="Contact Us" onClick={() => scrollTo("#contact")} />
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
                  "bg-white text-[#111827] ring-1 ring-black/10",
                  "hover:bg-white/95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
                            {["Apartments", "Townhouses", "Penthouses", "Villas", "View All"].map(
                              (label) => (
                                <MobileMenuItem
                                  key={label}
                                  label={label}
                                  onClick={() => {
                                    scrollTo("#listings");
                                    setMobileOpen(false);
                                    toast({
                                      title: `Buy · ${label}`,
                                      description:
                                        "Showing listings — we can wire these to filters next.",
                                    });
                                  }}
                                />
                              )
                            )}
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
                            {["Apartments", "Offices", "Townhouses", "Villas", "Commercial"].map(
                              (label) => (
                                <MobileMenuItem
                                  key={label}
                                  label={label}
                                  onClick={() => {
                                    scrollTo("#listings");
                                    setMobileOpen(false);
                                    toast({
                                      title: `Rent · ${label}`,
                                      description:
                                        "Showing listings — we can wire these to filters next.",
                                    });
                                  }}
                                />
                              )
                            )}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Communities"
                          open={mobileOpenSection === "communities"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "communities" ? null : "communities"
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {[
                              "Dubai Marina",
                              "Dubai Creek Harbour",
                              "Jumeirah Village Circle (JVC)",
                              "Dubai Hills Estate",
                              "Jumeirah Beach Residence (JBR)",
                              "Palm Jebel Ali",
                              "Downtown Dubai",
                              "Palm Jumeirah",
                            ].map((label) => (
                              <MobileMenuItem
                                key={label}
                                label={label}
                                onClick={() => {
                                  scrollTo("#projects");
                                  setMobileOpen(false);
                                  toast({
                                    title: `Community · ${label}`,
                                    description:
                                      "Opened communities section — we can wire this to filters next.",
                                  });
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
                              k === "developers" ? null : "developers"
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {["Emaar", "Nakheel", "Danube", "Select Group", "View All Developers"].map(
                              (label) => (
                                <MobileMenuItem
                                  key={label}
                                  label={label}
                                  onClick={() => {
                                    scrollTo("#projects");
                                    setMobileOpen(false);
                                    toast({
                                      title: `Developer · ${label}`,
                                      description:
                                        "Opened projects section — we can wire this to a developer filter next.",
                                    });
                                  }}
                                />
                              )
                            )}
                          </div>
                        </MobileMenuSection>

                        <MobileMenuSection
                          title="Market Trends"
                          open={mobileOpenSection === "marketTrends"}
                          onToggle={() =>
                            setMobileOpenSection((k) =>
                              k === "marketTrends" ? null : "marketTrends"
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {[
                              "Daily Transaction",
                              "Rental Transaction",
                              "Sale Transaction",
                              "Market Guide",
                            ].map((label) => (
                              <MobileMenuItem
                                key={label}
                                label={label}
                                onClick={() => {
                                  scrollTo("#about");
                                  setMobileOpen(false);
                                  toast({
                                    title: `Market Trends · ${label}`,
                                    description:
                                      "We can create these pages/sections next.",
                                  });
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
                              k === "services" ? null : "services"
                            )
                          }
                        >
                          <div className="grid gap-2">
                            {[
                              "Asset Management",
                              "Holiday Homes",
                              "Commercial",
                              "Investment Advisory",
                              "Luxury",
                              "Property Valuation",
                              "List Your Property",
                              "Mortgage Advisory",
                            ].map((label) => (
                              <MobileMenuItem
                                key={label}
                                label={label}
                                onClick={() => {
                                  scrollTo("#contact");
                                  setMobileOpen(false);
                                  toast({
                                    title: `Services · ${label}`,
                                    description:
                                      "We can create a dedicated service page next.",
                                  });
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
                            {["About Us", "Careers", "Reports", "News", "Blogs", "Media"].map(
                              (label) => (
                                <MobileMenuItem
                                  key={label}
                                  label={label}
                                  onClick={() => {
                                    scrollTo("#about");
                                    setMobileOpen(false);
                                    toast({
                                      title: `More · ${label}`,
                                      description:
                                        "We can create these pages/sections next.",
                                    });
                                  }}
                                />
                              )
                            )}
                          </div>
                        </MobileMenuSection>

                        <div className="rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
                          <div className="text-xs font-semibold text-muted-foreground">
                            Preferences
                          </div>

                          <div className="mt-3 grid gap-3">
                            <div>
                              <div className="text-xs font-semibold text-foreground">
                                Language
                              </div>
                              <Select
                                value={mobileLanguage}
                                onValueChange={(v) => setMobileLanguage(v)}
                              >
                                <SelectTrigger className="mt-2 h-11 rounded-[5px] bg-white/70 ring-1 ring-black/5">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent className="rounded-[5px]">
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="ar">العربية</SelectItem>
                                  <SelectItem value="zh">中文</SelectItem>
                                  <SelectItem value="ru">Русский</SelectItem>
                                  <SelectItem value="de">Deutsch</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <div className="text-xs font-semibold text-foreground">
                                Currency
                              </div>
                              <Select
                                value={mobileCurrency}
                                onValueChange={(v) => setMobileCurrency(v)}
                              >
                                <SelectTrigger className="mt-2 h-11 rounded-[5px] bg-white/70 ring-1 ring-black/5">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent className="rounded-[5px]">
                                  <SelectItem value="AED">AED</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="USDT">USDT</SelectItem>
                                  <SelectItem value="BTC">BTC</SelectItem>
                                  <SelectItem value="ETH">ETH</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <Separator className="my-1" />

                            <Button
                              className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                              onClick={() => {
                                toast({
                                  title: "Saved",
                                  description: `Language: ${mobileLanguage.toUpperCase()} · Currency: ${mobileCurrency}`,
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
            onClick={() => scrollTo("#top")}
            className="flex items-center gap-3 rounded-xl px-1 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35"
            aria-label="Go to top"
          >
            <div className="flex items-center gap-3">
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-[#111827] text-white ring-1 ring-black/10">
                <span className="text-[22px] font-black leading-none">Z</span>
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[hsl(var(--brand))]" />
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

              const mega = item.type === "scroll" ? item.mega : undefined;
              const isBuy = mega === "buy";
              const isRent = mega === "rent";
              const isCommunities = mega === "communities";
              const isDevelopers = mega === "developers";
              const isMarketTrends = mega === "marketTrends";
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
                      : isMarketTrends
                        ? marketTrendsOpen
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
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    };

                    if (isBuy) {
                      setBuyOpen((v) => !v);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isRent) {
                      setRentOpen((v) => !v);
                      setBuyOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isCommunities) {
                      setCommunitiesOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isDevelopers) {
                      setDevelopersOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isMarketTrends) {
                      setMarketTrendsOpen((v) => !v);
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
                      setMarketTrendsOpen(false);
                      setMoreOpen(false);
                      return;
                    }
                    if (isMore) {
                      setMoreOpen((v) => !v);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      return;
                    }

                    closeAllAnd();
                    if (item.type === "scroll") scrollTo(item.href);
                  }}
                  onMouseEnter={() => {
                    if (isBuy) {
                      setBuyOpen(true);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isRent) {
                      setRentOpen(true);
                      setBuyOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isCommunities) {
                      setCommunitiesOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isDevelopers) {
                      setDevelopersOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setMarketTrendsOpen(false);
                      setServicesOpen(false);
                      setMoreOpen(false);
                    }
                    if (isMarketTrends) {
                      setMarketTrendsOpen(true);
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
                      setMarketTrendsOpen(false);
                      setMoreOpen(false);
                    }
                    if (isMore) {
                      setMoreOpen(true);
                      setBuyOpen(false);
                      setRentOpen(false);
                      setCommunitiesOpen(false);
                      setDevelopersOpen(false);
                      setMarketTrendsOpen(false);
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
                      !isMarketTrends &&
                      !isServices &&
                      !isMore &&
                      "underline underline-offset-8 decoration-black/30"
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
                          (isMarketTrends && marketTrendsOpen) ||
                          (isServices && servicesOpen) ||
                          (isMore && moreOpen)) &&
                          "rotate-180"
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
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35"
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

          <button
            type="button"
            className={cn(
              "lg:hidden hidden sm:inline-flex",
              "h-11 w-11 items-center justify-center rounded-xl",
              "bg-[#111827] text-white shadow-sm hover:bg-[#111827]/90",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35"
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
            scrollTo("#listings");
            toast({
              title: `Buy · ${label}`,
              description: "Showing listings — we can wire these to filters next.",
            });
          }}
        />

        <RentMegaMenu
          open={rentOpen}
          onClose={() => setRentOpen(false)}
          onNavigate={(label) => {
            scrollTo("#listings");
            toast({
              title: `Rent · ${label}`,
              description: "Showing listings — we can wire these to filters next.",
            });
          }}
        />

        <CommunitiesMegaMenu
          open={communitiesOpen}
          onClose={() => setCommunitiesOpen(false)}
          onNavigate={(label) => {
            scrollTo("#projects");
            toast({
              title: `Community · ${label}`,
              description:
                "Opened communities section — we can wire this to filters next.",
            });
          }}
        />

        <DevelopersMegaMenu
          open={developersOpen}
          onClose={() => setDevelopersOpen(false)}
          onNavigate={(label) => {
            scrollTo("#projects");
            toast({
              title: `Developer · ${label}`,
              description:
                "Opened projects section — we can wire this to a developer filter next.",
            });
          }}
        />

        <MarketTrendsMegaMenu
          open={marketTrendsOpen}
          onClose={() => setMarketTrendsOpen(false)}
          onNavigate={(label) => {
            toast({
              title: `Market Trends · ${label}`,
              description: "We can build these pages/sections next.",
            });
          }}
        />

        <ServicesMegaMenu
          open={servicesOpen}
          onClose={() => setServicesOpen(false)}
          onNavigate={(label) => {
            toast({
              title: `Services · ${label}`,
              description: "We can build these pages/sections next.",
            });
          }}
        />

        <MoreMegaMenu
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          onNavigate={(label) => {
            toast({
              title: `More · ${label}`,
              description: "We can build these pages/sections next.",
            });
          }}
        />
      </div>
    </header>
  );
}
