import React from "react";
import { useParams } from "react-router-dom";
import {
  SearchResultsAlbum,
  SearchResultsArtist,
  SearchResultsTrack,
  useFetchSearchLanding,
} from "@/features/search";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const SearchHome: React.FC = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const { results, isLoading } = useFetchSearchLanding(searchSlug);
  const { tracks, artists, albums } = results;
  const noResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  if (!isLoading && noResults) {
    return <div className="min-h-[600px] flex items-center justify-center text-[20px] max-500:min-h-[400px] max-500:text-[16px]">
      <ManageSearchIcon fontSize="large"/> 검색 결과가 없습니다.
      </div>;
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
