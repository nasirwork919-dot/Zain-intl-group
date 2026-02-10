import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ScrollUpButton({
  targetId = "top",
  showAfterPx = 520,
  className,
}: {
  targetId?: string;
  showAfterPx?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 transition-all duration-200",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        className,
      )}
    >
      <Button
        type="button"
        onClick={() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={cn(
          "h-11 w-11 rounded-[5px] p-0",
          "bg-white/80 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 backdrop-blur",
          "shadow-[0_18px_50px_-34px_rgba(15,23,42,0.55)]",
          "hover:bg-white",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35",
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}