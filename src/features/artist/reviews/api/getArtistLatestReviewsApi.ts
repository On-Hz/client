import { useQuery } from "@tanstack/react-query";
import { Review } from "@/shared/model";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { axiosInstance } from "@/shared/api";

const getArtistLatestReviewList = async (artistId: string) => {
  const url = `/api/v1/reviews/${REVIEW_TYPES.ARTIST}/${artistId}`;
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      limit: 8,
      orderBy: ORDER_BY.CREATED_AT,
    },
  });
  return response.data;
};

export const useArtistLatestReviews = (
  artistId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["reviews_artist_home"],
    queryFn: () => getArtistLatestReviewList(artistId),
    enabled: options?.enabled ?? true,
  });
};
