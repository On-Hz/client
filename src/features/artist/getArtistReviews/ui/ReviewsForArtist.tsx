import { sectionProps } from "@/features/artist/config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper";
import { ReviewCard, ReviewCardSkeleton } from '@/shared/ui';
import { useArtistReviews } from "../api/getArtistReviews";
import { useArtistLatestReviews } from "../api/getArtistLatestReviews";
import "./style.css";

export const ReviewsForArtist: React.FC<sectionProps> = ({
  useInfiniteScroll,
}: sectionProps) => {
  const regularQuery = useArtistLatestReviews({ enabled: !useInfiniteScroll });
  const infiniteQuery = useArtistReviews({
    enabled: useInfiniteScroll,
  });

  const { data, isLoading } = useInfiniteScroll ? infiniteQuery : regularQuery;
  return (
    <ArtistSectionWrapper title={"Reviews"}>
      <div className={useInfiniteScroll ? "" : "hz-artist-sec"}>
        {isLoading &&
          Array.from({ length: 8 }, (v, i) => (
            <div className={"hz-artist-sec-item"} key={i}>
              <ReviewCardSkeleton key={`search-skeleton-${i}`} />
            </div>
          ))}
        {data &&
          data.map((review, index) => (
            <div className={"hz-artist-sec-item"} key={index}>
              <ReviewCard
                key={index}
                userName={review.user.userName}
                userProfilePath={review.user.profilePath}
                content={review.content}
                rating={review.rating}
                hasEllipsis={!useInfiniteScroll}
              />
            </div>
          ))}
      </div>
    </ArtistSectionWrapper>
  );
};
