import { useQuery } from "@tanstack/react-query";
import { Album } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockAlbums;
};

const mockAlbums: Album[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    artist: "Artist Name",
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));

export const useAlbum = () => {
  return useQuery({
    queryKey: ["album"],
    queryFn: fetchData,
  });
};
