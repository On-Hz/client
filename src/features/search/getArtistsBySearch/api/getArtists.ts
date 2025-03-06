import { useQuery } from "@tanstack/react-query";
import { Artist } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockArtists;
};

const mockArtists: Artist[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));

export const useArtist = () => {
  return useQuery({
    queryKey: ["artist"],
    queryFn: fetchData,
  });
};
