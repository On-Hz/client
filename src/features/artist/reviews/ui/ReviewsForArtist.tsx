import { Link, useParams } from "react-router-dom";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";
import { ORDER_BY, REVIEW_TYPES } from "@/shared/constants";
import { Review } from "@/shared/model";
import { sectionProps } from "../../config/sectionProps";
import { useArtistLatestReviews } from "../api/getArtistLatestReviewsApi";
import { useCombinedArtistData } from "../../shared/hooks/useCombindeArtistData";

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
      orderBy: ORDER_BY.CREATED_AT,
      queryKeyPrefix: "reviews_artist",
    },
  });

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
        {useInfiniteScroll && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </ArtistSectionWrapper>
  );
};
