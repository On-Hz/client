import { sectionProps } from "@/features/artist/config/sectionProps";
import { ReviewCard } from "@/shared/ui/review/Review";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";
import { mockReviews } from "../api//getArtistReviews";
import { mockLatestReviews } from "../api/getArtistLatestReviews";
import './style.css'
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
            : "hz-artist-sec"
        }
      >
        {mockItem.map((review, index) => (
          <div className={"hz-artist-sec-item"}>
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
