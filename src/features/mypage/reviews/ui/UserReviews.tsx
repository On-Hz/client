
import { useParams } from "react-router-dom";
import { ORDER_BY, ReviewType } from "@/shared/constants";
import { Review } from "@/shared/model";
import { useUserReviews } from "@/features/mypage/reviews/api/userReviewApi";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface TabTypeProps {
  type: ReviewType;
}

export const UserReviews = ({ type }: TabTypeProps) => {
  const { userId } = useParams<{ userId: string }>() as { userId: string };

  const infiniteMode = true;
  const regularQuery = useUserReviews(userId, type, {
    enabled: !infiniteMode
  });

  const infiniteQuery = useInfiniteScrollQuery<Review>({
    endpoint: `/api/v1/users/${userId}/reviews/${type}`,
    limit: 5, //테스트 1
    orderBy: ORDER_BY.CREATED_AT,
    enabled: infiniteMode,
    queryKeyPrefix: "user_reviews",
  });

  const reviews = infiniteMode
    ? infiniteQuery.data?.pages.flat() ?? []
    : regularQuery.data ?? [];

  const isLoading = infiniteMode
    ? infiniteQuery.isLoading
    : regularQuery.isLoading;

  const { ref, inView } = useInView({ threshold: 0 });
  
  useEffect(() => {
    if (
      infiniteMode &&
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [inView, infiniteMode, infiniteQuery]);  

  return (
    <div>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <ReviewCardSkeleton key={`review-skeleton-${i}`} />
        ))
      ) : reviews.length === 0 ? (
        <p className="py-28 text-center">작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review: Review) => (
          <ReviewCardContainer key={review.id} review={review} />
        ))
      )}

      {infiniteMode && infiniteQuery.hasNextPage && (
        <div ref={ref} style={{ height: "1px" }} />
      )}

  </div>
  );
};
