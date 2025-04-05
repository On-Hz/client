import { Review } from "@/shared/model";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getTrackReviewList = async (trackId: string) => {
  const url = `/api/v1/reviews/${REVIEW_TYPES.TRACK}/${trackId}`;
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      limit: 8,
      orderBy: ORDER_BY.CREATED_AT,
    },
  });
  console.log("getTrackReviewList :: ", response.data);
  return response.data;
};

export const useTrackReviews = (
  trackId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["track_review"],
    queryFn: () => getTrackReviewList(trackId),
    enabled: options?.enabled ?? true,
  });
};

