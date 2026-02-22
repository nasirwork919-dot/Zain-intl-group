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
import { SimpleMegaMenu } from "@/components/real-estate/SimpleMegaMenu";
import { useNavMenuInventory, type NavMenuKey } from "@/hooks/use-nav-menu-inventory";

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

  const [openMega, setOpenMega] = useState<NavMenuKey | null>(null);
  const { cancel: cancelClose, schedule: scheduleClose } = useDelayedClose();

  const { menus } = useNavMenuInventory();

  const closeMegas = () => {
    cancelClose();
    setOpenMega(null);
  };

  const openOnly = (key: NavMenuKey) => {
    cancelClose();
    setOpenMega(key);
  };

  const navItems: HeaderNavItem[] = useMemo(() => {
    const items: { key: NavMenuKey; href: string; label: string }[] = [
      { key: "buy", href: "/nav/buy/option/all", label: "BUY" },
      { key: "rent", href: "/nav/rent/option/all", label: "RENT" },
      { key: "communities", href: "/nav/communities/option/all", label: "COMMUNITIES" },
      { key: "developers", href: "/nav/developers/option/all", label: "DEVELOPERS" },
      { key: "featured-projects", href: "/nav/featured-projects/option/all", label: "FEATURED PROJECTS" },
      { key: "services", href: "/nav/services/option/all", label: "SERVICES" },
      { key: "more", href: "/nav/more/option/all", label: "MORE" },
    ];

    return items
      .filter((it) => menus[it.key]?.hasAny)
      .map(
        (it) =>
          ({
            label: it.label,
            href: it.href,
            hasChevron: true,
            mega: it.key as any,
          }) satisfies HeaderNavItem,
      );
  }, [menus]);

  const expandedByMega = useMemo(() => {
    const keys: NavMenuKey[] = [
      "buy",
      "rent",
      "communities",
      "developers",
      "featured-projects",
      "services",
      "more",
    ];
    const obj: Partial<Record<NavMenuKey, boolean>> = {};
    keys.forEach((k) => (obj[k] = openMega === k));
    return obj;
  }, [openMega]);

  const anyOpen = openMega !== null;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => {
        if (anyOpen) scheduleClose(() => closeMegas(), 140);
      }}
    >
      <HeaderTopBar
        onContact={() => navigate("/nav/services/option/all")}
        mobileMenuTrigger={
          <MobileNavSheet open={mobileOpen} onOpenChange={setMobileOpen} />
        }
      />

      <HeaderMainBar
        navItems={navItems}
        activeSectionId={active}
        onLogoClick={() => navigate("/")}
        onNavHoverOpen={(mega) => {
          const key = mega as NavMenuKey | undefined;
          if (!key) return;
          if (!menus[key]?.hasAny) return;
          openOnly(key);
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
        {(Object.keys(menus) as NavMenuKey[]).map((key) => {
          const m = menus[key];
          if (!m?.hasAny) return null;

          return (
            <SimpleMegaMenu
              key={key}
              open={openMega === key}
              onClose={() => setOpenMega(null)}
              title={m.label}
              items={[{ label: "View All", slug: "all" }, ...m.options]}
              onNavigate={(slug) => navigate(`/nav/${key}/option/${slug}`)}
              cols={3}
            />
          );
        })}
      </div>
    </header>
  );
}