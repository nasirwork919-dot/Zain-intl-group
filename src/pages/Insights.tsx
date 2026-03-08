import { ArrowRight, BarChart3, Building2, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

import { ContentPageShell } from "@/components/real-estate/ContentPageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const insightCards = [
  {
    title: "How inventory quality affects lead conversion",
    category: "Operations",
    readTime: "4 min read",
    summary:
      "Why better listing media, cleaner CRM fields, and faster sync cycles usually outperform adding more listings blindly.",
  },
  {
    title: "What buyers ask first in central Dubai submarkets",
    category: "Demand",
    readTime: "5 min read",
    summary:
      "A practical look at the questions serious buyers and tenants ask before they request a viewing or shortlist.",
  },
  {
    title: "Feed hygiene for marketplace distribution",
    category: "Marketplace",
    readTime: "6 min read",
    summary:
      "The operational checks that reduce rejected listings, broken image slots, and outdated pricing across external portals.",
  },
  {
    title: "Why neighborhood wording changes search quality",
    category: "Content",
    readTime: "3 min read",
    summary:
      "Precise community naming often improves the buyer journey more than another generic marketing paragraph.",
  },
  {
    title: "A simple review cadence for live inventory",
    category: "Process",
    readTime: "5 min read",
    summary:
      "A practical weekly routine for checking stale listings, missing amenities, weak descriptions, and image quality.",
  },
  {
    title: "Where real-estate websites lose trust fastest",
    category: "UX",
    readTime: "4 min read",
    summary:
      "Broken promises usually come from speed, clarity, and data freshness issues, not from visual design alone.",
  },
];

const focusAreas = [
  {
    icon: LineChart,
    title: "Market Signals",
    text: "Transaction movement, buyer behavior, and practical demand indicators.",
  },
  {
    icon: Building2,
    title: "Listing Operations",
    text: "Data hygiene, CRM workflows, media quality, and publishing standards.",
  },
  {
    icon: BarChart3,
    title: "Commercial Clarity",
    text: "How content, feeds, and site decisions affect inquiry quality and revenue flow.",
  },
];

export default function InsightsPage() {
  return (
    <ContentPageShell
      eyebrow="Editorial"
      title="Insights"
      description="Short, practical notes on inventory quality, market behavior, publishing workflows, and what improves real estate outcomes."
      heroImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2600&q=85"
      meta="Fresh perspective for operators, agents, and property teams"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((item) => (
            <Card
              key={item.title}
              className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))]">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-lg font-extrabold tracking-tight text-[#0b1025]">
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#0b1025]/68">
                {item.text}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {insightCards.map((item) => (
            <Card
              key={item.title}
              className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#0b1025]/55">
                <span>{item.category}</span>
                <span className="h-3 w-px bg-black/10" />
                <span>{item.readTime}</span>
              </div>
              <div className="mt-3 text-2xl font-extrabold tracking-tight text-[#0b1025]">
                {item.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0b1025]/68">
                {item.summary}
              </p>
            </Card>
          ))}
        </div>

        <Card className="rounded-[5px] border border-black/10 bg-white p-7 shadow-[0_22px_70px_-52px_rgba(15,23,42,0.28)]">
          <div className="text-sm font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))]">
            Next step
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1025]">
            Need a custom market or operations brief?
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#0b1025]/68">
            If you want a focused note for your inventory, feed structure, or
            conversion flow, contact the team and we can turn it into a working
            action list.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
            >
              <Link to="/nav/services/option/all">
                Contact the team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-[5px]">
              <Link to="/blogs">Browse blogs</Link>
            </Button>
          </div>
        </Card>
      </div>
    </ContentPageShell>
  );
}
