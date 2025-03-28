import { useQuery } from "@tanstack/react-query";
import { Artist } from "@/shared/model";
import { axiosInstance } from "@/shared/api";
import { ORDER_BY } from "@/shared/constants";

const getTopArtists = async () => {
  const url = "/api/v1/artists";
  const response = await axiosInstance.get<Artist[]>(url, {
    params: {
      limit: 12,
      orderBy: `${ORDER_BY.RATING_COUNT},${ORDER_BY.AVERAGE_RATING}`,
    },
  });
  return response.data;
};

export const useTopArtists = () => {
  return useQuery({
    queryKey: ["artist_landing"],
    queryFn: getTopArtists,
  });
};
