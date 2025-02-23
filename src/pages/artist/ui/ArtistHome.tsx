import { ArtistTopRateDiscography } from "@/features/artist/getArtistHomeData/fetchArtistDiscography";
import { ArtistLatestReviews } from "@/features/artist/getArtistHomeData/fetchLatestReviews";
import { ArtistTopTracks } from "@/features/artist/getArtistHomeData/fetchTopTracks";
import React from "react";

export const ArtistHome: React.FC = () => {
  return (
    <div>
      <ArtistTopTracks />
      <ArtistTopRateDiscography />
      <ArtistLatestReviews />
    </div>
  );
};
