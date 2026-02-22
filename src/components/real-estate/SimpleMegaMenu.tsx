import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Item = { label: string; slug: string };

export function SimpleMegaMenu({
  open,
  onClose,
  title,
  items,
  onNavigate,
  cols = 3,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  items: Item[];
  onNavigate: (slug: string) => void;
  cols?: 2 | 3 | 4;
}) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 top-[calc(56px+76px)] z-40 cursor-default bg-transparent"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div className="fixed left-0 right-0 top-[calc(56px+76px)] z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={cn(
              "rounded-[5px] border border-black/10 bg-white shadow-[0_30px_90px_-65px_rgba(15,23,42,0.55)]",
              "ring-1 ring-black/5 overflow-hidden",
            )}
          >
            <div className="px-10 py-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-[#111827]">
                    {title}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[#111827]/65">
                    Only showing options with published listings.
                  </div>
                </div>

                <div className="rounded-[5px] bg-[hsl(var(--brand))]/10 px-3 py-2 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                  {items.length} options
                </div>
              </div>

              <div
                className={cn(
                  "mt-7 grid gap-x-12 gap-y-2",
                  cols === 2 && "md:grid-cols-2",
                  cols === 3 && "md:grid-cols-3",
                  cols === 4 && "md:grid-cols-4",
                )}
              >
                {items.length === 0 ? (
                  <div className="rounded-[5px] border border-black/10 bg-muted/20 p-5 text-sm font-semibold text-muted-foreground ring-1 ring-black/5 md:col-span-3">
                    No published listings yet.
                  </div>
                ) : (
                  items.map((it) => (
                    <button
                      key={it.slug}
                      type="button"
                      onClick={() => {
                        onNavigate(it.slug);
                        onClose();
                      }}
                      className={cn(
                        "group flex w-full items-center justify-between gap-3 rounded-[5px] px-3 py-3 text-left",
                        "text-[15px] font-semibold text-[#11124a]",
                        "ring-1 ring-black/10 bg-white/70",
                        "transition hover:bg-white",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                      )}
                    >
                      <span className="min-w-0 truncate">{it.label}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-90" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}