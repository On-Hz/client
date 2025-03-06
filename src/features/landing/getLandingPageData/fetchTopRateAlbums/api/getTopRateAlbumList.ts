import { useQuery } from "@tanstack/react-query";
import { Album } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockTopRateAlbumData;
};

const mockTopRateAlbumData: Album[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    artist: "Artist Name",
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));

  export const useTopAlbum = () => {
    return useQuery({
      queryKey: ["album"],
      queryFn: fetchData,
    });
  }
  