import { cn } from "@/lib/utils";
import { HeroSearchBar, type HeroBarFilters } from "@/components/real-estate/HeroSearchBar";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";

export function TopPeekFiltersBar({
  value,
  onChange,
  onSubmit,
  className,
  title = "REFINE",
  subtitle = "Search without losing your place",
  topOffsetPx = 132,
}: {
  value: HeroBarFilters;
  onChange: (next: HeroBarFilters) => void;
  onSubmit: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
  topOffsetPx?: number;
}) {
  const visible = useHideOnScroll({ showUntilPx: 140, hideAfterPx: 220 });

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40",
        className,
      )}
      style={{ top: topOffsetPx }}
    >
      <div
        className={cn(
          "w-full",
          "bg-[hsl(var(--page))]/92 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--page))]/75",
          "border-b border-black/5",
          "transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5">
          <div
            className={cn(
              "rounded-[5px] border border-black/10 bg-white/80 ring-1 ring-black/5",
              "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.55)]",
              "backdrop-blur supports-[backdrop-filter]:bg-white/65",
            )}
          >
            <div className="px-3 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand-ink))]/70">
                    {title}
                  </div>
                  <div className="mt-1 text-sm font-extrabold tracking-tight text-foreground">
                    {subtitle}
                  </div>
                </div>

                <div className="hidden rounded-[5px] bg-white/80 px-3 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-black/10 sm:block">
                  Tip: press Enter to search
                </div>
              </div>

              <div className="mt-3">
                <HeroSearchBar value={value} onChange={onChange} onSubmit={onSubmit} />
              </div>
            </div>
          </div>

          <div className="h-3 sm:h-4" />
        </div>
      </div>
    </div>
  );
}