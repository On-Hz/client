import React, { useEffect } from "react";
import { ReviewCardContainer } from "@/features/review"
import { ReviewCardSkeleton, RoundButton, SubTitle } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useTrackReviews } from "../api/getTrackReviewsApi";
import { Review } from "@/shared/model";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { useInView } from "react-intersection-observer";

const ReviewsForTrack = () => {
  const { trackId } = useParams<{ trackId: string }>() as { trackId: string };
  const infiniteMode = false;

  const regularQuery = useTrackReviews(trackId, {
    enabled: !infiniteMode,
  });

  const infiniteQuery = useInfiniteScrollQuery<Review>({
    endpoint: `/api/v1/reviews/${REVIEW_TYPES.TRACK}/${trackId}`,
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    enabled: infiniteMode,
    queryKeyPrefix: "track_review"
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
            <ReviewCardContainer key={review.id} review={review} />
          ))
        )}
        {infiniteMode && infiniteQuery.hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  return <ReviewsForTrack />;
};
