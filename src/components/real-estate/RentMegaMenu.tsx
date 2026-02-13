import * as React from "react";

import { cn } from "@/lib/utils";

type Column = {
  title: string;
  items: { label: string; onClick?: () => void }[];
};

export function RentMegaMenu({
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
      {
        title: "Rent",
        items: [
          { label: "Apartments" },
          { label: "Offices" },
          { label: "Townhouses" },
        ],
      },
      {
        title: "",
        items: [{ label: "Villas" }, { label: "Commercial" }],
      },
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

  return (
    <>
      {/* click-away overlay (ONLY below header so it doesn't block nav clicks) */}
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 top-[calc(56px+76px)] z-40 cursor-default bg-transparent"
        aria-label="Close rent menu"
        onClick={onClose}
      />

      <div className="fixed left-0 right-0 top-[calc(56px+76px)] z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={cn(
              "rounded-[5px] border border-black/10 bg-white shadow-[0_30px_90px_-65px_rgba(15,23,42,0.55)]",
              "ring-1 ring-black/5",
              "overflow-hidden",
            )}
          >
            <div className="grid gap-10 px-10 py-10 md:grid-cols-2">
              {columns.map((col, idx) => (
                <div key={`${col.title}-${idx}`}>
                  {col.title ? (
                    <div className="text-2xl font-extrabold tracking-tight text-[#111827]">
                      {col.title}
                    </div>
                  ) : (
                    <div className="h-[32px]" />
                  )}

                  <div className={cn(col.title ? "mt-6" : "mt-0")}>
                    <div className="grid">
                      {col.items.map((it) => (
                        <button
                          key={`${idx}-${it.label}`}
                          type="button"
                          onClick={() => {
                            onNavigate(it.label);
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center justify-between py-4 text-left",
                            "text-base font-semibold text-[#111827]/90",
                            "border-b border-black/15 last:border-b-0",
                            "hover:text-[#111827]",
                          )}
                        >
                          <span>{it.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}