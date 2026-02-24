import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/real-estate/SmartImage";

type Community = {
  title: string;
  image: string;
  locationFilter: string;
  subtitle?: string;
};

const communities: Community[] = [
  {
    title: "Dubai Hills Estate",
    subtitle: "Family-first green district",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=85",
    locationFilter: "Dubai Hills Estate",
  },
  {
    title: "Dubai Marina",
    subtitle: "Waterfront lifestyle & skyline",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2400&q=85",
    locationFilter: "Dubai Marina",
  },
  {
    title: "Downtown Dubai",
    subtitle: "Landmarks & prime access",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85",
    locationFilter: "Downtown Dubai",
  },
  {
    title: "Business Bay",
    subtitle: "Canal-side living",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2400&q=85",
    locationFilter: "Business Bay",
  },
  {
    title: "Jumeirah Village Circle",
    subtitle: "Value + community convenience",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85",
    locationFilter: "Jumeirah Village Circle",
  },
];

function CommunityLaunchStyleCard({
  community,
  onOpen,
  className,
}: {
  community: Community;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-[28px]",
        "ring-1 ring-white/10",
        "bg-white/5",
        "shadow-[0_26px_90px_-65px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-[2] focus:outline-none"
        aria-label={`Open ${community.title}`}
      />

      <div className="relative z-[1] h-full w-full">
        <SmartImage
          src={community.image}
          alt={community.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/15" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      </div>

      {/* Top controls (match CuratedLaunchCard vibe) */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[3] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-none inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
              <span className="text-lg font-black tracking-tight text-white">
                Z
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-extrabold tracking-[0.08em] text-white">
                ZAIN INTERNATIONAL GROUP
              </div>
              <div className="text-[10px] font-semibold tracking-[0.22em] text-white/70">
                REAL ESTATE · DUBAI
              </div>
            </div>
          </div>

          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                "bg-white/0 text-white",
                "ring-1 ring-white/60",
                "backdrop-blur",
                "transition",
                "hover:bg-white/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              )}
              aria-label={`Open ${community.title}`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[3] p-6">
        <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/80">
          COMMUNITY EDIT
        </div>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white">
              {community.title}
            </h3>
            {community.subtitle ? (
              <p className="mt-1 text-sm font-semibold text-white/80">
                {community.subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ExploreCommunities({
  onPick,
  className,
}: {
  onPick?: (locationFilter: string) => void;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const canPrev = active > 0;
  const canNext = active < communities.length - 1;

  const scrollToActive = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children.item(idx) as HTMLElement | null;
    if (!child) return;
    child.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToActive(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const filtered = useMemo(() => communities, []);

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
            Explore communities
          </div>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[hsl(var(--ink))] sm:text-3xl">
            Neighborhoods with skyline energy
          </h2>
          <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-[hsl(var(--muted-ink))]">
            Browse Dubai by vibe — from landmark living in Downtown to
            marina-front towers and calm, family-first districts.
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => setActive((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
              "ring-1 ring-black/10",
              "bg-white",
              "text-[hsl(var(--ink))]",
              "shadow-sm",
              "transition",
              canPrev ? "hover:bg-[hsl(var(--wash))]" : "opacity-50",
            )}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setActive((v) => Math.min(communities.length - 1, v + 1))}
            disabled={!canNext}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
              "ring-1 ring-black/10",
              "bg-white",
              "text-[hsl(var(--ink))]",
              "shadow-sm",
              "transition",
              canNext ? "hover:bg-[hsl(var(--wash))]" : "opacity-50",
            )}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-[22px] bg-white p-3 ring-1 ring-black/5 shadow-sm">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(var(--wash))] text-[hsl(var(--brand-ink))]">
          <Search className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-[hsl(var(--muted-ink))]">
          Tip: click a card to filter the listings by area
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={cn("mt-7 grid gap-4", "sm:grid-cols-2", "lg:grid-cols-3")}
      >
        {filtered.map((c, idx) => (
          <div key={c.title} className="min-h-[320px]">
            <CommunityLaunchStyleCard
              community={c}
              onOpen={() => onPick?.(c.locationFilter)}
              className={cn(idx === 0 ? "lg:col-span-2" : "")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}