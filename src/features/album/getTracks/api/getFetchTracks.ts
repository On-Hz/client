import { Track } from "../model/types";

export const mockTracks: Track[] = Array(7)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    rating: 2.7
}));