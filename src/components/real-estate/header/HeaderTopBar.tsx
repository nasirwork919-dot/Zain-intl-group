import { Phone, User } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type CurrencyCode = "AED" | "EUR" | "GBP" | "USD";

function UtilityPill({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold leading-none",
        "bg-white text-[#111827]",
        "shadow-sm ring-1 ring-black/10",
        "hover:bg-white/95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

function PhonePill({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
        "bg-white text-[#111827] ring-1 ring-black/10",
        "hover:bg-white/95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
      )}
    >
      <Phone className="h-4 w-4" />
      {label}
    </button>
  );
}

function TopCurrencyTabs({
  value,
  onChange,
}: {
  value: CurrencyCode;
  onChange: (next: CurrencyCode) => void;
}) {
  const codes: CurrencyCode[] = ["AED", "EUR", "GBP", "USD"];

  const tabClass = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 text-xs font-semibold transition",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
      active ? "text-white" : "text-white/80 hover:text-white",
    );

  return (
    <div className="inline-flex items-center gap-4">
      {codes.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            onChange(code);
            toast({
              title: "Currency updated",
              description: `Selected ${code}.`,
            });
          }}
          className={tabClass(value === code)}
          aria-pressed={value === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function HeaderTopBar({
  onContact,
  mobileMenuTrigger,
}: {
  onContact: () => void;
  mobileMenuTrigger: React.ReactNode;
}) {
  const [topCurrency, setTopCurrency] = useState<CurrencyCode>("AED");

  return (
    <div className="w-full bg-[#1f2937] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <UtilityPill>List Your Property</UtilityPill>
          </div>

          <div className="hidden lg:flex" />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/90 sm:flex">
              <div className="hidden items-center gap-3 lg:flex">
                <UtilityPill>List Your Property</UtilityPill>
              </div>

              <TopCurrencyTabs value={topCurrency} onChange={setTopCurrency} />
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <PhonePill label="Free Property Valuation" />
              <PhonePill label="Contact Us" onClick={onContact} />
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
                  "bg-white text-[#111827] ring-1 ring-black/10",
                  "hover:bg-white/95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                )}
              >
                <User className="h-4 w-4" />
                Login
              </button>
            </div>

            <div className="md:hidden">{mobileMenuTrigger}</div>
          </div>
        </div>
      </div>
    </div>
  );
}