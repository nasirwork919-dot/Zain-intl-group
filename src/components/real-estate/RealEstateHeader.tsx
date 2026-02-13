import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BuyMegaMenu } from "@/components/real-estate/BuyMegaMenu";
import { RentMegaMenu } from "@/components/real-estate/RentMegaMenu";
import { MarketTrendsMegaMenu } from "@/components/real-estate/MarketTrendsMegaMenu";
import { ServicesMegaMenu } from "@/components/real-estate/ServicesMegaMenu";
import { slugifyNavLabel } from "@/components/real-estate/nav-config";

import { useActiveSection } from "@/hooks/use-active-section";
import { useDelayedClose } from "@/hooks/use-delayed-close";

import { HeaderTopBar } from "@/components/real-estate/header/HeaderTopBar";
import {
  HeaderMainBar,
  type HeaderNavItem,
} from "@/components/real-estate/header/HeaderMainBar";
import { MobileNavSheet } from "@/components/real-estate/header/MobileNavSheet";

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

  const { cancel: cancelClose, schedule: scheduleClose } = useDelayedClose();

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

  const navItems: HeaderNavItem[] = useMemo(
    () => [
      {
        label: "BUY",
        href: "/nav/buy",
        hasChevron: true,
        mega: "buy",
      },
      {
        label: "RENT",
        href: "/nav/rent",
        hasChevron: true,
        mega: "rent",
      },
      {
        label: "OFF-PLAN",
        href: "/nav/buy/off-plan",
        hasChevron: false,
        mega: "off-plan",
      },
      {
        label: "FEATURED PROJECTS",
        href: "/nav/featured-projects",
        hasChevron: true,
        mega: "featured-projects",
      },
      {
        label: "OUR SERVICES",
        href: "/nav/services",
        hasChevron: true,
        mega: "services",
      },
    ],
    [],
  );

  const expandedByMega = useMemo(
    () => ({
      buy: buyOpen,
      rent: rentOpen,
      "featured-projects": featuredProjectsOpen,
      services: servicesOpen,
      "off-plan": false,
    }),
    [buyOpen, featuredProjectsOpen, rentOpen, servicesOpen],
  );

  const anyOpen = buyOpen || rentOpen || featuredProjectsOpen || servicesOpen;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => {
        if (anyOpen) scheduleClose(() => closeMegas(), 140);
      }}
    >
      <HeaderTopBar
        onContact={() => navigate("/nav/services")}
        mobileMenuTrigger={
          <MobileNavSheet open={mobileOpen} onOpenChange={setMobileOpen} />
        }
      />

      <HeaderMainBar
        navItems={navItems}
        activeSectionId={active}
        onLogoClick={() => navigate("/")}
        onNavHoverOpen={(mega) => {
          if (!mega || mega === "off-plan") return;
          openOnly(mega);
        }}
        onNavHoverCancelClose={cancelClose}
        onNavHoverScheduleClose={(ms) =>
          scheduleClose(() => closeMegas(), ms ?? 140)
        }
        onNavClickCloseMegas={closeMegas}
        expandedByMega={expandedByMega}
      />

      <div
        className="hidden lg:block"
        onMouseEnter={() => cancelClose()}
        onMouseLeave={() => scheduleClose(() => closeMegas(), 140)}
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