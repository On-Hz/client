import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Album } from "@/shared/model";
import { ORDER_BY } from "@/shared/constants";

const getTopAlbums = async () => {
  const url = "/api/v1/albums";
  const response = await axiosInstance.get<Album[]>(url, {
    params: {
      limit: 12,
      orderBy: `${ORDER_BY.RATING_COUNT},${ORDER_BY.AVERAGE_RATING}`,
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
