import { ArrowRight, CalendarDays, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

import { ContentPageShell } from "@/components/real-estate/ContentPageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const posts = [
  {
    title: "What makes a listing feel trustworthy in the first 10 seconds",
    category: "Website",
    date: "March 2026",
    summary:
      "The small details that immediately tell buyers whether a property card is worth clicking or ignoring.",
  },
  {
    title: "The practical difference between a lead and a qualified inquiry",
    category: "Sales",
    date: "February 2026",
    summary:
      "A short framework for deciding which incoming requests should move first and which need more qualification.",
  },
  {
    title: "Five signs your CRM fields are blocking better marketing",
    category: "Operations",
    date: "February 2026",
    summary:
      "When image fields, location fields, and listing metadata are weak, every output channel suffers.",
  },
  {
    title: "How to present rental stock without looking generic",
    category: "Content",
    date: "January 2026",
    summary:
      "The copy structure that helps rental inventory feel specific, useful, and commercially sharper.",
  },
  {
    title: "Why communities pages should be driven by active inventory",
    category: "UX",
    date: "January 2026",
    summary:
      "Static neighborhood pages often age badly. Inventory-led pages usually stay more credible and easier to maintain.",
  },
  {
    title: "When to use manual publishing review instead of full automation",
    category: "Workflow",
    date: "December 2025",
    summary:
      "Automation saves time, but some parts of listing quality still need human judgment.",
  },
];

export default function BlogsPage() {
  return (
    <ContentPageShell
      eyebrow="Editorial"
      title="Blogs"
      description="Practical writing on listing quality, lead handling, feed operations, website clarity, and what actually improves the customer journey."
      heroImage="https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2600&q=85"
      meta="Field notes from the website, CRM, and publishing side"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.title}
              className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#0b1025]/55">
                <PenSquare className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
              <div className="mt-4 text-2xl font-extrabold tracking-tight text-[#0b1025]">
                {post.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0b1025]/68">
                {post.summary}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#0b1025]/55">
                <CalendarDays className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card className="rounded-[5px] border border-black/10 bg-white p-7 shadow-[0_22px_70px_-52px_rgba(15,23,42,0.28)]">
          <div className="text-sm font-semibold tracking-[0.14em] text-[hsl(var(--brand-ink))]">
            Keep reading
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1025]">
            Want the shorter, more strategic version?
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#0b1025]/68">
            The blog covers practical execution. The insights page is where we
            compress the signal into faster operator-level summaries.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92"
            >
              <Link to="/insights">
                Open insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-[5px]">
              <Link to="/nav/services/option/all">Talk to the team</Link>
            </Button>
          </div>
        </Card>
      </div>
    </ContentPageShell>
  );
}
