import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Review } from "@/shared/model";

const getDetailReviewInfo = async (reviewId: string) => {
  const url = `/api/v1/reviews/${reviewId}`;
  const response = await axiosInstance.get<Review>(url);
  return response.data;
};

export const useDetailReviewInfo = (reviewId: string) => {
  return useQuery({
    queryKey: ["info_review", reviewId],
    queryFn: () => getDetailReviewInfo(reviewId),
  });
};
