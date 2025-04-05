import React from "react";
import { SearchResultsArtist } from "@/features/search";

export const SearchArtists: React.FC = () => {
  return <SearchResultsArtist hasShowMoreTab={false} initialData={[]} />;
};
