import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/real-estate/SmartImage";

type Community = {
  title: string;
  image: string;
  layout: "left" | "middle" | "rightTop" | "rightBottom";
  locationFilter: string;
};

const communities: Community[] = [
  {
    title: "DUBAI HILLS ESTATE",
    image:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2000&q=80",
    layout: "left",
    locationFilter: "Dubai Hills Estate",
  },
  {
    title: "DUBAILAND",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80",
    layout: "middle",
    locationFilter: "Business Bay",
  },
  {
    title: "MOHAMMED BIN RASHID CITY",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
    layout: "rightTop",
    locationFilter: "Downtown Dubai",
  },
  {
    title: "JUMEIRAH GOLF ESTATES",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    layout: "rightBottom",
    locationFilter: "Jumeirah Village Circle",
  },
];

function CommunityTile({
  title,
  image,
  className,
  onSearch,
}: {
  title: string;
  image: string;
  className?: string;
  onSearch: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSearch}
      className={cn(
        "group relative w-full overflow-hidden rounded-[2rem] text-left ring-1 ring-black/10",
        "bg-white shadow-[0_22px_70px_-55px_rgba(15,23,42,0.7)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/35",
        className,
      )}
      aria-label={`Search in ${title}`}
    >
      <SmartImage
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />

      <div className="absolute bottom-5 left-5 right-5">
        <div className="text-xs font-semibold tracking-[0.18em] text-white/90 drop-shadow">
          {title}
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur">
          <Search className="h-4 w-4 text-white/90" />
          <span>SEARCH</span>
        </div>
      </div>
    </button>
  );
}

export function ExploreCommunities({
  onSearchCommunity,
  className,
}: {
  onSearchCommunity: (location: string) => void;
  className?: string;
}) {
  const left = communities.find((c) => c.layout === "left")!;
  const middle = communities.find((c) => c.layout === "middle")!;
  const rightTop = communities.find((c) => c.layout === "rightTop")!;
  const rightBottom = communities.find((c) => c.layout === "rightBottom")!;

  return (
    <section className={cn("mx-auto max-w-6xl px-4 pb-10 sm:pb-14", className)}>
      <div className="text-center">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Explore{" "}
          <span className="text-[hsl(var(--brand))]">Communities</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          Browse by neighborhood — tap any tile to jump to listings with that
          area pre-selected.
        </p>
      </div>

      {/* Desktop mosaic */}
      <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-12">
        <CommunityTile
          title={left.title}
          image={left.image}
          onSearch={() => onSearchCommunity(left.locationFilter)}
          className="lg:col-span-4 lg:h-[460px]"
        />
        <CommunityTile
          title={middle.title}
          image={middle.image}
          onSearch={() => onSearchCommunity(middle.locationFilter)}
          className="lg:col-span-4 lg:h-[460px]"
        />
        <div className="lg:col-span-4 lg:grid lg:h-[460px] lg:grid-rows-2 lg:gap-4">
          <CommunityTile
            title={rightTop.title}
            image={rightTop.image}
            onSearch={() => onSearchCommunity(rightTop.locationFilter)}
            className="h-full"
          />
          <CommunityTile
            title={rightBottom.title}
            image={rightBottom.image}
            onSearch={() => onSearchCommunity(rightBottom.locationFilter)}
            className="h-full"
          />
        </div>
      </div>

      {/* Mobile/tablet: stacked cards */}
      <div className="mt-8 grid gap-4 lg:hidden">
        {communities.map((c) => (
          <CommunityTile
            key={c.title}
            title={c.title}
            image={c.image}
            onSearch={() => onSearchCommunity(c.locationFilter)}
            className="h-[220px] sm:h-[260px]"
          />
        ))}
      </div>
    </section>
  );
}