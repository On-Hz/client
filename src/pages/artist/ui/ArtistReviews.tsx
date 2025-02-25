import { ReviewsForArtist } from "@/features/artist/getArtistReviews";

export const ArtistReviews: React.FC = () => {
  return <ReviewsForArtist useInfiniteScroll={true} />;
};
