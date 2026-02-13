import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import {
  NAV_OPTIONS,
  type NavCategoryKey,
} from "@/components/real-estate/nav-config";
import { cn } from "@/lib/utils";
import { NavLandingOptionCard } from "@/components/real-estate/NavLandingOptionCard";

type LandingConfig = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  optionImages: string[];
};

const CONFIG: Record<NavCategoryKey, LandingConfig> = {
  buy: {
    title: "Buy",
    eyebrow: "Find your next home",
    description:
      "Choose a category to explore listings with filters, launch-style cards, and a guided next step.",
    heroImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=3200&q=90",
    optionImages: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  rent: {
    title: "Rent",
    eyebrow: "Flexible living, premium locations",
    description:
      "Pick a rental category — then refine with search + filters and browse featured listings.",
    heroImage:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=3200&q=90",
    optionImages: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  communities: {
    title: "Communities",
    eyebrow: "Neighborhood discovery",
    description:
      "Select a community to see listings and insights tailored to that location.",
    heroImage:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=3200&q=85",
    optionImages: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  developers: {
    title: "Developers",
    eyebrow: "Developer-led opportunities",
    description:
      "Choose a developer to explore signature projects and featured opportunities.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3200&q=85",
    optionImages: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  "featured-projects": {
    title: "Featured Projects",
    eyebrow: "Market pulse",
    description:
      "Select a featured project category to explore curated content and opportunities.",
    heroImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3200&q=85",
    optionImages: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  services: {
    title: "Services",
    eyebrow: "Full-service real estate",
    description:
      "Select a service to see what’s included, how it works, and request support.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=3200&q=85",
    optionImages: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
    ],
  },
  more: {
    title: "More",
    eyebrow: "Company & resources",
    description: "Browse company pages, content, and resources.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=3200&q=85",
    optionImages: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
    ],
  },
};

function hintForCategory(category: NavCategoryKey) {
  if (category === "buy") return "Explore listings, filter fast, and compare.";
  if (category === "rent") return "Rental-ready homes with clear next steps.";
  if (category === "communities")
    return "Lifestyle-led areas, curated inventory, and insights.";
  if (category === "developers")
    return "Developer opportunities, launches, and timelines.";
  if (category === "featured-projects")
    return "Trends, guides, and featured reports.";
  if (category === "services") return "How we help, what’s included, and more.";
  return "Company pages, content, and resources.";
}

export default function NavCategoryLandingPage() {
  const navigate = useNavigate();
  const params = useParams();
  const category = (params.category as NavCategoryKey) ?? "buy";

  const cfg = CONFIG[category];
  const options = NAV_OPTIONS[category];

  const columns = useMemo(() => {
    return options;
  }, [options]);

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={cfg.heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0b1220]/55" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-16 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
              {cfg.eyebrow}
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {cfg.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/80">
              {cfg.description}
            </p>
          </div>

          {/* Options grid */}
          <div className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((o, idx) => (
                <NavLandingOptionCard
                  key={o.slug}
                  eyebrow={cfg.title}
                  title={o.label}
                  description={hintForCategory(category)}
                  image={cfg.optionImages[idx % cfg.optionImages.length]}
                  onClick={() => navigate(`/nav/${category}/${o.slug}`)}
                  className={cn(
                    idx === 0 && "lg:col-span-2",
                    idx === 0 && "lg:h-[520px]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        onGetInTouch={() => navigate("/nav/services")}
        onNavigateSection={(hash) => {
          if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}