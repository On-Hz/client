import { SearchResultsAlbum } from "@/features/search/getAlbumsBySearch";
import React from "react";

export const SearchAlbums: React.FC = () => {
  return <SearchResultsAlbum hasShowMoreTab={false} useInfiniteScroll={true} />;
};
