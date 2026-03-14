export const DEFAULT_WHATSAPP_NUMBER = "+971 50 5033721";

function labelLine(label: string, value?: string) {
  const normalized = value?.trim();
  return normalized ? `${label}: ${normalized}` : label;
}

export function toWhatsAppText(lines: string[]) {
  return encodeURIComponent(lines.filter(Boolean).join("\n"));
}

export function buildWhatsAppUrl({
  number = DEFAULT_WHATSAPP_NUMBER,
  lines,
}: {
  number?: string;
  lines: string[];
}) {
  const wa = number.replace(/[^\d]/g, "");
  const text = toWhatsAppText(lines);
  return `https://wa.me/${wa}?text=${text}`;
}

export function buildBuyerInquiryLines({
  fullName,
  phone,
  propertyType,
  propertyLocation,
  budget,
  extraLines = [],
}: {
  fullName?: string;
  phone?: string;
  propertyType?: string;
  propertyLocation?: string;
  budget?: string;
  extraLines?: string[];
}) {
  const extras = extraLines.map((line) => line.trim()).filter(Boolean);

  return [
    "Hello ZAiN Int'l Group",
    "I'm interested to buy a property in Dubai, U.A.E.",
    "",
    labelLine("Full Name", fullName),
    labelLine("Call & WhatsApp no.", phone),
    labelLine("Preferred Property Type", propertyType),
    labelLine("Preferred Property Location", propertyLocation),
    labelLine("Budget", budget),
    ...(extras.length ? ["", ...extras] : []),
  ];
}
