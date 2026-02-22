import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActiveSection } from "@/hooks/use-active-section";
import { useDelayedClose } from "@/hooks/use-delayed-close";

import { HeaderTopBar } from "@/components/real-estate/header/HeaderTopBar";
import {
  HeaderMainBar,
  type HeaderNavItem,
} from "@/components/real-estate/header/HeaderMainBar";
import { MobileNavSheet } from "@/components/real-estate/header/MobileNavSheet";
import { useNavInventory } from "@/hooks/use-nav-inventory";
import { SimpleMegaMenu } from "@/components/real-estate/SimpleMegaMenu";

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

  const { cancel: cancelClose, schedule: scheduleClose } = useDelayedClose();

  const { buyOptions, rentOptions, communityOptions } = useNavInventory();

  const closeMegas = () => {
    cancelClose();
    setBuyOpen(false);
    setRentOpen(false);
    setCommunitiesOpen(false);
  };

  const openOnly = (key: "buy" | "rent" | "communities") => {
    cancelClose();
    setBuyOpen(key === "buy");
    setRentOpen(key === "rent");
    setCommunitiesOpen(key === "communities");
  };

  const navItems: HeaderNavItem[] = useMemo(
    () => [
      { label: "BUY", href: "/nav/buy/option/all", hasChevron: true, mega: "buy" },
      { label: "RENT", href: "/nav/rent/option/all", hasChevron: true, mega: "rent" },
      {
        label: "COMMUNITIES",
        href: "/nav/communities/option/all",
        hasChevron: true,
        mega: "communities",
      },
    ],
    [],
  );

  const expandedByMega = useMemo(
    () => ({
      buy: buyOpen,
      rent: rentOpen,
      communities: communitiesOpen,
    }),
    [buyOpen, communitiesOpen, rentOpen],
  );

  const anyOpen = buyOpen || rentOpen || communitiesOpen;

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
          if (!mega) return;
          if (mega === "buy" || mega === "rent" || mega === "communities") {
            openOnly(mega);
          }
        }}
        onNavHoverCancelClose={cancelClose}
        onNavHoverScheduleClose={(ms) =>
          scheduleClose(() => closeMegas(), ms ?? 140)
        }
        onNavClickCloseMegas={closeMegas}
        expandedByMega={expandedByMega as any}
      />

      <div
        className="hidden lg:block"
        onMouseEnter={() => cancelClose()}
        onMouseLeave={() => scheduleClose(() => closeMegas(), 140)}
      >
        <SimpleMegaMenu
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          title="Buy"
          items={[{ label: "View All", slug: "all" }, ...buyOptions]}
          onNavigate={(slug) => navigate(`/nav/buy/option/${slug}`)}
          cols={3}
        />

        <SimpleMegaMenu
          open={rentOpen}
          onClose={() => setRentOpen(false)}
          title="Rent"
          items={[{ label: "View All", slug: "all" }, ...rentOptions]}
          onNavigate={(slug) => navigate(`/nav/rent/option/${slug}`)}
          cols={3}
        />

        <SimpleMegaMenu
          open={communitiesOpen}
          onClose={() => setCommunitiesOpen(false)}
          title="Communities"
          items={[{ label: "View All", slug: "all" }, ...communityOptions]}
          onNavigate={(slug) => navigate(`/nav/communities/option/${slug}`)}
          cols={3}
        />
      </div>
    </header>
  );
}