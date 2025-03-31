import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { sectionProps } from "../../config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";
import { useArtistLatestReviews } from "../api/getArtistLatestReviewsApi";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { Review } from "@/shared/model";
import "./style.css";

export const ReviewsForArtist: React.FC<sectionProps> = ({
  useInfiniteScroll,
}: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };

  const regularQuery = useArtistLatestReviews(artistId, {
    enabled: !useInfiniteScroll,
  });

  const infiniteQuery = useInfiniteScrollQuery<Review>({
    endpoint: `/api/v1/reviews/${REVIEW_TYPES.ARTIST}/${artistId}`,
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    enabled: useInfiniteScroll,
    queryKeyPrefix: "reviews_artist",
  });

  const reviews = useInfiniteScroll
    ? infiniteQuery.data?.pages.flat() ?? []
    : regularQuery.data ?? [];
  const isLoading = useInfiniteScroll
    ? infiniteQuery.isLoading
    : regularQuery.isLoading;

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (
      useInfiniteScroll &&
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [
    inView,
    useInfiniteScroll,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    infiniteQuery.fetchNextPage,
  ]);

  return (
    <ArtistSectionWrapper title={"Reviews"}>
      <div className="hz-review-sec">
        {isLoading &&
          Array.from({ length: 8 }, (_, i) => (
            <div
              className={`${
                !useInfiniteScroll ? "hz-review-sec-item" : "w-full"
              }`}
              key={i}
            >
              <ReviewCardSkeleton key={`search-skeleton-${i}`} />
            </div>
          ))}
        {reviews &&
          reviews.map((review) => (
            <Link
              to={`/review/${review.id}`}
              className={`${
                !useInfiniteScroll ? "hz-review-sec-item" : "w-full"
              }`}
              key={review.id}
            >
              <ReviewCardContainer
                review={review}
                hasEllipsis={!useInfiniteScroll}
              />
            </Link>
          ))}
        {useInfiniteScroll && infiniteQuery.hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </ArtistSectionWrapper>
  );
};
