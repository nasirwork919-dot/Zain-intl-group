import * as React from "react";

import { cn } from "@/lib/utils";

type Item = { label: string };
type Column = { items: Item[] };

export function MarketTrendsMegaMenu({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (label: string) => void;
}) {
  const columns: Column[] = React.useMemo(
    () => [
      { items: [{ label: "Daily Transaction" }, { label: "Rental Transaction" }] },
      { items: [{ label: "Sale Transaction" }, { label: "Market Guide" }] },
    ],
    [],
  );

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const itemClass = cn(
    "flex w-full items-center justify-between text-left",
    "py-5",
    "text-[15px] font-semibold",
    "text-[#11124a]",
    "transition-colors hover:text-[#0b0c35]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
  );

  const dividerClass = "border-b border-black/15";

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-transparent"
        aria-label="Close market trends menu"
        onClick={onClose}
      />

      <div className="fixed left-0 right-0 top-[calc(56px+76px)] z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={cn(
              "overflow-hidden rounded-[5px] border border-black/10 bg-white",
              "shadow-[0_30px_90px_-65px_rgba(15,23,42,0.55)]",
              "ring-1 ring-black/5",
            )}
          >
            <div className="px-10 py-9">
              <div className="text-2xl font-bold tracking-tight text-[#111827]">
                Market Trends
              </div>

              <div className="mt-7 grid gap-16 md:grid-cols-2">
                {columns.map((col, idx) => (
                  <div key={idx} className="grid">
                    {col.items.map((it, itemIdx) => {
                      const showDivider = itemIdx !== col.items.length - 1;
                      return (
                        <div
                          key={`${idx}-${it.label}`}
                          className={cn(showDivider && dividerClass)}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onNavigate(it.label);
                              onClose();
                            }}
                            className={itemClass}
                          >
                            <span>{it.label}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}