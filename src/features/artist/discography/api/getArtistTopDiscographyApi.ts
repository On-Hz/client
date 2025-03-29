import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ORDER_BY } from "@/shared/constants";
import { Album } from "@/shared/model";

const getArtistTopDiscography = async (artistId: string) => {
  const url = `/api/v1/artists/${artistId}/albums`;
  const response = await axiosInstance.get<Album[]>(url, {
    params: {
      limit: 5,
      orderBy: `${ORDER_BY.RATING_COUNT},${ORDER_BY.AVERAGE_RATING}`,
    },
  });
  return response.data;
};

export const useArtistTopDiscography = (
  artistId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["discography_artist_home"],
    queryFn: () => getArtistTopDiscography(artistId),
    enabled: options?.enabled ?? true,
  });
};
