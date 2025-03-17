import { useQuery } from "@tanstack/react-query";
import { Review } from "@/shared/model";
import { axiosInstance } from "@/shared/api";


const getLatestReviewList = async () => {
  const url = "/api/v1/reviews";
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      offset: 0,
      limit: 12,
      order_by: "created_at",
    },
  });
  return response.data;
};

export const useLatestReviews = () => {
  return useQuery({
    queryKey: ["reviews_landing"],
    queryFn: getLatestReviewList,
  });
};
