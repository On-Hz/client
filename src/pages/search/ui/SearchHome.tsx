import React from "react";
import { useParams } from "react-router-dom";
import {
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsTrack,
  useFetchSearchLanding,
} from "@/features/search";

export const SearchHome: React.FC = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const { results, isLoading } = useFetchSearchLanding(searchSlug);
  const { tracks, artists, albums } = results;
  const noResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  if (!isLoading && noResults) {
    return <div>검색 결과가 없습니다.</div>;
  }

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
