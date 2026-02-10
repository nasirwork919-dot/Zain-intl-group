import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type Unit = "sqft" | "sqm";
type Language = "en" | "ar";
type Currency = "AED";

const pillBase =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

export function TopBarPreferencesPopover({
  className,
}: {
  className?: string;
}) {
  const currencies = useMemo(
    () => [{ code: "AED" as const, label: "AED (Emirati Dirham)" }],
    [],
  );

  const [open, setOpen] = useState(false);

  // local state (UI preview) — can be wired to real i18n/currency later
  const [unit, setUnit] = useState<Unit>("sqm");
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("AED");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white",
            className,
          )}
          aria-label="Open preferences"
        >
          {currency}
          <ChevronDown className="h-4 w-4 opacity-90" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={14}
        className={cn(
          "w-[340px] rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.85)]",
        )}
      >
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setUnit("sqft")}
            className={cn(
              pillBase,
              "ring-1 ring-black/10",
              unit === "sqft"
                ? "bg-[#111827] text-white ring-transparent"
                : "bg-white text-[#111827] hover:bg-muted/40",
            )}
          >
            SQ FT
          </button>
          <button
            type="button"
            onClick={() => setUnit("sqm")}
            className={cn(
              pillBase,
              "ring-1 ring-black/10",
              unit === "sqm"
                ? "bg-[#111827] text-white ring-transparent"
                : "bg-white text-[#111827] hover:bg-muted/40",
            )}
          >
            SQ M
          </button>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-6">
          <div>
            <div className="text-sm font-semibold text-[#111827]">Language</div>
            <button
              type="button"
              onClick={() => setLanguage((l) => (l === "en" ? "ar" : "en"))}
              className={cn(
                "mt-3 flex w-full items-center justify-between rounded-full px-5 py-4 text-sm font-semibold",
                "bg-muted/40 text-[#111827]",
                "ring-1 ring-black/10",
                "hover:bg-muted/55",
              )}
              aria-label="Toggle language"
            >
              <span>{language === "en" ? "English" : "Arabic"}</span>
              <ChevronDown className="h-5 w-5 opacity-70" />
            </button>
            <div className="mt-2 text-xs text-muted-foreground">
              (Click to toggle for now.)
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-[#111827]">Currency</div>
            <button
              type="button"
              onClick={() => setCurrency(currencies[0].code)}
              className={cn(
                "mt-3 flex w-full items-center justify-between rounded-full px-5 py-4 text-sm font-semibold",
                "bg-muted/40 text-[#111827]",
                "ring-1 ring-black/10",
                "hover:bg-muted/55",
              )}
              aria-label="Currency selection"
            >
              <span>
                {currencies.find((c) => c.code === currency)?.label ??
                  "AED (Emirati Dirham)"}
              </span>
              <ChevronDown className="h-5 w-5 opacity-70" />
            </button>
          </div>

          <Button
            className={cn(
              "mt-1 h-14 w-full rounded-full",
              "bg-[#111827] text-white hover:bg-[#111827]/92",
            )}
            onClick={() => setOpen(false)}
          >
            SAVE
          </Button>

          <div className="text-center text-[11px] text-muted-foreground">
            Unit: {unit.toUpperCase()} · Language:{" "}
            {language.toUpperCase()} · Currency: {currency}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}