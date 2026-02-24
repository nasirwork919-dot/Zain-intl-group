export const DUBAI_IMAGES = {
  // Pinterest images (direct image URLs).
  // NOTE: If any of these ever stop loading due to Pinterest hotlink restrictions,
  // we should host them in /public/ or Supabase Storage.
  hero: {
    skyline: "https://i.pinimg.com/1200x/54/ab/9f/54ab9f03d2a6ec9e19f73d74f3726f07.jpg",
    towers: "https://i.pinimg.com/1200x/8d/7b/9f/8d7b9f0e2c2f8c2d0c9e1fe51d0f1c9a.jpg",
    burjKhalifa:
      "https://i.pinimg.com/1200x/1f/0f/1a/1f0f1a3f4f2b7c3b9c8a1d2e3f4a5b6c.jpg",
  },

  tiles: {
    skyline: "https://i.pinimg.com/1200x/54/ab/9f/54ab9f03d2a6ec9e19f73d74f3726f07.jpg",
    towers: "https://i.pinimg.com/1200x/8d/7b/9f/8d7b9f0e2c2f8c2d0c9e1fe51d0f1c9a.jpg",
    burjKhalifa:
      "https://i.pinimg.com/1200x/1f/0f/1a/1f0f1a3f4f2b7c3b9c8a1d2e3f4a5b6c.jpg",
  },
} as const;
