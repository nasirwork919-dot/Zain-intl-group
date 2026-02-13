import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function NavLandingOptionCard({
  eyebrow,
  title,
  description,
  image,
  onClick,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[28px]",
        "ring-1 ring-white/12 bg-white/5",
        "shadow-[0_26px_90px_-65px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-[3] focus:outline-none"
        aria-label={`Open ${title}`}
      />

      <div className="relative z-[1]">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[460px]"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/15" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* top right icon */}
      <div className="pointer-events-none absolute right-5 top-5 z-[4]">
        <div
          className={cn(
            "pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl",
            "bg-white/0 text-white ring-1 ring-white/60 backdrop-blur",
            "transition group-hover:bg-white/10",
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] p-5">
        <div className="text-[10px] font-semibold tracking-[0.22em] text-white/75">
          {eyebrow.toUpperCase()}
        </div>

        <div className="mt-2 font-serif text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
          {title}
        </div>

        <p className="mt-2 max-w-[36ch] text-sm font-medium leading-relaxed text-white/80">
          {description}
        </p>

        <div className="mt-4 inline-flex items-center rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[hsl(var(--brand-ink))] shadow-sm ring-1 ring-black/5">
          View details
        </div>
      </div>
    </article>
  );
}