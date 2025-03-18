import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Artist } from "@/shared/model";

const getArtistDetailInfo = async (artistId: string) => {
  const url = `/api/v1/artists/${artistId}`;
  const response = await axiosInstance.get<Artist>(url);
  return response.data;
};

export const useArtistDetailInfo = (artistId: string) => {
  return useQuery({
    queryKey: ["info_artist", artistId],
    queryFn: () => getArtistDetailInfo(artistId),
  });
};
