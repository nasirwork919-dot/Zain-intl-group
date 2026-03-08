import { ArrowRight, BriefcaseBusiness, Mail, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

import { ContentPageShell } from "@/components/real-estate/ContentPageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const values = [
  "Clear communication over noise",
  "Operational discipline over guesswork",
  "Fast execution without sloppy details",
  "Respect for buyers, sellers, and teammates",
];

const roles = [
  {
    title: "Property Consultant",
    type: "Full-time",
    location: "Dubai, UAE",
    summary:
      "Work qualified leads, manage viewings, and keep deal communication sharp from first message to closing support.",
  },
  {
    title: "Listing Operations Coordinator",
    type: "Full-time",
    location: "Dubai, UAE",
    summary:
      "Own listing quality, CRM hygiene, image checks, and publishing accuracy across website and marketplace channels.",
  },
  {
    title: "Content and Media Executive",
    type: "Hybrid",
    location: "Dubai, UAE",
    summary:
      "Build better listing narratives, campaign assets, and short-form content that feels specific rather than generic.",
  },
];

export default function CareersPage() {
  return (
    <ContentPageShell
      eyebrow="Company"
      title="Careers"
      description="Join a team that treats real-estate work as a discipline: better listings, better communication, cleaner execution."
      heroImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2600&q=85"
      meta="Dubai-based roles and operational hires"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)] lg:col-span-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))]">
              <Users2 className="h-6 w-6" />
            </div>
            <div className="mt-4 text-2xl font-extrabold tracking-tight text-[#0b1025]">
              How we work
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#0b1025]/68">
              We value strong follow-through, good judgment, and people who can
              keep the details under control while moving quickly.
            </p>
            <ul className="mt-5 grid gap-3 text-sm font-medium text-[#0b1025]/72">
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)] lg:col-span-7">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand-2))]/14 text-[hsl(var(--brand-ink))]">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
            <div className="mt-4 text-2xl font-extrabold tracking-tight text-[#0b1025]">
              What to send
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#0b1025]/68">
              Send your CV, target role, Dubai experience summary, and examples
              of work or results that show how you operate under real pressure.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
              >
                <a href="mailto:careers@zaininternational.ae?subject=Career%20Application">
                  Apply by email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-[5px]">
                <Link to="/blogs">See how we think</Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <Card
              key={role.title}
              className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-[#0b1025]">
                    {role.title}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#0b1025]/55">
                    <span>{role.type}</span>
                    <span className="h-3 w-px bg-black/10" />
                    <span>{role.location}</span>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#0b1025]/68">
                    {role.summary}
                  </p>
                </div>

                <Button
                  asChild
                  className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
                >
                  <a
                    href={`mailto:careers@zaininternational.ae?subject=${encodeURIComponent(role.title)}`}
                  >
                    <Mail className="h-4 w-4" />
                    Apply
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ContentPageShell>
  );
}
