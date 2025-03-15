import React from "react";
import {
  TracksByArtist,
  DiscographyByArtist,
  ReviewsForArtist,
} from "@/features/artist";

export const ArtistHome: React.FC = () => {
  return (
    <>
      <TracksByArtist useInfiniteScroll={false} />
      <DiscographyByArtist useInfiniteScroll={false} />
      <ReviewsForArtist useInfiniteScroll={false} />
    </>
  );
};
