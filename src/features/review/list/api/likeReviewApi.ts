import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosInstance } from "@/shared/api";
import { isReviewQuery } from "@/shared/helpers";
import { ReviewType } from "@/shared/constants";
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

/**
 * data 내의 review 배열(또는 infinite scroll 구조의 pages)에서
 * reviewId에 해당하는 항목의 isLiked 값을 토글하여 반환합니다.
 */
const toggleLikeInData = (data: unknown, reviewId: number): unknown => {
  if (
    data &&
    typeof data === "object" &&
    "pages" in data &&
    Array.isArray((data as any).pages)
  ) {
    const oldData = data as { pages: Review[][]; pageParams: unknown };
    const newPages = oldData.pages.map((page) =>
      page.map((review: Review) =>
        review.id === reviewId
          ? { ...review, isLiked: !review.isLiked }
          : review
      )
    );
    return { ...oldData, pages: newPages };
  } else if (Array.isArray(data)) {
    return data.map((review: Review) =>
      review.id === reviewId ? { ...review, isLiked: !review.isLiked } : review
    );
  }
  return data;
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
      await queryClient.cancelQueries({ predicate: isReviewQuery });

      // 기존 데이터를 백업하고 필터링
      const previousQueries: Array<[readonly unknown[], unknown]> = queryClient
        .getQueryCache()
        .getAll()
        .filter(isReviewQuery)
        .map((query) => [
          query.queryKey as readonly unknown[],
          query.state.data,
        ]);

      // 백업한 쿼리들을 순회하며 optimistic update 적용
      previousQueries.forEach(([queryKey, data]) => {
        if (data) {
          const newData = toggleLikeInData(data, variables.reviewId);
          queryClient.setQueryData(queryKey, newData);
        }
      });

      return { previousQueries };
    },
    onError: (error, _variables, context) => {
      // 오류 발생 시 이전 데이터로 롤백
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // 최종적으로 review 관련 쿼리 무효화
      queryClient.invalidateQueries({ predicate: isReviewQuery });
    },
  });
};
