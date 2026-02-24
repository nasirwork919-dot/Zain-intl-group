import { useState } from "react";
import { Calculator } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalculatorDialog } from "@/components/real-estate/CalculatorDialog";

export function MobileCalculatorButton({
  className,
  variant = "icon",
  onOpened,
}: {
  className?: string;
  variant?: "icon" | "full";
  onOpened?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "icon" ? (
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-10 rounded-full border-white/20 bg-white/10 px-4 text-white ring-1 ring-white/15",
            "hover:bg-white/15 hover:text-white",
            className,
          )}
          aria-label="Open calculator"
          onClick={() => {
            setOpen(true);
            onOpened?.();
          }}
        >
          <Calculator className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          className={cn(
            "h-11 w-full rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
            className,
          )}
          onClick={() => {
            setOpen(true);
            onOpened?.();
          }}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculator
        </Button>
      )}

      <CalculatorDialog open={open} onOpenChange={setOpen} defaultTab="mortgage" />
    </>
  );
}