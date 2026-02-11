import { useMemo, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Mail,
  ChevronUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type FooterLink = { label: string; onClick: () => void };

export function SiteFooter({
  onGetInTouch,
  onNavigateSection,
  className,
}: {
  onGetInTouch: () => void;
  onNavigateSection: (hash: string) => void;
  className?: string;
}) {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const quickLinks = useMemo<FooterLink[]>(
    () => [
      { label: "Buy", onClick: () => onNavigateSection("#listings") },
      { label: "Rent", onClick: () => onNavigateSection("#listings") },
      { label: "Communities", onClick: () => onNavigateSection("#projects") },
      { label: "Developers", onClick: () => onNavigateSection("#projects") },
      { label: "Market Trends", onClick: () => onNavigateSection("#about") },
      { label: "Services", onClick: () => onNavigateSection("#contact") },
      { label: "Guides", onClick: () => onNavigateSection("#about") },
    ],
    [onNavigateSection],
  );

  const resources = useMemo<FooterLink[]>(
    () => [
      {
        label: "Blogs",
        onClick: () =>
          toast({
            title: "Blogs",
            description: "We can add a blog section next.",
          }),
      },
      {
        label: "Careers",
        onClick: () =>
          toast({
            title: "Careers",
            description: "We can add a careers page next.",
          }),
      },
      {
        label: "Insights",
        onClick: () =>
          toast({
            title: "Insights",
            description: "We can add insights/reports next.",
          }),
      },
    ],
    [],
  );

  const social = useMemo(
    () => [
      {
        label: "Facebook",
        icon: Facebook,
        onClick: () =>
          toast({
            title: "Social",
            description: "Connect your social profiles here.",
          }),
      },
      {
        label: "LinkedIn",
        icon: Linkedin,
        onClick: () =>
          toast({
            title: "Social",
            description: "Connect your social profiles here.",
          }),
      },
      {
        label: "X",
        icon: Twitter,
        onClick: () =>
          toast({
            title: "Social",
            description: "Connect your social profiles here.",
          }),
      },
      {
        label: "Instagram",
        icon: Instagram,
        onClick: () =>
          toast({
            title: "Social",
            description: "Connect your social profiles here.",
          }),
      },
    ],
    [],
  );

  const ctaBg =
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2600&q=80";

  const sectionTitle =
    "text-sm font-extrabold tracking-tight text-white";
  const linkClass = cn(
    "text-sm font-semibold text-white/80 transition hover:text-white",
    "rounded-[10px] px-2 py-1 text-left",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
  );

  const outlineCard = cn(
    "rounded-[18px] border border-white/20 bg-[#001a66]",
    "px-5 py-4",
  );

  return (
    <footer className={cn("w-full", className)}>
      {/* Full-width CTA background strip (no box/border) */}
      <section className="relative overflow-hidden border-t border-white/10">
        <img
          src={ctaBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0b1220]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 via-[#0b1220]/55 to-[#0b1220]/10" />

        <div className="relative z-[2]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
                  ZAIN INTERNATIONAL GROUP
                </div>
                <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Our Expert Will Help You
                </h3>
                <p className="mt-2 max-w-xl text-sm font-medium text-white/85">
                  Feel free to contact us at any time — we’re online 24/7 for
                  shortlists, payment plans, and viewings.
                </p>

                <div className="mt-5 text-[11px] font-semibold text-white/75">
                  Trusted guidance · Clear next steps · Premium communities
                </div>
              </div>

              <div className="md:col-span-4 md:flex md:justify-end">
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
                  <Button
                    onClick={onGetInTouch}
                    className="h-11 rounded-full bg-white px-7 font-semibold text-[#111827] hover:bg-white/95"
                  >
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 rounded-full",
                      "border-white/25 bg-white/0 text-white",
                      "ring-1 ring-white/15",
                      "hover:bg-white/10 hover:text-white",
                    )}
                    onClick={() =>
                      toast({
                        title: "Quick shortlist",
                        description:
                          "Tell us your area + budget and we’ll send a curated list.",
                      })
                    }
                  >
                    Request shortlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean deep-blue footer (match site + provided reference) */}
      <section className="relative bg-[#001a66]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Newsletter card */}
            <div className="lg:col-span-5">
              <Card className="rounded-[28px] border-0 bg-white p-7 shadow-none sm:p-8">
                <div className="text-2xl font-extrabold tracking-tight text-[#0b1025]">
                  Newsletter
                </div>
                <div className="mt-2 text-sm text-[#0b1025]/65">
                  Subscribe for our weekly newsletter and marketing updates
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0b1025]/45" />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={cn(
                        "h-12 rounded-full border-0 bg-[#0b1025]/10 pl-11",
                        "text-[#0b1025] placeholder:text-[#0b1025]/45",
                        "ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-[#001a66]/25",
                      )}
                    />
                  </div>

                  <Button
                    className="h-12 rounded-full bg-[#0b0b45] text-white hover:bg-[#0b0b45]/92"
                    onClick={() => {
                      const v = email.trim();
                      if (!v) {
                        toast({
                          title: "Email required",
                          description: "Please enter your email address.",
                        });
                        return;
                      }
                      toast({
                        title: "Subscribed",
                        description: "You’re on the list — welcome aboard.",
                      });
                      setEmail("");
                    }}
                  >
                    Submit
                  </Button>

                  <div className="pt-1 text-[11px] font-semibold text-[#0b1025]/55">
                    No spam. Unsubscribe anytime.
                  </div>
                </div>
              </Card>
            </div>

            {/* Right side: links + contact + social */}
            <div className="lg:col-span-7">
              <div className="grid gap-10 sm:grid-cols-3">
                {/* Quick links (two columns inside) */}
                <div className="sm:col-span-1">
                  <div className={sectionTitle}>Quick Links</div>
                  <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2">
                    <ul className="grid gap-2">
                      {quickLinks.slice(0, 4).map((l) => (
                        <li key={l.label}>
                          <button type="button" onClick={l.onClick} className={linkClass}>
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="grid gap-2">
                      {quickLinks.slice(4).map((l) => (
                        <li key={l.label}>
                          <button type="button" onClick={l.onClick} className={linkClass}>
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 text-sm font-extrabold tracking-tight text-white">
                    Resources
                  </div>
                  <ul className="mt-4 grid gap-2">
                    {resources.map((l) => (
                      <li key={l.label}>
                        <button type="button" onClick={l.onClick} className={linkClass}>
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="sm:col-span-1">
                  <div className={sectionTitle}>Contact Us</div>

                  <div className="mt-5 grid gap-4">
                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                        ADDRESS
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-relaxed text-white/85">
                        Floor 13, Blue Bay Tower
                        <br />
                        Business Bay, Dubai, UAE
                      </div>
                    </div>

                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                        PHONE
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white/85">
                        +971 800 32632
                      </div>
                    </div>

                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                        EMAIL
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white/85">
                        inquiry@zaininternational.ae
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social + availability */}
                <div className="sm:col-span-1">
                  <div className={sectionTitle}>Social Media</div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {social.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={s.onClick}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full",
                          "border border-white/25 bg-transparent text-white",
                          "transition hover:bg-white/10",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                        )}
                        aria-label={s.label}
                      >
                        <s.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <div className={cn("mt-6", outlineCard)}>
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                      AVAILABILITY
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-white/85">
                      Online 24/7 for shortlists & viewings
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="mt-12 grid items-center gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
                <div className="hidden sm:block" />

                <div className="text-center text-xs font-semibold text-white/85">
                  © {year} Zain International Group. All Rights Reserved
                </div>

                <div className="flex items-center justify-center gap-6 sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "Privacy Policy",
                        description: "We can add a privacy policy page next.",
                      })
                    }
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                  >
                    Privacy Policy
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "Terms of Service",
                        description: "We can add terms of service next.",
                      })
                    }
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-to-top button inside footer, aligned bottom-right like reference */}
          <div className="pointer-events-none mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateSection("#top")}
              className={cn(
                "pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-[6px]",
                "bg-white/90 text-[#0b1025] ring-1 ring-black/10",
                "transition hover:bg-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              )}
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
}