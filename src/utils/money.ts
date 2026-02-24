import type { CurrencyCode } from "@/state/currency";

// Fixed approximate FX rates. Edit these anytime.
// Interpreted as: 1 AED = rate[target]
const AED_TO: Record<CurrencyCode, number> = {
  AED: 1,
  USD: 0.272,
  EUR: 0.251,
  GBP: 0.215,
};

function symbol(code: CurrencyCode) {
  if (code === "AED") return "AED";
  if (code === "USD") return "$";
  if (code === "EUR") return "€";
  if (code === "GBP") return "£";
  return code;
}

export function convertFromAED(amountAED: number, to: CurrencyCode) {
  const rate = AED_TO[to] ?? 1;
  return amountAED * rate;
}

export function formatMoney(amountAED: number, currency: CurrencyCode) {
  const converted = convertFromAED(amountAED, currency);

  // Use Intl for nice formatting. Prefer currency style where it works.
  try {
    const nf = new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    return nf.format(converted);
  } catch {
    // Fallback (AED sometimes formats differently across environments)
    const nf = new Intl.NumberFormat("en", { maximumFractionDigits: 0 });
    return `${symbol(currency)} ${nf.format(converted)}`;
  }
}