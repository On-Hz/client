import { Link, useParams } from "react-router-dom";
import { sectionProps } from "../../config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";
import { useArtistReviews } from "../api/getArtistReviewsApi";
import { useArtistLatestReviews } from "../api/getArtistLatestReviewsApi";
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
  const infiniteQuery = useArtistReviews({
    enabled: useInfiniteScroll,
  });

  const { data: reviews, isLoading } = useInfiniteScroll
    ? infiniteQuery
    : regularQuery;
  return (
    <ArtistSectionWrapper title={"Reviews"}>
      <div className={useInfiniteScroll ? "hz-review-sec" : "hz-review-sec"}>
        {isLoading &&
          Array.from({ length: 8 }, (v, i) => (
            <div
              className={`${!useInfiniteScroll ? "hz-review-sec-item" : "w-full"}`}
              key={i}
            >
              <ReviewCardSkeleton key={`search-skeleton-${i}`} />
            </div>
          ))}
        {reviews &&
          reviews.map((review) => (
            <Link
              to={`/review/${review.id}`}
              className={`${!useInfiniteScroll ? "hz-review-sec-item" : "w-full"}`}
              key={review.id}
            >
              <ReviewCardContainer
                review={review}
                hasEllipsis={!useInfiniteScroll}
              />
            </Link>
          ))}
      </div>
    </ArtistSectionWrapper>
  );
};
