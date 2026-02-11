import { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Unit = "sqft" | "sqm";
type LanguageCode = "en" | "ar" | "zh" | "ru" | "de";
type Currency = "AED" | "USD" | "GBP" | "EUR";

const pillBase =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

function langLabel(code: LanguageCode) {
  switch (code) {
    case "en":
      return "English";
    case "ar":
      return "العربية";
    case "zh":
      return "中文";
    case "ru":
      return "Русский";
    case "de":
      return "Deutsch";
  }
}

export function TopBarPreferencesPopover({
  className,
  trigger,
}: {
  className?: string;
  trigger: React.ReactNode;
}) {
  const languages = useMemo(
    () =>
      [
        { code: "en" as const, label: "English" },
        { code: "ar" as const, label: "العربية" },
        { code: "zh" as const, label: "中文" },
        { code: "ru" as const, label: "Русский" },
        { code: "de" as const, label: "Deutsch" },
      ] as const,
    [],
  );

  const currencies = useMemo(
    () => ["AED", "EUR", "GBP", "USD"] as const,
    [],
  );

  const [open, setOpen] = useState(false);

  // local state (UI preview) — can be wired to real i18n/currency later
  const [unit, setUnit] = useState<Unit>("sqm");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [currency, setCurrency] = useState<Currency>("AED");

  // Select content renders in a portal — keep popover open while select is open.
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false);
  const anySelectOpen = languageSelectOpen;

  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    if (anySelectOpen) return;
    closeTimer.current = window.setTimeout(() => {
      if (!anySelectOpen) setOpen(false);
    }, 160);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        if (!v && anySelectOpen) return;
        setOpen(v);
      }}
    >
      <div
        className={cn("inline-flex", className)}
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={() => {
          scheduleClose();
        }}
      >
        <PopoverTrigger asChild>
          <span className="inline-flex">{trigger}</span>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={14}
          className={cn(
            "w-[360px] rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.85)]",
          )}
          onMouseEnter={() => cancelClose()}
          onMouseLeave={() => scheduleClose()}
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
              <Select
                open={languageSelectOpen}
                onOpenChange={(v) => {
                  setLanguageSelectOpen(v);
                  if (v) {
                    cancelClose();
                    setOpen(true);
                  } else {
                    cancelClose();
                  }
                }}
                value={language}
                onValueChange={(v) => setLanguage(v as LanguageCode)}
              >
                <SelectTrigger className="mt-3 h-12 rounded-full bg-muted/40 px-5 text-sm font-semibold text-[#111827] ring-1 ring-black/10 focus:ring-2 focus:ring-black/10">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl p-2">
                  {languages.map((l) => (
                    <SelectItem
                      key={l.code}
                      value={l.code}
                      className="rounded-xl"
                    >
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="text-sm font-semibold text-[#111827]">Currency</div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {currencies.map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setCurrency(code)}
                      className={cn(
                        "h-11 rounded-full px-5 text-sm font-semibold transition",
                        "ring-1 ring-black/10",
                        active
                          ? "bg-[#111827] text-white ring-transparent"
                          : "bg-white text-[#111827] hover:bg-muted/40",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10",
                      )}
                      aria-pressed={active}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-center text-[11px] font-semibold text-muted-foreground">
                Selected: {currency}
              </div>
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
              Unit: {unit.toUpperCase()} · Language: {langLabel(language)} ·
              Currency: {currency}
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}