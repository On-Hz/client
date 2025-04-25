import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getAlbumTracks = async (albumId: string) => {
  const url = `/api/v1/albums/${albumId}/tracks`;
  const response = await axiosInstance.get(url);
  return response.data;
};

  export const useAlbumTracks = (albumId: string) => {
    return useQuery({
      queryKey: ["album_track_list", albumId],
      queryFn: () => getAlbumTracks(albumId), 
      enabled: !!albumId,
    });
  };
  