import { sectionProps } from "@/features/artist/config/sectionProps";
import { mockReviews } from "@/features/artist/getArtistReviews";
import { ReviewCard } from "@/shared/ui/review/Review";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";

export const ArtistReviews: React.FC<sectionProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInfiniteScroll,
}: sectionProps) => (
  <ArtistSectionWrapper title={"Reviews"}>
    {mockReviews.map((review, index) => (
      <ReviewCard
        key={index}
        userName={review.userName}
        userImage={review.userImage}
        reviewText={review.reviewText}
        rating={review.rating}
      />
    ))}
  </ArtistSectionWrapper>
);
