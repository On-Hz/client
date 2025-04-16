import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { TabButton } from "@/shared/ui";
import { useSearchResultsStore } from "@/shared/stores/searchResultsStore";
import shallow from "zustand/shallow";

export const SearchTabs: React.FC = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const { results, isLoading } = useSearchResultsStore(
    (state) => ({
      results: state.results,
      isLoading: state.isLoading,
    }),
    shallow
  );
  const { tracks, artists, albums } = results;

  const hasAnyResults =
    tracks.length > 0 || artists.length > 0 || albums.length > 0;
  if (isLoading || !hasAnyResults) return null;

  return (
    <nav className="flex items-center space-x-1 mx-auto max-w-7xl hz-search-tab">
      <NavLink to={`/search/${searchSlug}`} end>
        {({ isActive }) => <TabButton text="전체" isActive={isActive} />}
      </NavLink>
      {tracks.length > 0 && (
        <NavLink to={`/search/${searchSlug}/track`}>
          {({ isActive }) => <TabButton text="노래" isActive={isActive} />}
        </NavLink>
      )}
      {artists.length > 0 && (
        <NavLink to={`/search/${searchSlug}/artist`}>
          {({ isActive }) => <TabButton text="아티스트" isActive={isActive} />}
        </NavLink>
      )}
      {albums.length > 0 && (
        <NavLink to={`/search/${searchSlug}/album`}>
          {({ isActive }) => <TabButton text="앨범" isActive={isActive} />}
        </NavLink>
      )}
    </nav>
  );
};
