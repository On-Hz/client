import React from "react";
import { NavLink } from "react-router-dom";
import { Track, Artist, Album } from "@/shared/model";
import { TabButton } from "@/shared/ui";

interface SearchTabsProps {
  results: {
    tracks: Track[], 
    artists: Artist[],
    albums: Album[]
  },
  isLoading: boolean
}

export const SearchTabs: React.FC<SearchTabsProps> = ({ results, isLoading }) => {
  const { tracks, artists, albums } = results;
  const hasAnyResults =
    tracks.length > 0 || artists.length > 0 || albums.length > 0;
  if (isLoading || !hasAnyResults) return null;

  return (
    <nav className="flex items-center mx-auto space-x-1 max-w-7xl hz-search-tab">
      <NavLink to="." end>
        {({ isActive }) => <TabButton text="전체" isActive={isActive} />}
      </NavLink>
      {tracks.length > 0 && (
        <NavLink to="track">
          {({ isActive }) => <TabButton text="노래" isActive={isActive} />}
        </NavLink>
      )}
      {artists.length > 0 && (
        <NavLink to="artist">
          {({ isActive }) => <TabButton text="아티스트" isActive={isActive} />}
        </NavLink>
      )}
      {albums.length > 0 && (
        <NavLink to="album">
          {({ isActive }) => <TabButton text="앨범" isActive={isActive} />}
        </NavLink>
      )}
    </nav>
  );
};
