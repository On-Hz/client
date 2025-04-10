import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getAlbumDetail = async (albumId: string) => {
  const url = `/api/v1/albums/${albumId}`;
  const response = await axiosInstance.get(url);
  //console.log('getAlbumDetail',response.data);
  return response.data;
};

export const useAlbumDetail = (albumId: string) => {
  return useQuery({
    queryKey: ["album_detail", albumId],
    queryFn: () => getAlbumDetail(albumId), 
    enabled: !!albumId,
  });
};
