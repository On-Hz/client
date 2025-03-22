import { useQuery } from "@tanstack/react-query";
import { Track } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockTracks;
};

const mockTracks: Track[] = Array(4)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    cover: `https://picsum.photos/60/60?random=${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
  }));

export const useTrack = () => {
  return useQuery({
    queryKey: ["track"],
    queryFn: fetchData,
  });
};
