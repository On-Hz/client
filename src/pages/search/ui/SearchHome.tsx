import React from "react";
import {
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsTrack,
} from "@/features/search";
import { useSearchResultsStore } from "@/shared/stores";

export const SearchHome: React.FC = () => {
  const { results } = useSearchResultsStore(
    (state) => ({
      results: state.results,
    })
  );
  const { tracks, artists, albums } = results;
  
  return (
    <div>
      {tracks.length > 0 && (
        <SearchResultsTrack hasShowMoreTab={true} initialData={tracks} />
      )}
      {artists.length > 0 && (
        <SearchResultsArtist hasShowMoreTab={true} initialData={artists} />
      )}
      {albums.length > 0 && (
        <SearchResultsAlbum hasShowMoreTab={true} initialData={albums} />
      )}
    </div>
  );
};
