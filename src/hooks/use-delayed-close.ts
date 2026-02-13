import { useCallback, useRef } from "react";

export function useDelayedClose() {
  const timerRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const schedule = useCallback((fn: () => void, ms = 140) => {
    cancel();
    timerRef.current = window.setTimeout(fn, ms);
  }, [cancel]);

  return { cancel, schedule };
}