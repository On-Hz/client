import { useQuery } from "@tanstack/react-query";
import { Review } from "@/shared/model";
import { axiosInstance } from "@/shared/api";
import { ORDER_BY } from "@/shared/constants";

const getLatestReviews = async () => {
  const url = "/api/v1/reviews";
  const response = await axiosInstance.get<Review[]>(url, {
    params: {
      limit: 12,
      orderBy: ORDER_BY.CREATED_AT,
    },
  });
  return response.data;
};

export const useLatestReviews = () => {
  return useQuery({
    queryKey: ["reviews_landing"],
    queryFn: getLatestReviews,
  });
};
