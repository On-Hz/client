import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";

export const likeReview = async (
  reviewType: ReviewType,
  entityId: number,
  reviewId: number
): Promise<void> => {
  await axiosInstance.post(
    `/api/v1/reviews/${reviewType}/${entityId}/${reviewId}/like`
  );
};

export const useLikeReview = () => {
  return useMutation<
    void,
    unknown,
    { reviewType: ReviewType; entityId: number; reviewId: number }
  >({
    mutationFn: ({ reviewType, entityId, reviewId }) =>
      likeReview(reviewType, entityId, reviewId),
    onSuccess: () => {
      console.log("리뷰 좋아요 성공");
    },
    onError: (error) => {
      console.error("리뷰 좋아요 실패:", error);
    },
  });
};
