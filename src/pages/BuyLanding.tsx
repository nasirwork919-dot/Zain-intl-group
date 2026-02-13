import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { NavLandingOptionCard } from "@/components/real-estate/NavLandingOptionCard";
import { cn } from "@/lib/utils";

type BuyFeature = {
  key: "residential" | "off-plan" | "commercial";
  title: string;
  eyebrow: string;
  description: string;
  image: string;
};

export default function BuyLanding() {
  const navigate = useNavigate();

  const features = useMemo<BuyFeature[]>(
    () => [
      {
        key: "residential",
        title: "Residential",
        eyebrow: "Buy",
        description: "Apartments, townhouses, penthouses, and villas.",
        image:
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=80",
      },
      {
        key: "off-plan",
        title: "Off Plan",
        eyebrow: "Buy",
        description: "Launches, payment plans, and completion timelines.",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=80",
      },
      {
        key: "commercial",
        title: "Commercial",
        eyebrow: "Buy",
        description: "Offices and business-ready opportunities.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
      },
    ],
    [],
  );

  const heroImage =
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=3200&q=90";

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <section className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0b1220]/55" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-16 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
              Find your next home
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Buy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/80">
              Choose a lane first — then explore listings with a clean,
              filter-first experience.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, idx) => (
                <NavLandingOptionCard
                  key={f.key}
                  eyebrow={f.eyebrow}
                  title={f.title}
                  description={f.description}
                  image={f.image}
                  onClick={() => navigate(`/nav/buy/${f.key}`)}
                  className={cn(idx === 0 && "lg:col-span-2")}
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