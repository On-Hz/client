import React from "react";
import { SearchResultsTrack } from "@/features/search";

export const SearchTracks: React.FC = () => {
  return <SearchResultsTrack hasShowMoreTab={false} useInfiniteScroll={true} />;
};
