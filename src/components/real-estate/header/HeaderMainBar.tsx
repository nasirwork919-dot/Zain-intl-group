import { Calculator, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export type HeaderNavItem = {
  label: string;
  href: string;
  hasChevron?: boolean;
  mega?: "buy" | "rent" | "featured-projects" | "services" | "off-plan";
};

export function HeaderMainBar({
  navItems,
  activeSectionId,
  onLogoClick,
  onNavHoverOpen,
  onNavHoverCancelClose,
  onNavHoverScheduleClose,
  onNavClickCloseMegas,
  expandedByMega,
}: {
  navItems: HeaderNavItem[];
  activeSectionId: string;
  onLogoClick: () => void;
  onNavHoverOpen: (mega: HeaderNavItem["mega"]) => void;
  onNavHoverCancelClose: () => void;
  onNavHoverScheduleClose: (ms?: number) => void;
  onNavClickCloseMegas: () => void;
  expandedByMega: Partial<Record<NonNullable<HeaderNavItem["mega"]>, boolean>>;
}) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={onLogoClick}
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
              // This header currently uses route links only; keep "activeSectionId"
              // for future scroll links (no behavior change).
              const isActive = false;

              const expanded = item.mega ? expandedByMega[item.mega] : undefined;

              const baseLinkClass = cn(
                "inline-flex items-center gap-1 text-sm font-semibold tracking-[0.08em]",
                "text-[#111827] hover:text-[#111827]/80",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35 rounded-[5px] px-2 py-1",
                isActive &&
                  !item.mega &&
                  "underline underline-offset-8 decoration-black/30",
              );

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onMouseEnter={() => {
                    if (item.mega && item.mega !== "off-plan") {
                      onNavHoverOpen(item.mega);
                    }
                    onNavHoverCancelClose();
                  }}
                  onMouseLeave={() => onNavHoverScheduleClose(140)}
                  onClick={() => onNavClickCloseMegas()}
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
}