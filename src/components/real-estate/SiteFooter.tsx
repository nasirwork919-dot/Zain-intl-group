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

  const ink = "text-[#0b1025]";
  const sectionTitle = cn("text-sm font-extrabold tracking-tight", ink);

  const linkClass = cn(
    "text-sm font-semibold text-[#0b1025]/75 transition hover:text-[#0b1025]",
    "rounded-[5px] px-2 py-1 text-left",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
  );

  const outlineCard = cn(
    "rounded-[5px] border border-black/10 bg-white",
    "p-4 sm:p-5",
  );

  const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

  return (
    <footer className={cn("w-full", className)}>
      {/* Full-width CTA strip */}
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
          <div className={cn(containerClass, "py-12 sm:py-14 lg:py-16")}>
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/80">
                  ZAIN INTERNATIONAL GROUP
                </div>
                <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Our Expert Will Help You
                </h3>
                <p className="mt-3 max-w-xl text-sm font-medium text-white/85">
                  Feel free to contact us at any time — we’re online 24/7 for
                  shortlists, payment plans, and viewings.
                </p>

                <div className="mt-5 text-[11px] font-semibold text-white/75">
                  Trusted guidance · Clear next steps · Premium communities
                </div>
              </div>

              <div className="md:col-span-4 md:flex md:justify-end">
                <div className="grid w-full gap-3 sm:max-w-[360px]">
                  <Button
                    onClick={onGetInTouch}
                    className="h-11 w-full rounded-[5px] bg-white px-7 font-semibold text-[#111827] hover:bg-white/95"
                  >
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full rounded-[5px]",
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

      {/* White footer */}
      <section className="relative border-t border-black/10 bg-white">
        <div className={cn(containerClass, "py-12 sm:py-14 lg:py-16")}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Newsletter */}
            <div className="lg:col-span-5">
              <Card className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.35)] sm:p-7">
                <div className="text-2xl font-extrabold tracking-tight text-[#0b1025]">
                  Newsletter
                </div>
                <div className="mt-2 text-sm text-[#0b1025]/60">
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
                        "h-12 rounded-[5px] border border-black/10 bg-[#0b1025]/[0.05] pl-11",
                        "text-[#0b1025] placeholder:text-[#0b1025]/45",
                        "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                      )}
                    />
                  </div>

                  <Button
                    className="h-12 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
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

            {/* Right side */}
            <div className="lg:col-span-7">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Quick Links + Resources */}
                <div>
                  <div className={sectionTitle}>Quick Links</div>

                  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
                    <ul className="grid gap-2">
                      {quickLinks.slice(0, 4).map((l) => (
                        <li key={l.label}>
                          <button
                            type="button"
                            onClick={l.onClick}
                            className={linkClass}
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="grid gap-2">
                      {quickLinks.slice(4).map((l) => (
                        <li key={l.label}>
                          <button
                            type="button"
                            onClick={l.onClick}
                            className={linkClass}
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 text-sm font-extrabold tracking-tight text-[#0b1025]">
                    Resources
                  </div>
                  <ul className="mt-4 grid gap-2">
                    {resources.map((l) => (
                      <li key={l.label}>
                        <button
                          type="button"
                          onClick={l.onClick}
                          className={linkClass}
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <div className={sectionTitle}>Contact Us</div>

                  <div className="mt-5 grid gap-4">
                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-[#0b1025]/55">
                        ADDRESS
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-relaxed text-[#0b1025]/85">
                        Floor 13, Blue Bay Tower
                        <br />
                        Business Bay, Dubai, UAE
                      </div>
                    </div>

                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-[#0b1025]/55">
                        PHONE
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0b1025]/85">
                        +971 800 32632
                      </div>
                    </div>

                    <div className={outlineCard}>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-[#0b1025]/55">
                        EMAIL
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0b1025]/85">
                        inquiry@zaininternational.ae
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social + availability */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className={sectionTitle}>Social Media</div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {social.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={s.onClick}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-[5px]",
                          "border border-black/12 bg-white text-[#0b1025]",
                          "transition hover:bg-[#0b1025]/[0.04]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
                        )}
                        aria-label={s.label}
                      >
                        <s.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <div className={cn("mt-6", outlineCard)}>
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-[#0b1025]/55">
                      AVAILABILITY
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-[#0b1025]/85">
                      Online 24/7 for shortlists & viewings
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom area: fully centered */}
              <div className="mt-12 border-t border-black/10 pt-6">
                <div className="grid justify-items-center gap-3 text-center">
                  <div className="text-xs font-semibold text-[#0b1025]/80">
                    © {year} Zain International Group. All Rights Reserved
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        toast({
                          title: "Privacy Policy",
                          description: "We can add a privacy policy page next.",
                        })
                      }
                      className="text-xs font-semibold text-[#0b1025]/70 transition hover:text-[#0b1025]"
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
                      className="text-xs font-semibold text-[#0b1025]/70 transition hover:text-[#0b1025]"
                    >
                      Terms of Service
                    </button>
                  </div>

                  <div className="text-xs font-semibold text-[#0b1025]/60">
                    Created by{" "}
                    <a
                      href="https://marknova.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0b1025]/80 underline underline-offset-4 decoration-black/20 transition hover:text-[#0b1025] hover:decoration-black/40"
                    >
                      marknova
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll-to-top button bottom-right */}
          <div className="pointer-events-none mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateSection("#top")}
              className={cn(
                "pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-[5px]",
                "bg-white text-[#0b1025] ring-1 ring-black/10",
                "shadow-sm transition hover:bg-[#0b1025]/[0.03]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]/25",
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