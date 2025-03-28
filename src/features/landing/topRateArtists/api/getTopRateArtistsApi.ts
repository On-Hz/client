import { useQuery } from "@tanstack/react-query";
import { Artist } from "@/shared/model";
import { axiosInstance } from "@/shared/api";

const getTopArtists = async () => {
  const url = "/api/v1/artists";
  const response = await axiosInstance.get<Artist[]>(url, {
    params: {
      offset: 0,
      limit: 12,
      orderBy: "rating_count,average_rating",
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
