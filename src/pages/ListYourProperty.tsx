import { useNavigate } from "react-router-dom";

import { RealEstateHeader } from "@/components/real-estate/RealEstateHeader";
import { SiteFooter } from "@/components/real-estate/SiteFooter";
import { ListPropertyForm } from "@/components/real-estate/ListPropertyForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ListYourPropertyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--page))]">
      <RealEstateHeader />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:pt-32">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-[hsl(var(--brand-ink))]">
              Owners
            </div>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              List your property
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Share your listing details — we’ll receive it on WhatsApp and come
              back with next steps.
            </p>
          </div>

          <Button
            variant="outline"
            className={cn("h-11 rounded-[5px]")}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <div className="mt-8">
          <ListPropertyForm whatsappNumber="+971521362224" />
        </div>
      </main>

      <SiteFooter
        onGetInTouch={() => navigate("/nav/services")}
        onNavigateSection={(hash) => {
          if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}