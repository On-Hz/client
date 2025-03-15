import { ReviewsForArtist } from "@/features/artist";

export const ArtistReviews: React.FC = () => {
  return <ReviewsForArtist useInfiniteScroll={true} />;
};
