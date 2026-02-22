import { Menu, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
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
import { useNavInventory } from "@/hooks/use-nav-inventory";

type MobileSectionKey = "buy" | "rent" | "communities" | null;

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
      <span className="truncate">{label}</span>
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

  const { buyOptions, rentOptions, communityOptions } = useNavInventory();

  const sections = useMemo(
    () => [
      { key: "buy" as const, title: "BUY", items: buyOptions },
      { key: "rent" as const, title: "RENT", items: rentOptions },
      { key: "communities" as const, title: "COMMUNITIES", items: communityOptions },
    ],
    [buyOptions, communityOptions, rentOptions],
  );

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
              {sections.map((s) => (
                <MobileMenuSection
                  key={s.key}
                  title={s.title}
                  open={openSection === s.key}
                  onToggle={() =>
                    setOpenSection((prev) => (prev === s.key ? null : s.key))
                  }
                >
                  <div className="grid gap-2">
                    {s.items.length ? (
                      s.items.map((o) => (
                        <MobileMenuItem
                          key={o.slug}
                          label={o.label.toUpperCase()}
                          onClick={() => {
                            navigate(`/nav/${s.key}/option/${o.slug}`);
                            onOpenChange(false);
                          }}
                        />
                      ))
                    ) : (
                      <div className="rounded-[5px] bg-white/60 p-3 text-xs font-semibold text-muted-foreground ring-1 ring-black/5">
                        No published listings yet.
                      </div>
                    )}

                    <MobileMenuItem
                      label="VIEW ALL"
                      onClick={() => {
                        navigate(`/nav/${s.key}/option/all`);
                        onOpenChange(false);
                      }}
                    />
                  </div>
                </MobileMenuSection>
              ))}

              <div className="rounded-[5px] bg-muted/35 p-4 ring-1 ring-black/5">
                <div className="text-xs font-semibold text-muted-foreground">
                  Tip
                </div>

                <div className="mt-2 text-xs font-semibold text-[hsl(var(--brand-ink))]/80">
                  The menu only shows categories that exist in your Admin →
                  Properties inventory.
                </div>

                <Separator className="my-4" />

                <Button
                  className="h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                  onClick={() => {
                    toast({
                      title: "Saved",
                      description: "Navigation is now inventory-driven.",
                    });
                    onOpenChange(false);
                  }}
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}