import { Album } from "../model/types";

export const mockTopRateAlbumData: Album[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    quote: "“Quote”",
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));
