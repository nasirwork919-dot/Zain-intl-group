import { useMemo, useState } from "react";
import {
  Calculator,
  Copy,
  Percent,
  Wallet,
  Home,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import {
  formatMoneyAED,
  mortgageMonthlyPayment,
  rentalYield,
  safeNumber,
} from "@/utils/calculators";

function CompactMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-[5px] bg-muted/30 p-3 ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] bg-white/70 ring-1 ring-black/5">
          <Icon className="h-4 w-4 text-[hsl(var(--brand-ink))]" />
        </span>
        <span className="min-w-0 break-words">{label}</span>
      </div>
      <div className="mt-2 break-words text-sm font-extrabold text-[hsl(var(--brand-ink))]">
        {value}
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[5px] border border-black/10 bg-white/70 p-4 ring-1 ring-black/5">
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      <div className="mt-2 break-words text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
        {value}
      </div>
      <div className="mt-2 text-xs font-semibold text-muted-foreground">
        {hint}
      </div>
    </div>
  );
}

export function CalculatorDialog({
  open,
  onOpenChange,
  defaultTab = "mortgage",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "mortgage" | "roi";
}) {
  // Mortgage inputs
  const [price, setPrice] = useState("2650000");
  const [downPct, setDownPct] = useState(20);
  const [ratePct, setRatePct] = useState(4.25);
  const [termYears, setTermYears] = useState(25);

  // ROI inputs
  const [purchase, setPurchase] = useState("2650000");
  const [annualRent, setAnnualRent] = useState("240000");
  const [serviceCharges, setServiceCharges] = useState("18000");
  const [vacancyPct, setVacancyPct] = useState(5);

  const mortgage = useMemo(() => {
    return mortgageMonthlyPayment({
      price: safeNumber(price),
      downPaymentPct: downPct,
      annualRatePct: ratePct,
      termYears,
    });
  }, [downPct, price, ratePct, termYears]);

  const roi = useMemo(() => {
    return rentalYield({
      purchasePrice: safeNumber(purchase),
      annualRent: safeNumber(annualRent),
      annualServiceCharges: safeNumber(serviceCharges),
      vacancyPct,
    });
  }, [annualRent, purchase, serviceCharges, vacancyPct]);

  const mortgageSummary = useMemo(() => {
    const lines = [
      "Mortgage estimate (AED)",
      `Property price: ${formatMoneyAED(safeNumber(price))}`,
      `Down payment: ${downPct}% (${formatMoneyAED(mortgage.downPayment)})`,
      `Loan amount: ${formatMoneyAED(mortgage.loanAmount)}`,
      `Interest rate: ${ratePct}% p.a.`,
      `Term: ${termYears} years`,
      `Monthly payment: ${formatMoneyAED(mortgage.monthlyPayment)}`,
      `Total interest: ${formatMoneyAED(mortgage.totalInterest)}`,
    ];
    return lines.join("\n");
  }, [
    downPct,
    mortgage.downPayment,
    mortgage.loanAmount,
    mortgage.monthlyPayment,
    mortgage.totalInterest,
    price,
    ratePct,
    termYears,
  ]);

  const roiSummary = useMemo(() => {
    const payback =
      roi.paybackYears === Infinity ? "—" : `${roi.paybackYears.toFixed(1)} yrs`;

    const lines = [
      "ROI / Yield estimate",
      `Purchase price: ${formatMoneyAED(safeNumber(purchase))}`,
      `Annual rent: ${formatMoneyAED(safeNumber(annualRent))}`,
      `Service charges: ${formatMoneyAED(safeNumber(serviceCharges))}`,
      `Vacancy: ${vacancyPct}%`,
      `Effective rent: ${formatMoneyAED(roi.effectiveRent)}`,
      `Net income: ${formatMoneyAED(roi.netIncome)}`,
      `Gross yield: ${roi.grossYieldPct.toFixed(2)}%`,
      `Net yield: ${roi.netYieldPct.toFixed(2)}%`,
      `Payback: ${payback}`,
    ];
    return lines.join("\n");
  }, [
    annualRent,
    purchase,
    roi.effectiveRent,
    roi.grossYieldPct,
    roi.netIncome,
    roi.netYieldPct,
    roi.paybackYears,
    serviceCharges,
    vacancyPct,
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0",
          "w-[calc(100vw-24px)] sm:w-full",
          "max-w-4xl",
          "h-[90vh] sm:h-auto",
          "overflow-hidden rounded-[5px]",
        )}
      >
        <div className="flex h-full flex-col bg-[hsl(var(--page))]">
          <DialogHeader className="sticky top-0 z-10 border-b border-black/10 bg-white/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/65 sm:px-5 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="flex items-center gap-2 text-left text-base font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/12 ring-1 ring-black/5">
                    <Calculator className="h-4 w-4" />
                  </span>
                  Calculator
                </DialogTitle>
                <div className="mt-1 text-xs font-semibold text-muted-foreground">
                  Quick estimates for payments and yield (not financial advice).
                </div>
              </div>

              <Button
                variant="outline"
                className="h-10 rounded-[5px] bg-white/70"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-[5px] bg-white/70 p-1 ring-1 ring-black/10">
                <TabsTrigger value="mortgage" className="rounded-[5px]">
                  Mortgage
                </TabsTrigger>
                <TabsTrigger value="roi" className="rounded-[5px]">
                  ROI / Yield
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mortgage" className="mt-5">
                <div className="grid gap-4 lg:grid-cols-12">
                  <Card className="rounded-[5px] border border-white/40 bg-white/70 p-4 ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55 sm:p-5 lg:col-span-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                          Mortgage estimate
                        </div>
                        <div className="mt-1 text-sm font-semibold text-muted-foreground">
                          Enter price, down payment, rate and term.
                        </div>
                      </div>

                      <div className="rounded-[5px] bg-[hsl(var(--brand))]/10 px-3 py-2 text-xs font-extrabold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                        AED
                      </div>
                    </div>

                    <Separator className="my-5 bg-black/10" />

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Property price (AED)</Label>
                        <div className="relative">
                          <Home className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            inputMode="numeric"
                            className="h-11 rounded-[5px] border-white/50 bg-white/80 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                            placeholder="2,650,000"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <Label>Down payment</Label>
                          <div className="text-xs font-extrabold text-[hsl(var(--brand-ink))]">
                            {downPct}%
                          </div>
                        </div>
                        <Slider
                          value={[downPct]}
                          onValueChange={(v) => setDownPct(v[0] ?? downPct)}
                          min={0}
                          max={60}
                          step={1}
                        />
                        <div className="text-xs font-semibold text-muted-foreground">
                          Down payment amount:{" "}
                          <span className="font-extrabold text-foreground">
                            {formatMoneyAED(mortgage.downPayment)}
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label>Interest rate (% p.a.)</Label>
                          <div className="relative">
                            <Percent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              value={String(ratePct)}
                              onChange={(e) =>
                                setRatePct(Number(e.target.value) || 0)
                              }
                              inputMode="decimal"
                              className="h-11 rounded-[5px] border-white/50 bg-white/80 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                              placeholder="4.25"
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>Term (years)</Label>
                          <div className="relative">
                            <Wallet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              value={String(termYears)}
                              onChange={(e) =>
                                setTermYears(Number(e.target.value) || 1)
                              }
                              inputMode="numeric"
                              className="h-11 rounded-[5px] border-white/50 bg-white/80 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                              placeholder="25"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="h-11 rounded-[5px] bg-white/70"
                        onClick={() => {
                          navigator.clipboard.writeText(mortgageSummary);
                          toast({
                            title: "Copied summary",
                            description:
                              "Mortgage estimate copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy summary
                      </Button>
                    </div>
                  </Card>

                  <div className="grid gap-4 lg:col-span-5">
                    <div className="rounded-[5px] border border-black/10 bg-white/70 p-4 ring-1 ring-black/5">
                      <div className="text-xs font-semibold text-muted-foreground">
                        Estimated monthly payment
                      </div>
                      <div className="mt-2 text-2xl font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                        {formatMoneyAED(mortgage.monthlyPayment)}
                      </div>
                      <div className="mt-2 text-xs font-semibold text-muted-foreground">
                        Principal + interest (estimate)
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <CompactMetric
                        icon={Wallet}
                        label="Loan amount"
                        value={formatMoneyAED(mortgage.loanAmount)}
                      />
                      <CompactMetric
                        icon={TrendingUp}
                        label="Total interest"
                        value={formatMoneyAED(mortgage.totalInterest)}
                      />
                      <CompactMetric
                        icon={Calculator}
                        label="Total paid"
                        value={formatMoneyAED(mortgage.totalPaid)}
                      />
                      <CompactMetric
                        icon={Home}
                        label="Term"
                        value={`${mortgage.months} months`}
                      />
                    </div>

                    <div className="rounded-[5px] bg-[hsl(var(--brand))]/10 p-4 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                      Tip: adjust down payment and term to see the monthly impact
                      instantly.
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roi" className="mt-5">
                <div className="grid gap-4 lg:grid-cols-12">
                  <Card className="rounded-[5px] border border-white/40 bg-white/70 p-4 ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55 sm:p-5 lg:col-span-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                          ROI / Yield estimate
                        </div>
                        <div className="mt-1 text-sm font-semibold text-muted-foreground">
                          Gross vs net yield with service charges + vacancy.
                        </div>
                      </div>

                      <div className="rounded-[5px] bg-[hsl(var(--brand-2))]/12 px-3 py-2 text-xs font-extrabold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                        %
                      </div>
                    </div>

                    <Separator className="my-5 bg-black/10" />

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Purchase price (AED)</Label>
                        <Input
                          value={purchase}
                          onChange={(e) => setPurchase(e.target.value)}
                          inputMode="numeric"
                          className="h-11 rounded-[5px] border-white/50 bg-white/80 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                          placeholder="2,650,000"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Annual rent (AED)</Label>
                        <Input
                          value={annualRent}
                          onChange={(e) => setAnnualRent(e.target.value)}
                          inputMode="numeric"
                          className="h-11 rounded-[5px] border-white/50 bg-white/80 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                          placeholder="240,000"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label>Service charges / year (AED)</Label>
                          <Input
                            value={serviceCharges}
                            onChange={(e) => setServiceCharges(e.target.value)}
                            inputMode="numeric"
                            className="h-11 rounded-[5px] border-white/50 bg-white/80 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                            placeholder="18,000"
                          />
                        </div>

                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-3">
                            <Label>Vacancy</Label>
                            <div className="text-xs font-extrabold text-[hsl(var(--brand-ink))]">
                              {vacancyPct}%
                            </div>
                          </div>
                          <Slider
                            value={[vacancyPct]}
                            onValueChange={(v) =>
                              setVacancyPct(v[0] ?? vacancyPct)
                            }
                            min={0}
                            max={20}
                            step={1}
                          />
                          <div className="text-[11px] font-semibold text-muted-foreground">
                            Typical range: 0–10% depending on unit and season.
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="h-11 rounded-[5px] bg-white/70"
                        onClick={() => {
                          navigator.clipboard.writeText(roiSummary);
                          toast({
                            title: "Copied summary",
                            description:
                              "ROI/Yield estimate copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy summary
                      </Button>
                    </div>
                  </Card>

                  <div className="grid gap-4 lg:col-span-5">
                    {/* KPI cards should never squeeze into 2 columns on small screens */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <KpiCard
                        label="Gross yield"
                        value={`${roi.grossYieldPct.toFixed(2)}%`}
                        hint="Rent ÷ purchase price"
                      />
                      <KpiCard
                        label="Net yield"
                        value={`${roi.netYieldPct.toFixed(2)}%`}
                        hint="After vacancy + service charges"
                      />
                    </div>

                    {/* Keep metrics 1-col on mobile, 2-col only on md+, then 1-col on lg */}
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
                      <CompactMetric
                        icon={TrendingUp}
                        label="Effective rent"
                        value={formatMoneyAED(roi.effectiveRent)}
                      />
                      <CompactMetric
                        icon={Wallet}
                        label="Net income"
                        value={formatMoneyAED(roi.netIncome)}
                      />
                      <CompactMetric
                        icon={Calculator}
                        label="Monthly net"
                        value={formatMoneyAED(roi.netIncome / 12)}
                      />
                      <CompactMetric
                        icon={Home}
                        label="Payback"
                        value={
                          roi.paybackYears === Infinity
                            ? "—"
                            : `${roi.paybackYears.toFixed(1)} years`
                        }
                      />
                    </div>

                    <div className="rounded-[5px] bg-[hsl(var(--brand-2))]/12 p-4 text-xs font-semibold text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                      Tip: use net yield for a more realistic view (charges and
                      vacancy matter).
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="border-t border-black/10 bg-white/65 px-4 py-3 text-xs font-semibold text-muted-foreground sm:px-6">
            Calculations are estimates; actual mortgage offers and returns vary
            by lender, fees, and occupancy.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}