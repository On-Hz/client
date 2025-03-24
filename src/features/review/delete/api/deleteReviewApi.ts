import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { useModalStore } from "@/shared/stores";
import { ReviewType } from "@/shared/constants";
import { AxiosError } from "axios";

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
  const queryClient = useQueryClient();
  return useMutation<
    void,
    AxiosError,
    { reviewType: ReviewType; entityId: number; reviewId: number }
  >({
    mutationFn: ({ reviewType, entityId, reviewId }) =>
      deleteReview(reviewType, entityId, reviewId),
    onSuccess: () => {
      openModal("alertModal", {
        type: "success",
        message: "리뷰가 삭제되었습니다.",
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith("reviews_"),
      });
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
