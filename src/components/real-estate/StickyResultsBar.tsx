import { cn } from "@/lib/utils";
import { HeroSearchBar, type HeroBarFilters } from "@/components/real-estate/HeroSearchBar";

export function StickyResultsBar({
  value,
  onChange,
  onSubmit,
  className,
  tone = "light",
}: {
  value: HeroBarFilters;
  onChange: (next: HeroBarFilters) => void;
  onSubmit: () => void;
  className?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "sticky z-40",
        // below your fixed header (~56 + 76 = 132)
        "top-[132px]",
        className,
      )}
    >
      {/* A full-width “rail” to make the bar feel anchored */}
      <div
        className={cn(
          "w-full",
          isDark ? "bg-transparent" : "bg-[hsl(var(--page))]/90",
          "backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--page))]/75",
          "border-b border-black/5",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5">
          <div
            className={cn(
              "rounded-[5px] border ring-1",
              "shadow-[0_25px_70px_-55px_rgba(15,23,42,0.55)]",
              "backdrop-blur supports-[backdrop-filter]:bg-white/55",
              isDark
                ? "border-white/20 bg-white/10 ring-white/10"
                : "border-black/10 bg-white/80 ring-black/5",
            )}
          >
            <div className="px-3 py-3 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div
                    className={cn(
                      "text-xs font-semibold tracking-[0.18em]",
                      isDark ? "text-white/75" : "text-[hsl(var(--brand-ink))]/70",
                    )}
                  >
                    REFINE RESULTS
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-sm font-extrabold tracking-tight",
                      isDark ? "text-white" : "text-foreground",
                    )}
                  >
                    Update filters without losing your place
                  </div>
                </div>

                <div
                  className={cn(
                    "rounded-[5px] px-3 py-2 text-xs font-semibold",
                    isDark
                      ? "bg-white/10 text-white/75 ring-1 ring-white/10"
                      : "bg-white/80 text-muted-foreground ring-1 ring-black/10",
                  )}
                >
                  Tip: press Enter to search
                </div>
              </div>

              <div className="mt-3">
                <HeroSearchBar
                  value={value}
                  onChange={onChange}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </div>

          {/* extra breathing room below the sticky area (so content never feels jammed) */}
          <div className="h-3 sm:h-4" />
        </div>
      </div>
    </div>
  );
}