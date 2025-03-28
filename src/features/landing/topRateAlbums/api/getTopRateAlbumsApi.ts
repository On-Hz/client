import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Album } from "@/shared/model";

const getTopAlbums = async () => {
  const url = "/api/v1/albums";
  const response = await axiosInstance.get<Album[]>(url, {
    params: {
      offset: 0,
      limit: 12,
      orderBy: "rating_count,average_rating",
    },
  });
  return response.data;
};

export const useTopAlbums = () => {
  return useQuery({
    queryKey: ["album_landing"],
    queryFn: getTopAlbums,
  });
};
