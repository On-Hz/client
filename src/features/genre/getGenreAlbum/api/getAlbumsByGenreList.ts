import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Album } from "@/shared/model";

const getAlbumsByGenre = async (genreCode: string) => {
  const url = `/api/v1/albums/genre/${genreCode}`;
  const response = await axiosInstance.get<Album[]>(url, {
    params: {
      offset: 0,
      limit: 25,
      order_by: "rating_count,average_rating",
    },
  });
  return response.data;
};

export const useAlbumsByGenre = (genreCode: string) => {
  return useQuery({
    queryKey: ["album_genre", genreCode],
    queryFn: () => getAlbumsByGenre(genreCode),
  });
};
