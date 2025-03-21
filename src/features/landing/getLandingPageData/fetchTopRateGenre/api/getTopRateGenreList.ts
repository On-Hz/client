import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Genre } from "@/shared/model";

const getGenreCategory = async () => {
  const url = "/api/v1/common/genres/featured";
  const response = await axiosInstance.get<Genre[]>(url);
  return response.data;
};

export const useTopGenre = () => {
  return useQuery({
    queryKey: ["genre_landing"],
    queryFn: getGenreCategory,
  });
};
