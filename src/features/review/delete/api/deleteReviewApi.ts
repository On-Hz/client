import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { axiosInstance } from "@/shared/api";
import { useModalStore } from "@/shared/stores";
import { ReviewType } from "@/shared/constants";
import { isReviewQuery } from "@/shared/helpers";
import { usePageInfo } from "../../shared/hooks/usePageInfo";
import { useInvalidateRatingInfo } from "../../shared/hooks/useInvalidateRatingInfo";


export const deleteReview = async (
  reviewType: ReviewType,
  entityId: number,
  reviewId: number
): Promise<void> => {
  await axiosInstance.delete<void>(
    `/api/v1/reviews/${reviewType}/${entityId}/${reviewId}`
  );
};

export const useDeleteReview = (): UseMutationResult<
  void,
  AxiosError,
  { reviewType: ReviewType; entityId: number; reviewId: number }
> => {
  const { openModal } = useModalStore();
  const { pageType, entityId } = usePageInfo();
  const invalidateRatingInfo = useInvalidateRatingInfo({ pageType, entityId });
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError,
    { reviewType: ReviewType; entityId: number; reviewId: number }
  >({
    mutationFn: ({ reviewType, entityId, reviewId }) =>
      deleteReview(reviewType, entityId, reviewId),
    onSuccess: (_data, variables) => {
      openModal("alertModal", {
        type: "success",
        message: "리뷰가 삭제되었습니다.",
      });
      invalidateRatingInfo();
      const segments = location.pathname.split("/").filter(Boolean);
      if (segments.length === 2 && segments[0] === "review") {
        navigate(
          `/${variables.reviewType.toLowerCase()}/${variables.entityId}`
        );
      } else {
        queryClient.invalidateQueries({ predicate: isReviewQuery });
      }
    },
    onError: (error) => {
      openModal("alertModal", {
        type: "error",
        message:
          "리뷰 삭제 실패하였습니다.\n관리자에게 문의하여주세요\n" +
          error.message,
      });
    },
  });
};
