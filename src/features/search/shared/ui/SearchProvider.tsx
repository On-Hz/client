import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSearchTopResults } from "../api/getSearchTopResults";
import { Track, Artist, Album } from "@/shared/model";

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}

interface SearchContextType {
  results: SearchResults;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const tracksQuery = useSearchTopResults<Track>(searchSlug || "", "track", {
    enabled: !!searchSlug,
  });
  const artistsQuery = useSearchTopResults<Artist>(searchSlug || "", "artist", {
    enabled: !!searchSlug,
  });
  const albumsQuery = useSearchTopResults<Album>(searchSlug || "", "album", {
    enabled: !!searchSlug,
  });

  const isLoading =
    tracksQuery.isLoading || artistsQuery.isLoading || albumsQuery.isLoading;
  const tracks = tracksQuery.data || [];
  const artists = artistsQuery.data || [];
  const albums = albumsQuery.data || [];

  const results: SearchResults = { tracks, artists, albums };

  return (
    <SearchContext.Provider value={{ results, isLoading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
