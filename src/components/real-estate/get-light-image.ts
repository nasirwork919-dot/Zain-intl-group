import { DUBAI_IMAGES } from "@/components/real-estate/dubai-images";

const FALLBACKS = [
  DUBAI_IMAGES.tiles.skyline,
  DUBAI_IMAGES.tiles.towers,
  DUBAI_IMAGES.tiles.burjKhalifa,
] as const;

export function getLightImage(input?: string, index = 0) {
  const v = (input ?? "").trim();
  if (v) return v;
  return FALLBACKS[Math.abs(index) % FALLBACKS.length];
}
