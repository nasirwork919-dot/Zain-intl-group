import * as React from "react";

import { cn } from "@/lib/utils";

type Column = {
  title?: string;
  items: { label: string }[];
};

export function DevelopersMegaMenu({
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
        items: [{ label: "Emaar" }, { label: "Nakheel" }, { label: "Danube" }],
      },
      {
        items: [{ label: "Select Group" }, { label: "View All Developers" }],
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
      {/* click-away overlay */}
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-transparent"
        aria-label="Close developers menu"
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
            <div className="px-10 py-10">
              <div className="text-2xl font-extrabold tracking-tight text-[#111827]">
                Developers
              </div>

              <div className="mt-7 grid gap-10 md:grid-cols-2">
                {columns.map((col, idx) => (
                  <div key={idx} className="grid">
                    {col.items.map((it) => (
                      <button
                        key={`${idx}-${it.label}`}
                        type="button"
                        onClick={() => {
                          onNavigate(it.label);
                          onClose();
                        }}
                        className={cn(
                          "flex w-full items-center justify-between py-5 text-left",
                          "text-base font-semibold text-[#111827]/90",
                          "border-b border-black/15 last:border-b-0",
                          "hover:text-[#111827]",
                        )}
                      >
                        <span>{it.label}</span>
                      </button>
                    ))}
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