import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

export function ExperienceStatsStrip({
  className,
  stats = [
    { value: "25", suffix: "+", label: "Years of Experience" },
    { value: "4B", suffix: "+AED", label: "Properties Sold" },
    { value: "2,000", label: "Units Closed" },
  ],
}: {
  className?: string;
  stats?: Stat[];
}) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="py-10 sm:py-14">
        <div className="rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.5)] ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="grid gap-8 px-6 py-10 text-center sm:grid-cols-3 sm:gap-4 sm:px-10 sm:py-12">
            {stats.map((s) => (
              <div key={`${s.value}-${s.label}`} className="relative">
                <div className="flex items-start justify-center gap-1">
                  {s.suffix?.startsWith("+") ? (
                    <span className="mt-2 text-sm font-semibold tracking-wide text-[hsl(var(--brand))] sm:mt-3">
                      +
                    </span>
                  ) : null}

                  <span className="font-serif text-5xl font-semibold tracking-tight text-[hsl(var(--brand-ink))] sm:text-6xl">
                    {s.value}
                  </span>

                  {s.suffix ? (
                    <span className="mt-2 text-sm font-semibold tracking-wide text-[hsl(var(--brand))] sm:mt-3">
                      {s.suffix.startsWith("+") ? s.suffix.replace("+", "") : s.suffix}
                    </span>
                  ) : null}
                </div>

                <div className="mt-2 text-xs font-semibold tracking-[0.18em] text-[hsl(var(--brand))] sm:text-sm">
                  {s.label.toUpperCase()}
                </div>

                {/* subtle divider on larger screens */}
                <div className="pointer-events-none absolute inset-y-3 right-0 hidden w-px bg-gradient-to-b from-transparent via-black/10 to-transparent sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}