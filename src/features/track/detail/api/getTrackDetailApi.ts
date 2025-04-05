import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getTrackDetail = async (trackId: string) => {
  const url = `/api/v1/tracks/${trackId}`;
  const response = await axiosInstance.get(url);
  console.log('getTrackDetail',response.data);
  return response.data;
};

export const useTrackDetail = (trackId: string) => {
  return useQuery({
    queryKey: ["track_detail"],
    queryFn: () => getTrackDetail(trackId), 
    enabled: !!trackId,
  });
};
