import { formatMoney } from "@/utils/money";
import type { CurrencyCode } from "@/state/currency";

export function formatAED(amount: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(amountAED: number, currency: CurrencyCode) {
  return formatMoney(amountAED, currency);
}