export const DUBAI_IMAGES = {
  // Hero: tall buildings / skyline only (reliable hotlink-friendly images)
  hero: {
    skyline:
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=3200&q=90",
    towers:
      "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=3200&q=90",
    burjKhalifa:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3200&q=90",
  },

  // Tiles remain as-is (used across community/option cards)
  tiles: {
    skyline:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2200&q=85",
    towers:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=85",
    burjKhalifa:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85",
  },

  fallback: "/placeholder.svg",
} as const;