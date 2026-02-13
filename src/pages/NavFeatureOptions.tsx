import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { NavLandingOptionCard } from "@/components/real-estate/NavLandingOptionCard";
import { getCategoryConfig, getFeatureConfig } from "@/components/real-estate/nav-features";
import { cn } from "@/lib/utils";

export default function NavFeatureOptionsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;
  const feature = params.feature ?? "";

  const catCfg = getCategoryConfig(category);
  const featureCfg = getFeatureConfig(category, feature);

  const options = useMemo(() => featureCfg?.options ?? [], [featureCfg?.options]);

  if (!catCfg || !featureCfg) {
    return (
      <div className="min-h-screen bg-[hsl(var(--page))]">
        <RealEstateHeader />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32">
          <div className="rounded-[5px] border border-black/5 bg-white/70 p-6 text-center ring-1 ring-black/10">
            <div className="text-lg font-extrabold tracking-tight">
              Not found
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              That section isn’t available yet.
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => navigate(`/nav/${category ?? ""}`)}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                  "bg-white/80 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 backdrop-blur",
                  "transition hover:bg-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/30",
                )}
              >
                Back
              </button>
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
            src={catCfg.heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0b1220]/60" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-16 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
              {featureCfg.eyebrow}
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {featureCfg.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/80">
              {featureCfg.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {options.map((o, idx) => (
                <NavLandingOptionCard
                  key={o.slug}
                  eyebrow={catCfg.title}
                  title={o.label}
                  description={o.description}
                  image={o.image}
                  onClick={() => navigate(`/nav/${category}/option/${o.slug}`)}
                  className={idx === 0 ? "lg:col-span-2" : undefined}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => navigate(`/nav/${category}`)}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                  "bg-white/80 text-[hsl(var(--brand-ink))] ring-1 ring-black/10 backdrop-blur",
                  "transition hover:bg-white",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/30",
                )}
              >
                Back to {catCfg.title}
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