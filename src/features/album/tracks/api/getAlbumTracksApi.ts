import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getAlbumTrackList = async (albumId: string) => {
  const url = `/api/v1/albums/${albumId}/tracks`;
  const response = await axiosInstance.get(url);
  console.log('getAlbumTracks',response.data);
  return response.data;
};

export const useAlbumTracks = (albumId: string) => {
  return useQuery({
    queryKey: ["album_track_list", albumId],
    queryFn: () => getAlbumTrackList(albumId), 
    enabled: !!albumId,
  });
};
  