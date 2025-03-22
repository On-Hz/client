import { useParams } from "react-router-dom";
import { sectionProps } from "../../config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";
import { useArtistReviews } from "../api/reviewsArtistApi";
import { useArtistLatestReviews } from "../api/latestReviewsArtistApi";
import "./style.css";

export const ReviewsForArtist: React.FC<sectionProps> = ({
  useInfiniteScroll,
}: sectionProps) => {
  const { artistSlug } = useParams<{ artistSlug: string }>() as {
    artistSlug: string;
  };
  const regularQuery = useArtistLatestReviews(artistSlug, {
    enabled: !useInfiniteScroll,
  });
  const infiniteQuery = useArtistReviews({
    enabled: useInfiniteScroll,
  });

  const { data, isLoading } = useInfiniteScroll ? infiniteQuery : regularQuery;
  return (
    <ArtistSectionWrapper title={"Reviews"}>
      <div className={useInfiniteScroll ? "hz-review-sec" : "hz-review-sec"}>
        {isLoading &&
          Array.from({ length: 8 }, (v, i) => (
            <div className={"hz-review-sec-item"} key={i}>
              <ReviewCardSkeleton key={`search-skeleton-${i}`} />
            </div>
          ))}
        {data &&
          data.map((review, index) => (
            <div className={"hz-review-sec-item"} key={index}>
              <ReviewCardContainer
                review={review}
                hasEllipsis={!useInfiniteScroll}
              />
            </div>
          ))}
      </div>
    </ArtistSectionWrapper>
  );
};
