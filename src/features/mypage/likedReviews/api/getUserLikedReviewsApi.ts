import { axiosInstance } from "@/shared/api";
import { ORDER_BY } from "@/shared/constants";
import { Review } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";


const getUserLikeReviewList = async (userId: string) => {
    const url = `/api/v1/users/${userId}/likes`;
    const response = await axiosInstance.get<Review[]>(url, {
      params: {
        limit: 10,
        orderBy: ORDER_BY.CREATED_AT,
      },
    });
    console.log('getUserLikeReviewList',response.data);
    return response.data;
};
  
export const useUserLikeReviews = (
    userId: string,
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["user_like_review"],
        queryFn: () => getUserLikeReviewList(userId),
        enabled: options?.enabled ?? true,
    });
};
  