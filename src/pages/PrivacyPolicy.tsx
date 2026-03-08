import { ShieldCheck } from "lucide-react";

import { ContentPageShell } from "@/components/real-estate/ContentPageShell";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Information We Collect",
    body:
      "We collect the details you submit through contact forms, lead forms, newsletter subscriptions, property inquiries, and job applications. This may include your name, email address, phone number, preferred locations, budget, CV details, and any message you choose to send.",
  },
  {
    title: "How We Use Your Information",
    body:
      "We use your information to respond to inquiries, arrange viewings, prepare shortlists, evaluate job applications, improve our website, and send relevant updates when you have asked to hear from us.",
  },
  {
    title: "Listing and CRM Data",
    body:
      "Property listing data displayed on this website may be synchronized from our CRM and related feed systems. We use this operational data to publish listings, maintain inventory accuracy, and support marketplace integrations.",
  },
  {
    title: "Sharing With Third Parties",
    body:
      "We may share information with service providers that help us operate the website, CRM, email tools, analytics, hosting, and marketplace feeds. We do not sell personal information as a standalone business practice.",
  },
  {
    title: "Retention",
    body:
      "We keep inquiry, lead, and application records for as long as reasonably necessary for business, compliance, dispute handling, and customer service purposes, unless a longer period is required by law.",
  },
  {
    title: "Cookies and Analytics",
    body:
      "We may use cookies, session storage, and analytics tools to understand traffic, improve performance, and keep basic site functionality working. Browser settings can usually control cookie behavior.",
  },
  {
    title: "Security",
    body:
      "We use reasonable administrative and technical measures to protect the information we control. No website or online transmission can be guaranteed fully secure, so you should avoid sending unnecessary sensitive information through open forms.",
  },
  {
    title: "Your Rights",
    body:
      "You may request access, correction, or deletion of your personal information, subject to legal and operational requirements. Marketing messages can be opted out of at any time.",
  },
  {
    title: "Contact",
    body:
      "For privacy-related requests, contact inquiry@zaininternational.ae. Please include enough detail for us to identify the record you are asking about.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How Zain International Group collects, uses, stores, and protects website, inquiry, CRM, and application data."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2600&q=85"
      meta="Last updated March 8, 2026"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="rounded-[5px] border border-black/10 bg-white p-6 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.35)] lg:col-span-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 text-[hsl(var(--brand-ink))]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="mt-4 text-xl font-extrabold tracking-tight text-[#0b1025]">
            Summary
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#0b1025]/68">
            We use submitted information to respond to leads, manage listings,
            support services, and run the website responsibly. We do not treat
            personal information as a product for resale.
          </p>
          <Separator className="my-5" />
          <ul className="grid gap-3 text-sm font-medium text-[#0b1025]/72">
            <li>Lead forms and job applications are stored for business use.</li>
            <li>CRM and listing data may sync across connected website tools.</li>
            <li>Requests for correction or deletion can be sent by email.</li>
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
