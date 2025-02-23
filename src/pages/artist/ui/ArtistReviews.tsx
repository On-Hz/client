import { mockReviews } from "@/features/artist/getArtistReviews";
import { ReviewCard } from "@/shared/ui/review/Review";

export const ArtistReviews: React.FC = () => {
  return (
    <section className="px-4 py-8 mx-auto space-y-4 max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      {mockReviews.map((review, index) => (
        <ReviewCard
          key={index}
          userName={review.userName}
          userImage={review.userImage}
          reviewText={review.reviewText}
          rating={review.rating}
        />
      ))}
    </section>
  );
};
