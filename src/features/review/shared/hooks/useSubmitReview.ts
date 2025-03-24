import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useModalStore } from "@/shared/stores";
import type { AxiosError } from "axios";
import type { ReviewSubmitData } from "../model/reviewSubmitSchema";
import { isReviewQuery } from "@/shared/helpers";

interface UseSubmitReviewOptions {
  onSuccessCallback?: () => void;
}

export const useSubmitReview = (
  submitReview: (review: ReviewSubmitData) => Promise<any>,
  options?: UseSubmitReviewOptions
): UseMutationResult<void, AxiosError, ReviewSubmitData> => {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();

  return useMutation<void, AxiosError, ReviewSubmitData>({
    mutationFn: (newReview: ReviewSubmitData) => submitReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: isReviewQuery });
      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }
    },
    onError: (error) => {
      openModal("alertModal", {
        type: "error",
        message:
          "리뷰 작성에 실패하였습니다.\n관리자에게 문의하여주세요.\n" +
          (error.message || "알 수 없는 에러"),
      });
    },
  });
};
