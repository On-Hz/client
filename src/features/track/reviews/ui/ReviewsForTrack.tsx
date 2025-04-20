import React, { useEffect } from "react";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton, RoundButton, SubTitle } from "@/shared/ui";
import { Link, useParams } from "react-router-dom";
import { Review } from "@/shared/model";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { useInView } from "react-intersection-observer";

const ReviewsForTrack = () => {
  const { trackId } = useParams<{ trackId: string }>() as { trackId: string };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteScrollQuery<Review>({
      endpoint: `/api/v1/reviews/${REVIEW_TYPES.TRACK}/${trackId}`,
      limit: 5,
      orderBy: ORDER_BY.CREATED_AT,
      enabled: !!trackId,
      queryKeyPrefix: "track_review",
    });

  const reviews = data?.pages.flat() ?? [];

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <div className="flex justify-between pb-[20px]">
        <SubTitle text="리뷰"></SubTitle>
        <RoundButton text="정렬" />
      </div>
      <div>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <ReviewCardSkeleton key={`review-skeleton-${idx}`} />
          ))
        ) : reviews.length === 0 ? (
          <p className="py-12 text-center text-gray text-[16px]">
            작성된 리뷰가 없습니다.
          </p>
        ) : (
          reviews.map((review: Review) => (
            <Link to={`/review/${review.id}`} key={review.id}>
              <ReviewCardContainer review={review} />
            </Link>
          ))
        )}
        {hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  return <ReviewsForTrack />;
};
