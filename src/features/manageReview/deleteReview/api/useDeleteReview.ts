import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/api/axiosInstance";
import { ReviewType } from "@/shared/constants";

export const deleteReview = async (reviewType: ReviewType, entityId: number, reviewId: number): Promise<void> => {
  await axiosInstance.delete(`/api/v1/reviews/${reviewType}/${entityId}/${reviewId}`);
};

export const useDeleteReview = () => {
  return useMutation<void, unknown, { reviewType: ReviewType; entityId: number; reviewId: number }>({
    mutationFn: ({ reviewType, entityId, reviewId }) => deleteReview(reviewType, entityId, reviewId),
    onSuccess: () => {
      console.log("리뷰 삭제 성공");
    },
    onError: (error) => {
      console.error("리뷰 삭제 실패:", error);
    },
  });
};
