import { Review } from "@/shared/model";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getAlbumReviewList = async (albumId: string) => {
  const url = `/api/v1/reviews/${REVIEW_TYPES.ALBUM}/${albumId}`;
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      limit: 8,
      orderBy: ORDER_BY.CREATED_AT,
    },
  });
  //console.log("getAlbumReviewList", response.data);
  return response.data;
};

export const useAlbumReviews = (
  albumId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["album_reviews"],
    queryFn: () => getAlbumReviewList(albumId),
    enabled: options?.enabled ?? true,
  });
};

