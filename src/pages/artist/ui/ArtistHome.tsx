import { DiscographyByArtist } from "@/features/artist/getArtistDiscography";
import { LatestReviewsForArtist } from "@/features/artist/getArtistHomeData/fetchLatestReviews";
import { TracksByArtist } from "@/features/artist/getArtistTracks";
import React from "react";

export const ArtistHome: React.FC = () => {
  return (
    <>
      <TracksByArtist useInfiniteScroll={false} />
      <DiscographyByArtist useInfiniteScroll={false} />
      <LatestReviewsForArtist />
    </>
  );
};
