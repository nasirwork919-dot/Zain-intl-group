import { useMemo, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Mail,
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

  const sectionTitle = "text-sm font-extrabold tracking-tight text-white";
  const subtle =
    "text-sm font-semibold text-white/82 transition hover:text-white";

  return (
    <footer className={cn("w-full", className)}>
      {/* Full-width CTA background strip (no box/border) */}
      <section className="relative overflow-hidden border-t border-white/10">
        {/* Background */}
        <img
          src={ctaBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* Contrast overlays */}
        <div className="absolute inset-0 bg-[#0b1220]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 via-[#0b1220]/55 to-[#0b1220]/10" />

        {/* Content */}
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

      {/* Deep blue body */}
      <section className="relative overflow-hidden bg-[#001a66]">
        {/* subtle texture / depth (no gradients; just soft lighting) */}
        <div className="pointer-events-none absolute inset-0 opacity-100">
          <div className="absolute -left-24 -top-32 h-[520px] w-[520px] rounded-full bg-white/6 blur-3xl" />
          <div className="absolute -right-24 -bottom-40 h-[560px] w-[560px] rounded-full bg-black/15 blur-3xl" />
          <div className="absolute inset-0 ring-1 ring-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-10 py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
            {/* Newsletter card */}
            <div className="lg:col-span-5">
              <Card className="rounded-[28px] border-0 bg-white p-6 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.75)] sm:p-8">
                <div className="text-2xl font-extrabold tracking-tight text-[#0b1025]">
                  Newsletter
                </div>
                <div className="mt-2 text-sm text-[#0b1025]/60">
                  Subscribe for our weekly newsletter and marketing updates
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0b1025]/50" />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={cn(
                        "h-12 rounded-full border-0 bg-[#0b0b45]/10 pl-11",
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

            {/* Links + contact */}
            <div className="lg:col-span-7">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Quick Links */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className={sectionTitle}>Quick Links</div>

                  <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
                    <ul className="grid gap-3">
                      {quickLinks.slice(0, 4).map((l) => (
                        <li key={l.label}>
                          <button
                            type="button"
                            onClick={l.onClick}
                            className={cn(
                              "w-full text-left",
                              subtle,
                              "rounded-[10px] px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                            )}
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <ul className="grid gap-3">
                      {quickLinks.slice(4).map((l) => (
                        <li key={l.label}>
                          <button
                            type="button"
                            onClick={l.onClick}
                            className={cn(
                              "w-full text-left",
                              subtle,
                              "rounded-[10px] px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                            )}
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                      <li className="pt-2">
                        <div className={sectionTitle}>Resources</div>
                        <ul className="mt-4 grid gap-3">
                          {resources.map((l) => (
                            <li key={l.label}>
                              <button
                                type="button"
                                onClick={l.onClick}
                                className={cn(
                                  "w-full text-left",
                                  subtle,
                                  "rounded-[10px] px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                                )}
                              >
                                {l.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contact Us */}
                <div>
                  <div className={sectionTitle}>Contact Us</div>

                  <div className="mt-5 grid gap-3">
                    {[
                      {
                        label: "Address",
                        value: "Floor 13, Blue Bay Tower, Business Bay, Dubai, UAE",
                      },
                      { label: "Phone", value: "+971 800 32632" },
                      {
                        label: "Email",
                        value: "inquiry@zaininternational.ae",
                      },
                    ].map((i) => (
                      <div
                        key={i.label}
                        className={cn(
                          "rounded-[16px] bg-white/6 p-4",
                          "ring-1 ring-white/12",
                        )}
                      >
                        <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                          {i.label.toUpperCase()}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-white/88">
                          {i.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <div className={sectionTitle}>Social Media</div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {social.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={s.onClick}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full",
                          "bg-white/8 text-white ring-1 ring-white/16",
                          "transition hover:bg-white/14",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                        )}
                        aria-label={s.label}
                      >
                        <s.icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[16px] bg-white/6 p-4 ring-1 ring-white/12">
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-white/60">
                      AVAILABILITY
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/88">
                      Online 24/7 for shortlists & viewings
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 h-px w-full bg-white/12" />

              <div className="flex flex-col gap-3 py-6 text-xs font-semibold text-white/80 sm:flex-row sm:items-center sm:justify-between">
                <div>© {year} Zain International Group. All Rights Reserved</div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "Privacy Policy",
                        description: "We can add a privacy policy page next.",
                      })
                    }
                    className="rounded-[10px] px-2 py-1 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
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
                    className="rounded-[10px] px-2 py-1 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}