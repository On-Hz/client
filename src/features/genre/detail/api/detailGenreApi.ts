import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Genre } from "@/shared/model";

const getDetailGenreInfo = async ( genreCode: string ) => {
  const url = `/api/v1/common/genres/featured/${genreCode}`;
  const response = await axiosInstance.get<Genre>(url);
  return response.data;
};

export const useDetailGenreInfo = (genreCode: string) => {
  return useQuery({
    queryKey: ["info_genre", genreCode],
    queryFn: () => getDetailGenreInfo(genreCode),
  });
};
