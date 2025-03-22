import { useQuery } from "@tanstack/react-query";
import { Track } from "../model/types";

const mockTopTracks: Track[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    cover: `https://picsum.photos/60/60?random=${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
  }));

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockTopTracks;
};

export const useArtistTopTracks = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["top_tracks"],
    queryFn: fetchData,
    enabled: options?.enabled ?? true,
  });
};
