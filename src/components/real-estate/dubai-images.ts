const FALLBACK = "/placeholder.svg";

function localOrFallback(path: string) {
  // If the file is missing, the browser will 404; we still want a deterministic src.
  // Keep the intended local paths, but allow callers to use FALLBACK easily.
  return path || FALLBACK;
}

export const DUBAI_IMAGES = {
  // ORIGINAL/REVERTED behavior: local assets in /public/hero
  // Expected files:
  // - /public/hero/skyline.jpg
  // - /public/hero/towers.jpg
  // - /public/hero/burj-khalifa.jpg
  hero: {
    skyline: localOrFallback("/hero/skyline.jpg"),
    towers: localOrFallback("/hero/towers.jpg"),
    burjKhalifa: localOrFallback("/hero/burj-khalifa.jpg"),
  },

  tiles: {
    skyline: localOrFallback("/hero/skyline.jpg"),
    towers: localOrFallback("/hero/towers.jpg"),
    burjKhalifa: localOrFallback("/hero/burj-khalifa.jpg"),
  },

  fallback: FALLBACK,
} as const;