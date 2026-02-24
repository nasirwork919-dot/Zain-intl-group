import { useEffect, useState } from "react";

export type CurrencyCode = "AED" | "USD" | "GBP" | "EUR";

const STORAGE_KEY = "zain_currency_v1";

function readStored(): CurrencyCode {
  const v = (localStorage.getItem(STORAGE_KEY) ?? "").toUpperCase();
  if (v === "USD" || v === "GBP" || v === "EUR" || v === "AED") return v;
  return "AED";
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => readStored());

  const setCurrency = (next: CurrencyCode) => {
    setCurrencyState(next);
    localStorage.setItem(STORAGE_KEY, next);
    // Broadcast to other tabs + listeners in this tab
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }));
  };

  useEffect(() => {
    const onStorage = () => setCurrencyState(readStored());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { currency, setCurrency };
}