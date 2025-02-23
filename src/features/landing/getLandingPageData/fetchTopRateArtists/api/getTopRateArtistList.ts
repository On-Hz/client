import { Artist } from "../model/types";

export const mockTopArtistData: Artist[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));