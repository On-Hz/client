import { useQuery } from "@tanstack/react-query";
import { Track } from "@/shared/model";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockTracks;
};

const mockTracks: Track[] = Array(4)
  .fill(null)
  .map((_, i) => ({
    id: i,
    trackName: `Last Item ${i + 1}`,
    coverPath: `https://picsum.photos/60/60?random=${i}`,
    duration: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
    trackRank: i + 1,
    albumId: 0,
    artists: [
      {
        id: i,
        name: "Jane Doe",
        role: "main",
        profilePath: null,
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  }));

export const useTrack = () => {
  return useQuery({
    queryKey: ["track"],
    queryFn: fetchData,
  });
};
