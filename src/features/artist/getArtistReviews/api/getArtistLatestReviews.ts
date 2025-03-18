import { useQuery } from "@tanstack/react-query";
import { Review } from "@/shared/model";
import { REVIEW_TYPES } from "@/shared/constants";
import { axiosInstance } from "@/shared/api";

const getArtistLatestReviewList = async (artistId: string) => {
  const url = `/api/v1/reviews/${REVIEW_TYPES.ARTIST}/${artistId}`;
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      offset: 0,
      limit: 8,
      order_by: "created_at",
    },
  });
  return response.data;
};

export const useArtistLatestReviews = (
  artistId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["latest_reviews_artist"],
    queryFn: () => getArtistLatestReviewList(artistId),
    enabled: options?.enabled ?? true,
  });
};
