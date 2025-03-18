import { useQuery } from "@tanstack/react-query";
import { Artist } from "@/shared/model";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockArtists;
};

const mockArtists: Artist[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    profilePath: `https://picsum.photos/200/300?random=${i}`,
    createdAt: new Date().toISOString(),
  }));

export const useArtist = () => {
  return useQuery({
    queryKey: ["artist"],
    queryFn: fetchData,
  });
};
