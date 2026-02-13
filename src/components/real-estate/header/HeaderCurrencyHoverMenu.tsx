import { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CurrencyCode = "AED" | "EUR" | "GBP" | "USD";

export function HeaderCurrencyHoverMenu({
  value,
  onChange,
  className,
}: {
  value: CurrencyCode;
  onChange: (next: CurrencyCode) => void;
  className?: string;
}) {
  const currencies = useMemo(
    () => ["AED", "EUR", "GBP", "USD"] as const,
    [],
  );

  const [open, setOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className={cn("inline-flex", className)}
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={() => scheduleClose()}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition",
              "text-white/90 hover:text-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
            )}
            aria-label="Currency"
            aria-expanded={open}
          >
            AED
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={10}
          className={cn(
            "w-[220px] rounded-[5px] border border-white/15 bg-[#111827] p-2 text-white",
            "shadow-[0_30px_90px_-65px_rgba(15,23,42,0.75)] ring-1 ring-black/30",
          )}
          onMouseEnter={() => cancelClose()}
          onMouseLeave={() => scheduleClose()}
        >
          <div className="px-2 py-2 text-[11px] font-semibold tracking-[0.22em] text-white/70">
            CURRENCY
          </div>

          <div className="grid gap-1 p-1">
            {currencies.map((code) => {
              const active = value === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    onChange(code);
                    toast({
                      title: "Preference updated",
                      description: `Selected ${code}.`,
                    });
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[5px] px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-white text-[#111827]"
                      : "bg-white/0 text-white hover:bg-white/10",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                  )}
                  aria-pressed={active}
                >
                  <span>{code}</span>
                  {active ? (
                    <span className="text-xs font-bold tracking-[0.14em]">
                      ACTIVE
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="px-3 pb-2 pt-2 text-[11px] font-semibold text-white/65">
            You can rename this to “Language” if you want actual languages (EN/AR)
            instead of currencies.
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}