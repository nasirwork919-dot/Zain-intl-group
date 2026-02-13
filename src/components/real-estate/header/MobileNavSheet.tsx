import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NAV_OPTIONS } from "@/components/real-estate/nav-config";
import { ChevronDown } from "lucide-react";

type MobileSectionKey =
  | "buy"
  | "rent"
  | "off-plan"
  | "featured-projects"
  | "services"
  | null;

function MobileMenuSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[5px] bg-muted/35 ring-1 ring-black/5">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold",
          "hover:bg-muted/50 rounded-[5px]",
        )}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-70 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </div>
  );
}

function MobileMenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-[5px] px-3 py-3 text-left text-sm font-semibold",
        "bg-white/70 ring-1 ring-black/5 hover:bg-white",
        "text-[#11124a]",
      )}
    >
      <span>{label}</span>
    </button>
  );
}

export function MobileNavSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<MobileSectionKey>(null);
  const [currency, setCurrency] = useState("AED");

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setOpenSection(null);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-10 rounded-full border-white/20 bg-white/10 px-4 text-white ring-1 ring-white/15 hover:bg-white/15 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[340px] p-0">
        <div className="flex h-full flex-col">
          <div className="px-4 pt-4">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
            <div className="grid gap-3">
              <MobileMenuSection
                title="BUY"
                open={openSection === "buy"}
                onToggle={() => {
                  navigate("/nav/buy");
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  {NAV_OPTIONS.buy.map((o) => (
                    <MobileMenuItem
                      key={o.slug}
                      label={o.label.toUpperCase()}
                      onClick={() => {
                        navigate(`/nav/buy/option/${o.slug}`);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <MobileMenuSection
                title="RENT"
                open={openSection === "rent"}
                onToggle={() => {
                  navigate("/nav/rent");
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  {NAV_OPTIONS.rent.map((o) => (
                    <MobileMenuItem
                      key={o.slug}
                      label={o.label.toUpperCase()}
                      onClick={() => {
                        navigate(`/nav/rent/option/${o.slug}`);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <MobileMenuSection
                title="OFF-PLAN"
                open={openSection === "off-plan"}
                onToggle={() => {
                  navigate("/nav/buy/off-plan");
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  {NAV_OPTIONS.buy.map((o) => (
                    <MobileMenuItem
                      key={o.slug}
                      label={o.label.toUpperCase()}
                      onClick={() => {
                        navigate(`/nav/buy/option/${o.slug}`);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <MobileMenuSection
                title="FEATURED PROJECTS"
                open={openSection === "featured-projects"}
                onToggle={() => {
                  navigate("/nav/featured-projects");
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  {NAV_OPTIONS["featured-projects"].map((o) => (
                    <MobileMenuItem
                      key={o.slug}
                      label={o.label.toUpperCase()}
                      onClick={() => {
                        navigate(`/nav/featured-projects/option/${o.slug}`);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <MobileMenuSection
                title="OUR SERVICES"
                open={openSection === "services"}
                onToggle={() => {
                  navigate("/nav/services");
                  onOpenChange(false);
                }}
              >
                <div className="grid gap-2">
                  {NAV_OPTIONS.services.map((o) => (
                    <MobileMenuItem
                      key={o.slug}
                      label={o.label.toUpperCase()}
                      onClick={() => {
                        navigate(`/nav/services/option/${o.slug}`);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <div className="rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
                <div className="text-xs font-semibold text-muted-foreground">
                  Currency
                </div>

                <div className="mt-3">
                  <Select value={currency} onValueChange={(v) => setCurrency(v)}>
                    <SelectTrigger className="h-11 rounded-[5px] bg-white/70 ring-1 ring-black/5">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="AED">AED</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>

                  <Separator className="my-4" />

                  <Button
                    className="h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                    onClick={() => {
                      toast({
                        title: "Saved",
                        description: `Currency: ${currency}`,
                      });
                      onOpenChange(false);
                    }}
                  >
                    Save preferences
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}