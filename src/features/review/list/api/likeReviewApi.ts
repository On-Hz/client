import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";
import type { AxiosError } from "axios";
import { Review } from "@/shared/model";

export interface LikeReviewVariables {
  reviewType: ReviewType;
  entityId: number;
  reviewId: number;
}

const likeReview = async (
  reviewType: ReviewType,
  entityId: number,
  reviewId: number
): Promise<void> => {
  await axiosInstance.post(
    `/api/v1/reviews/${reviewType}/${entityId}/${reviewId}/like`
  );
};

export const useLikeReview = (): UseMutationResult<
  void,
  AxiosError,
  LikeReviewVariables,
  { previousQueries: Array<[readonly unknown[], unknown]> }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError,
    LikeReviewVariables,
    { previousQueries: Array<[readonly unknown[], unknown]> }
  >({
    mutationFn: ({ reviewType, entityId, reviewId }: LikeReviewVariables) =>
      likeReview(reviewType, entityId, reviewId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith("reviews_"),
      });

      const previousQueries: Array<[readonly unknown[], unknown]> = queryClient
        .getQueryCache()
        .getAll()
        .filter(
          (query) =>
            Array.isArray(query.queryKey) &&
            typeof query.queryKey[0] === "string" &&
            query.queryKey[0].startsWith("reviews_")
        )
        .map((query) => [
          query.queryKey as readonly unknown[],
          query.state.data,
        ]);

      previousQueries.forEach(([queryKey, data]) => {
        if (data) {
          if (
            typeof data === "object" &&
            data !== null &&
            "pages" in data &&
            Array.isArray((data as any).pages)
          ) {
            const oldData = data as { pages: Review[][]; pageParams: unknown };
            const newPages = oldData.pages.map((page) =>
              page.map((review: Review) =>
                review.id === variables.reviewId
                  ? { ...review, isLiked: !review.isLiked }
                  : review
              )
            );
            queryClient.setQueryData(queryKey as readonly unknown[], {
              ...oldData,
              pages: newPages,
            });
          }
          else if (Array.isArray(data)) {
            const newData = data.map((review: Review) =>
              review.id === variables.reviewId
                ? { ...review, isLiked: !review.isLiked }
                : review
            );
            queryClient.setQueryData(queryKey as readonly unknown[], newData);
          }
        }
      });

      return { previousQueries };
    },
    onError: (error, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey as readonly unknown[], data);
        });
      }
      console.error("리뷰 좋아요 실패:", error);
    },
    onSuccess: () => {
      console.log("리뷰 좋아요 성공");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith("reviews_"),
      });
    },
  });
};
