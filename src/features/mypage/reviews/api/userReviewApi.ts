import { axiosInstance } from "@/shared/api";
import { ORDER_BY, ReviewType } from "@/shared/constants";
import { Review } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";


const getUserReviewList = async (userId: string, type: ReviewType) => {
    const url = `/api/v1/users/${userId}/reviews/${type}`;
    const response = await axiosInstance.get<Review[]>(url, {
      params: {
        limit: 5,
        orderBy: ORDER_BY.CREATED_AT_DESC,
      },
    });
    return response.data;
};
  
export const useUserReviews = (
    userId: string,
    type: ReviewType,
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["user_review", userId, type],
        queryFn: () => getUserReviewList(userId, type),
        enabled: options?.enabled ?? true,
    });
};
  