import { Artist } from "../model/types";

export const mockArtists: Artist[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));
