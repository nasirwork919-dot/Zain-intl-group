import { useEffect, useLayoutEffect } from "react";
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
    if (!enabled || typeof window === "undefined" || !("scrollRestoration" in window.history)) {
      return;
    }

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const scrollTop = (nextBehavior: ScrollBehavior = behavior) => {
      window.scrollTo({ top: 0, left: 0, behavior: nextBehavior });
    };

    // Run immediately, then repeat after paint and after pending layout shifts.
    scrollTop();

    const id = window.requestAnimationFrame(() => {
      scrollTop("auto");
    });
    const timeoutId = window.setTimeout(() => {
      scrollTop("auto");
    }, 180);

    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(timeoutId);
    };
  }, [behavior, enabled, location.key]);
}
