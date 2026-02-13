import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { NavLandingOptionCard } from "@/components/real-estate/NavLandingOptionCard";
import { getCategoryConfig } from "@/components/real-estate/nav-features";

export default function NavFeatureLandingPage() {
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;

  const cfg = getCategoryConfig(category);

  const features = useMemo(() => cfg?.features ?? [], [cfg?.features]);

  if (!cfg) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32">
          <div className="rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
            <div className="text-lg font-extrabold tracking-tight">
              Category not found
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              This section isn’t configured yet.
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, idx) => (
                <NavLandingOptionCard
                  key={f.key}
                  eyebrow={cfg.title}
                  title={f.title}
                  description={f.description}
                  image={f.image}
                  onClick={() => navigate(`/nav/${category}/${f.key}`)}
                  className={idx === 0 ? "lg:col-span-2" : undefined}
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