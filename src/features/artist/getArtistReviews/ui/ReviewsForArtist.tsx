import { sectionProps } from "@/features/artist/config/sectionProps";
import { ReviewCard } from "@/shared/ui/review/Review";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";
import { mockReviews } from "../api//getArtistReviews";
import { mockLatestReviews } from "../api/getArtistLatestReviews";

export const ReviewsForArtist: React.FC<sectionProps> = ({
  useInfiniteScroll,
}: sectionProps) => {
  const mockItem = useInfiniteScroll ? mockReviews : mockLatestReviews;
  return (
    <ArtistSectionWrapper title={"Reviews"}>
      <div
        className={
          useInfiniteScroll
            ? ""
            : "grid grid-cols-4 gap-4 max-500:grid-cols-1 max-800:grid-cols-2 max-1000:grid-cols-4 max-1200:grid-cols-3"
        }
      >
        {mockItem.map((review, index) => (
          <div className={"mx-3"}>
            <ReviewCard
              key={index}
              userName={review.userName}
              userImage={review.userImage}
              reviewText={review.reviewText}
              rating={review.rating}
              hasEllipsis={!useInfiniteScroll}
            />
          </div>
        ))}
      </div>
    </ArtistSectionWrapper>
  );
};
