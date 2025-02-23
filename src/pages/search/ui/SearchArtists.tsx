import { SearchResultsArtist } from "@/features/search/getArtistsBySearch";
import React from "react";

export const SearchArtists: React.FC = () => {
  return (
    <SearchResultsArtist hasShowMoreTab={false} useInfiniteScroll={true} />
  );
};
