import { Discography } from "../model/types";

export const mockArtistDiscography: Discography[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    release: `2024.05.${i + 20}`,
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));
