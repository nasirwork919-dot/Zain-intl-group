import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Item = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

const AUTOPLAY_MS = 5200;

export function MobileValuePropsCarousel({ className }: { className?: string }) {
  const items: Item[] = useMemo(
    () => [
      {
        icon: ShieldCheck,
        title: "Trusted guidance",
        desc: "Market insight, not pressure — with clear next steps.",
      },
      {
        icon: Globe,
        title: "Global buyer-ready",
        desc: "Remote viewings, documentation, and closing support.",
      },
      {
        icon: Star,
        title: "Luxury focus",
        desc: "Premium finishes, waterfront living, and landmark addresses.",
      },
      {
        icon: CheckCircle2,
        title: "Fast matching",
        desc: "Your requirements → curated options within minutes.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  const item = items[index];

  return (
    <div className={cn("md:hidden", className)}>
      <Card
        className={cn(
          "relative overflow-hidden rounded-[5px] border border-white/40 bg-white/55",
          "p-5 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.65)] ring-1 ring-black/10",
          "backdrop-blur supports-[backdrop-filter]:bg-white/45",
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[hsl(var(--brand))]/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[hsl(var(--brand-2))]/10 blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
            <item.icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-extrabold tracking-tight text-foreground">
              {item.title}
            </div>
            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[5px]",
                "bg-white/70 text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
                "hover:bg-white transition",
              )}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[5px]",
                "bg-white/70 text-[hsl(var(--brand-ink))] ring-1 ring-black/10",
                "hover:bg-white transition",
              )}
              aria-label="Next"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-muted-foreground">
              <span className="font-extrabold text-foreground">{index + 1}</span>/{items.length}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-[hsl(var(--brand))] transition-[width] duration-500"
                style={{ width: `${((index + 1) / items.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
