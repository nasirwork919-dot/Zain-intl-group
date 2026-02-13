import { Phone, User } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { HeaderCurrencyHoverMenu } from "@/components/real-estate/header/HeaderCurrencyHoverMenu";
import { useNavigate } from "react-router-dom";

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

export function HeaderTopBar({
  onContact,
  mobileMenuTrigger,
}: {
  onContact: () => void;
  mobileMenuTrigger: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [topCurrency, setTopCurrency] = useState<CurrencyCode>("AED");

  return (
    <div className="w-full bg-[#1f2937] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <UtilityPill onClick={() => navigate("/list-your-property")}>
              List Your Property
            </UtilityPill>
          </div>

          <div className="hidden lg:flex" />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/90 sm:flex">
              <div className="hidden items-center gap-3 lg:flex">
                <UtilityPill onClick={() => navigate("/list-your-property")}>
                  List Your Property
                </UtilityPill>
              </div>

              <HeaderCurrencyHoverMenu value={topCurrency} onChange={setTopCurrency} />
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <PhonePill
                label="Free Property Valuation"
                onClick={() =>
                  toast({
                    title: "Free valuation",
                    description:
                      "Tell us your community + unit details and we’ll estimate the market range.",
                  })
                }
              />
              <PhonePill label="Contact Us" onClick={onContact} />
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none",
                  "bg-white text-[#111827] ring-1 ring-black/10",
                  "hover:bg-white/95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                )}
                onClick={() =>
                  toast({
                    title: "Login",
                    description:
                      "If you want, we can add a real login with accounts next.",
                  })
                }
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