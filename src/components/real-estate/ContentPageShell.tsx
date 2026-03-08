import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { cn } from "@/lib/utils";

export function ContentPageShell({
  eyebrow,
  title,
  description,
  heroImage,
  meta,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();

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
          <div className="absolute inset-0 bg-[#0b1220]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/82 via-[#0b1220]/58 to-[#0b1220]/42" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:pb-16 sm:pt-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/78">
              {eyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/82 sm:text-base">
              {description}
            </p>
            {meta ? (
              <div className="mt-5 inline-flex items-center rounded-[5px] border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white/72 backdrop-blur">
                {meta}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <main className={cn("mx-auto max-w-6xl px-4 pb-16 pt-8", className)}>
        {children}
      </main>

      <SiteFooter
        onGetInTouch={() => navigate("/nav/services/option/all")}
        onNavigateSection={(hash) => {
          if (hash === "#top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}
