import { X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function HeroFiltersFullscreen({
  open,
  onOpenChange,
  children,
  title = "Filters",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "h-[92vh] p-0",
          "rounded-t-[5px] border border-white/60 bg-[hsl(var(--page))]",
          "shadow-[0_30px_100px_-70px_rgba(15,23,42,0.9)]",
          "[&>button]:hidden",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/75 px-4 py-3 backdrop-blur">
            <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
              {title}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-black/5"
              onClick={() => onOpenChange(false)}
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
