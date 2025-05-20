import { Link, useParams } from "react-router-dom";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton, RoundDropdown } from "@/shared/ui";
import { ORDER_BY, REVIEW_TYPES, REVIEW_SORT_OPTIONS } from "@/shared/constants";
import { Review } from "@/shared/model";
import { sectionProps } from "../../config/sectionProps";
import { useArtistLatestReviews } from "../api/getArtistLatestReviewsApi";
import { useCombinedArtistData } from "../../shared/hooks/useCombindeArtistData";

import "./style.css";
import { useState } from "react";

export const ReviewsForArtist: React.FC<sectionProps> = ({
  useInfiniteScroll,
  sortDropdown,
}: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const [orderBy, setOrderBy] = useState<string>(ORDER_BY.CREATED_AT_DESC);
  

  const regularQuery = useArtistLatestReviews(artistId, {
    enabled: !useInfiniteScroll,
  });

  const {
    data: reviews,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedArtistData<Review>({
    artistId,
    useInfiniteScroll: useInfiniteScroll ?? false,
    regularQuery,
    infiniteQueryParams: {
      endpoint: `/api/v1/reviews/${REVIEW_TYPES.ARTIST}/${artistId}`,
      limit: 5,
      orderBy,
      queryKeyPrefix: `reviews_${orderBy}_artist`,
    },
  });

  return (
    <ArtistSectionWrapper title={"Reviews"}>
      {sortDropdown && (
        <div className="flex justify-end pb-3">
          <RoundDropdown
            value={orderBy}
            options={REVIEW_SORT_OPTIONS}
            onChange={(value) => setOrderBy(value)}
          />
        </div>
      )}
      <div className="hz-review-sec">
        {isLoading ? (
          Array.from({ length: 8 }, (_, i) => (
            <div
              className={`${
                !useInfiniteScroll ? "hz-review-sec-item" : "w-full"
              }`}
              key={i}
            >
              <ReviewCardSkeleton key={`search-skeleton-${i}`} />
            </div>
          ))
        ) : reviews.length === 0 ? (
            <p className="py-12 text-center text-gray text-[16px] w-full">
              작성된 리뷰가 없습니다.
            </p>
        ) : (
          reviews &&
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
          ))
        )}
        {useInfiniteScroll && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </ArtistSectionWrapper>
  );
};
