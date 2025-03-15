import React from "react";
import {
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsTrack,
} from "@/features/search";
export const SearchHome: React.FC = () => {
  return (
    <div>
      <SearchResultsTrack hasShowMoreTab={true} useInfiniteScroll={false} />
      <SearchResultsArtist hasShowMoreTab={true} useInfiniteScroll={false} />
      <SearchResultsAlbum hasShowMoreTab={true} useInfiniteScroll={false} />
    </div>
  );
};
