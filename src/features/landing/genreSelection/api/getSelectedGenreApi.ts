import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Genre } from "@/shared/model";

const getGenreSelection = async () => {
  const url = "/api/v1/common/genres/featured";
  const response = await axiosInstance.get<Genre[]>(url);
  return response.data;
};

export const useGenreSelection = () => {
  return useQuery({
    queryKey: ["genre_landing"],
    queryFn: getGenreSelection,
  });
};
