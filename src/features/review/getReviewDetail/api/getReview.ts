import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Review } from "@/shared/model";

const getReviewDetailInfo = async (reviewId: string) => {
  const url = `/api/v1/reviews/${reviewId}`;
  const response = await axiosInstance.get<Review>(url);
  return response.data;
};

export const useReviewDetailInfo = (reviewId: string) => {
  return useQuery({
    queryKey: ["info_review", reviewId],
    queryFn: () => getReviewDetailInfo(reviewId),
  });
};
