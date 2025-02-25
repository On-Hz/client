import { DiscographyByArtist } from "@/features/artist/getArtistDiscography";
import { ReviewsForArtist } from "@/features/artist/getArtistReviews";
import { TracksByArtist } from "@/features/artist/getArtistTracks";
import React from "react";

export const ArtistHome: React.FC = () => {
  return (
    <>
      <TracksByArtist useInfiniteScroll={false} />
      <DiscographyByArtist useInfiniteScroll={false} />
      <ReviewsForArtist useInfiniteScroll={false} />
    </>
  );
};
