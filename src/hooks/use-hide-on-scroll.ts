import { useEffect, useRef, useState } from "react";

export function useHideOnScroll({
  showUntilPx = 160,
  hideAfterPx = 220,
}: {
  showUntilPx?: number;
  hideAfterPx?: number;
} = {}) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Always show near top
      if (y <= showUntilPx) {
        setVisible(true);
        lastY.current = y;
        return;
      }

      // Past threshold: hide when scrolling down, show a bit when scrolling up
      if (y >= hideAfterPx && delta > 6) setVisible(false);
      if (delta < -10) setVisible(true);

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfterPx, showUntilPx]);

  return visible;
}