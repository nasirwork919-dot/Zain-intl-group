import { FileCheck2 } from "lucide-react";

import { ContentPageShell } from "@/components/real-estate/ContentPageShell";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Use of the Website",
    body:
      "You may use this website to browse listings, request information, submit inquiries, and learn about our services. You agree not to misuse the site, interfere with operations, or attempt unauthorized access to any account, feed, or system.",
  },
  {
    title: "Property Listings",
    body:
      "Listings, prices, availability, images, and descriptions may change without notice. Some listing data is synchronized from connected CRM and marketplace tools. We aim for accuracy, but display information should be independently confirmed before any transaction decision.",
  },
  {
    title: "No Transaction Guarantee",
    body:
      "Nothing on this website creates a binding property reservation, offer acceptance, brokerage agreement, valuation commitment, or legal advice relationship. Final terms depend on signed agreements and the relevant parties involved.",
  },
  {
    title: "Lead and Form Submissions",
    body:
      "When you submit a contact form, application, or property inquiry, you confirm that the information provided is accurate and that you have the right to submit it. We may contact you using the details you provide.",
  },
  {
    title: "Intellectual Property",
    body:
      "Unless otherwise stated, the website design, branding, copy, layout, and original media created for this website belong to Zain International Group or its licensors. You may not copy or republish material in a misleading commercial context without permission.",
  },
  {
    title: "Third-Party Services",
    body:
      "The website may rely on third-party tools for hosting, forms, CRM sync, maps, analytics, social links, or feed delivery. We are not responsible for outages or policy changes introduced by those external services.",
  },
  {
    title: "Limitation of Liability",
    body:
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential losses arising from website use, listing inaccuracies, feed interruptions, or reliance on informational content published on the site.",
  },
  {
    title: "Changes",
    body:
      "We may update these terms from time to time as the website, services, or compliance requirements evolve. Continued use of the website after updates means you accept the revised terms.",
  },
  {
    title: "Contact",
    body:
      "Questions about these terms can be sent to inquiry@zaininternational.ae.",
  },
];

export default function TermsOfServicePage() {
  return (
    <ContentPageShell
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms that govern use of this website, its listing content, and any inquiries submitted through it."
      heroImage="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2600&q=85"
      meta="Effective March 8, 2026"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.35)] lg:col-span-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand-2))]/14 text-[hsl(var(--brand-ink))]">
            <FileCheck2 className="h-6 w-6" />
          </div>
          <div className="mt-4 text-xl font-extrabold tracking-tight text-[#0b1025]">
            Core Principles
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#0b1025]/68">
            This website is an informational and lead-generation platform. Any
            property transaction, service engagement, or advisory mandate must
            be documented separately.
          </p>
          <Separator className="my-5" />
          <ul className="grid gap-3 text-sm font-medium text-[#0b1025]/72">
            <li>Listings are subject to change and re-verification.</li>
            <li>Website use must remain lawful and non-disruptive.</li>
            <li>Final property decisions require direct confirmation.</li>
          </ul>
        </Card>

        <div className="grid gap-4 lg:col-span-8">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.25)]"
            >
              <div className="text-lg font-extrabold tracking-tight text-[#0b1025]">
                {section.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0b1025]/72">
                {section.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </ContentPageShell>
  );
}
