import React from "react";
import { SearchResultsAlbum } from "@/features/search";

export const SearchAlbums: React.FC = () => {
  return <SearchResultsAlbum hasShowMoreTab={false} useInfiniteScroll={true} />;
};
