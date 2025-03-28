import { useQuery } from "@tanstack/react-query";
import { Discography } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockArtistTopDiscography;
};

const mockArtistTopDiscography: Discography[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title:
      [
        "Omah Lay",
        "Wizkid",
        "Lil Baby",
        "Burna Boy",
        "Wizkid",
        "Davido",
        "Lil Baby",
      ][i] ?? `Artist ${i + 1}`,
    coverPath: `https://picsum.photos/300/300?random=${i + 10}`,
    release: `2024.05.${i + 20}`,
  }));

export const useArtistTopDiscography = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["top_discography"],
    queryFn: fetchData,
    enabled: options?.enabled ?? true,
  });
};
