import { useQuery } from "@tanstack/react-query";
import { Discography } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockArtistDiscography;
};
const mockArtistDiscography: Discography[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    release: `2024.05.${i + 20}`,
    coverPath: `https://picsum.photos/200/300?random=${i}`,
  }));

export const useArtistDiscography = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["discography"],
    queryFn: fetchData,
    enabled: options?.enabled ?? true,
  });
};
