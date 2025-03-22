import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Artist } from "@/shared/model";

const getDetailArtistInfo = async (artistId: string) => {
  const url = `/api/v1/artists/${artistId}`;
  const response = await axiosInstance.get<Artist>(url);
  return response.data;
};

export const useDetailArtistInfo = (artistId: string) => {
  return useQuery({
    queryKey: ["info_artist", artistId],
    queryFn: () => getDetailArtistInfo(artistId),
  });
};
