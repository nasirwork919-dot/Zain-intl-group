export function clampNumber(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function safeNumber(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatNumber(n: number) {
  try {
    return new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(Math.round(n));
  }
}

export function formatMoneyAED(n: number) {
  try {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `AED ${formatNumber(n)}`;
  }
}

export function mortgageMonthlyPayment({
  price,
  downPaymentPct,
  annualRatePct,
  termYears,
}: {
  price: number;
  downPaymentPct: number;
  annualRatePct: number;
  termYears: number;
}) {
  const dpPct = clampNumber(downPaymentPct, 0, 100);
  const years = clampNumber(termYears, 1, 40);
  const rAnnual = clampNumber(annualRatePct, 0, 50);

  const downPayment = price * (dpPct / 100);
  const loanAmount = Math.max(0, price - downPayment);

  const n = years * 12;
  const r = rAnnual / 100 / 12;

  // 0% interest fallback
  const monthly =
    r === 0 ? loanAmount / n : (loanAmount * r) / (1 - Math.pow(1 + r, -n));

  const totalPaid = monthly * n;
  const totalInterest = Math.max(0, totalPaid - loanAmount);

  return {
    downPayment,
    loanAmount,
    monthlyPayment: monthly,
    totalPaid,
    totalInterest,
    months: n,
  };
}

export function rentalYield({
  purchasePrice,
  annualRent,
  annualServiceCharges,
  vacancyPct,
}: {
  purchasePrice: number;
  annualRent: number;
  annualServiceCharges: number;
  vacancyPct: number;
}) {
  const price = Math.max(0, purchasePrice);
  const rent = Math.max(0, annualRent);
  const charges = Math.max(0, annualServiceCharges);
  const vacancy = clampNumber(vacancyPct, 0, 60);

  const effectiveRent = rent * (1 - vacancy / 100);
  const netIncome = Math.max(0, effectiveRent - charges);

  const grossYieldPct = price > 0 ? (rent / price) * 100 : 0;
  const netYieldPct = price > 0 ? (netIncome / price) * 100 : 0;

  const paybackYears = netIncome > 0 ? price / netIncome : Infinity;

  return {
    effectiveRent,
    netIncome,
    grossYieldPct,
    netYieldPct,
    paybackYears,
  };
}