import { SearchResultsTrack } from "@/features/search/getTracksBySearch";
import React from "react";

export const SearchTracks: React.FC = () => {
  return <SearchResultsTrack hasShowMoreTab={false} useInfiniteScroll={true} />;
};
