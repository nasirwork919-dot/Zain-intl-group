import { useScrollToTop } from "@/hooks/use-scroll-to-top";

export function ScrollToTop() {
  useScrollToTop({ enabled: true, behavior: "auto" });
  return null;
}