import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Genre } from "@/shared/model";

const getGenreDetailInfo = async ( genreCode: string ) => {
  const url = `/api/v1/common/catalog/genres/${genreCode}`;
  const response = await axiosInstance.get<Genre>(url);
  return response.data;
};

export const useGenreDetailInfo = (genreCode: string) => {
  return useQuery({
    queryKey: ["info_genre", genreCode],
    queryFn: () => getGenreDetailInfo(genreCode),
  });
};
