import { useQuery } from "@tanstack/react-query";
import { Artist } from "@/shared/model";
import { axiosInstance } from "@/shared/api";

const getTopArtistList = async () => {
  const url = "/api/v1/artists";
  const response = await axiosInstance.get<Artist[]>(url, {
    params: {
      offset: 0,
      limit: 12,
      order_by: "rating_count,average_rating",
    },
  });
  return response.data;
};

export const useTopArtist = () => {
  return useQuery({
    queryKey: ["artist_landing"],
    queryFn: getTopArtistList,
  });
};
