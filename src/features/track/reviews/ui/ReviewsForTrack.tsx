import React, { useEffect, useState } from "react";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton, RoundDropdown, SubTitle } from "@/shared/ui";
import { Link, useParams } from "react-router-dom";
import { Review } from "@/shared/model";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { ORDER_BY, REVIEW_TYPES, REVIEW_SORT_OPTIONS } from "@/shared/constants";
import { useInView } from "react-intersection-observer";

const ReviewsForTrack = () => {
  const { trackId } = useParams<{ trackId: string }>() as { trackId: string };
  const [orderBy, setOrderBy] = useState<string>(ORDER_BY.CREATED_AT_DESC);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteScrollQuery<Review>({
      endpoint: `/api/v1/reviews/${REVIEW_TYPES.TRACK}/${trackId}`,
      limit: 5,
      orderBy,
      enabled: !!trackId,
      queryKeyPrefix: `track_${orderBy}_review`,
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
        <RoundDropdown
          value={orderBy}
          options={REVIEW_SORT_OPTIONS}
          onChange={(value) => setOrderBy(value)}
        />
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
