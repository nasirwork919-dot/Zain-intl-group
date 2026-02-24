import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop({
  enabled = true,
  behavior = "auto",
}: {
  enabled?: boolean;
  behavior?: ScrollBehavior;
} = {}) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    // Run immediately, then again after paint to override browser scroll restoration.
    window.scrollTo({ top: 0, left: 0, behavior });

    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(id);
  }, [behavior, enabled, location.key]);
}