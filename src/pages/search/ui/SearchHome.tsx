import { SearchResultsAlbum } from "@/features/search/getAlbumsBySearch";
import { SearchResultsArtist } from "@/features/search/getArtistsBySearch";
import { SearchResultsTrack } from "@/features/search/getTracksBySearch";
import React from "react";

export const SearchHome: React.FC = () => {
  return (
    <div>
      <SearchResultsTrack hasShowMoreTab={true} useInfiniteScroll={false} />
      <SearchResultsArtist hasShowMoreTab={true} useInfiniteScroll={false} />
      <SearchResultsAlbum hasShowMoreTab={true} useInfiniteScroll={false} />
    </div>
  );
};
