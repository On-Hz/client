import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ORDER_BY } from "@/shared/constants";
import { Track } from "@/shared/model";

const getArtistTopTrackList = async (artistId: string) => {
  const url = `/api/v1/artists/${artistId}/tracks`;
  const response = await axiosInstance.get<Track[]>(url, {
    params: {
      limit: 5,
      orderBy: `${ORDER_BY.RATING_COUNT},${ORDER_BY.AVERAGE_RATING}`,
    },
  });
  return response.data;
};

export const useArtistTopTracks = (
  artistId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["tracks_artist_home", artistId],
    queryFn: () => getArtistTopTrackList(artistId),
    enabled: options?.enabled ?? true,
  });
};
