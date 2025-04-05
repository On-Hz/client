import React from "react";
import {
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsTrack,
  useSearchContext,
} from "@/features/search";
export const SearchHome: React.FC = () => {
  const { results } = useSearchContext();
  const { tracks, artists, albums } = results;
  const noResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  if (noResults) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <SearchResultsTrack hasShowMoreTab={true} initialData={tracks} />
      <SearchResultsArtist hasShowMoreTab={true} initialData={artists} />
      <SearchResultsAlbum hasShowMoreTab={true} initialData={albums} />
    </div>
  );
};
