import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Album } from "@/shared/model";

const getAlbumsByGenre = async (genreCode: string) => {
  const url = `/api/v1/albums/genre/${genreCode}/featured`;
  const response = await axiosInstance.get<Album[]>(url, {
    params: {
      offset: 0,
      limit: 25
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
