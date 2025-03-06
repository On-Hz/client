import { useQuery } from "@tanstack/react-query";
import { GenreItem } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockTopRateGenreData;
};

const mockTopRateGenreData: GenreItem[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Genre Title ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i}`,
  }));

export const useTopGenre = () => {
  return useQuery({
    queryKey: ["genre"],
    queryFn: fetchData,
  });
}
