import { GenreItem } from "../model/types";

export const mockTopRateGenreData: GenreItem[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Genre Title ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i}`,
  }));
