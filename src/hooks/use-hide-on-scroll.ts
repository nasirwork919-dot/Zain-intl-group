import { useEffect, useState } from "react";

export function useHideOnScroll({
  showUntilPx = 160,
}: {
  showUntilPx?: number;
} = {}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY <= showUntilPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showUntilPx]);

  return visible;
}