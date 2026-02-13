import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { NavLandingOptionCard } from "@/components/real-estate/NavLandingOptionCard";
import { cn } from "@/lib/utils";

type BuyFeatureKey = "residential" | "off-plan" | "commercial";

type FeatureConfig = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  options: { label: string; slug: string; image: string; desc: string }[];
};

const CONFIG: Record<BuyFeatureKey, FeatureConfig> = {
  residential: {
    title: "Residential",
    eyebrow: "Buy",
    description: "Choose a property type to explore listings.",
    heroImage:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=3200&q=85",
    options: [
      {
        label: "Apartments",
        slug: "apartments",
        desc: "High-demand towers and lifestyle-led communities.",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Townhouses",
        slug: "townhouses",
        desc: "Family-friendly layouts with community amenities.",
        image:
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Penthouses",
        slug: "penthouses",
        desc: "Skyline views, premium finishes, landmark addresses.",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Villas",
        slug: "villas",
        desc: "Space, privacy, and long-term lifestyle value.",
        image:
          "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "View All",
        slug: "all",
        desc: "Browse all residential inventory in one place.",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=80",
      },
    ],
  },
  "off-plan": {
    title: "Off Plan",
    eyebrow: "Buy",
    description: "Compare launches, handover timelines, and payment plans.",
    heroImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=3200&q=85",
    options: [
      {
        label: "Apartments",
        slug: "apartments",
        desc: "New releases across Marina, Downtown, and beyond.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Townhouses",
        slug: "townhouses",
        desc: "Community-first clusters with flexible plans.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Penthouses",
        slug: "penthouses",
        desc: "Limited inventory, best-in-class views and layouts.",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "Villas",
        slug: "villas",
        desc: "Long-horizon lifestyle builds in premium districts.",
        image:
          "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "View All",
        slug: "all",
        desc: "See all off-plan options and launch cards.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
      },
    ],
  },
  commercial: {
    title: "Commercial",
    eyebrow: "Buy",
    description: "Business-ready inventory with clear next steps.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3200&q=85",
    options: [
      {
        label: "Offices",
        slug: "offices",
        desc: "Prime towers, flexible sizes, central districts.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      },
      {
        label: "View All",
        slug: "all",
        desc: "Browse all commercial inventory.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=80",
      },
    ],
  },
};

function isBuyFeatureKey(v?: string): v is BuyFeatureKey {
  return v === "residential" || v === "off-plan" || v === "commercial";
}

export default function BuyFeaturePage() {
  const navigate = useNavigate();
  const params = useParams();
  const feature = params.feature;

  const key: BuyFeatureKey = isBuyFeatureKey(feature) ? feature : "residential";
  const cfg = CONFIG[key];

  const options = useMemo(() => cfg.options, [cfg.options]);

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <section className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={cfg.heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0b1220]/60" />
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

          <div className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {options.map((o, idx) => (
                <NavLandingOptionCard
                  key={o.slug}
                  eyebrow={cfg.title}
                  title={o.label}
                  description={o.desc}
                  image={o.image}
                  onClick={() => navigate(`/nav/buy/${o.slug}`)}
                  className={cn(idx === 0 && "lg:col-span-2")}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => navigate("/nav/buy")}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                  "bg-white/80 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 backdrop-blur",
                  "transition hover:bg-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/30",
                )}
              >
                Back to Buy features
              </button>
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