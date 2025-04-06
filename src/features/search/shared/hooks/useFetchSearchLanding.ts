import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useSearchTopResults } from "../api/getSearchTopResults";
import { useSearchResultsStore } from "@/shared/stores";
import { Track, Artist, Album } from "@/shared/model";

export const useFetchSearchLanding = (searchSlug: string | undefined) => {
  const { currentKeyword, setResults, setLoading, clearResults } =
    useSearchResultsStore(
      (state) => ({
        currentKeyword: state.currentKeyword,
        setResults: state.setResults,
        setLoading: state.setLoading,
        clearResults: state.clearResults,
      }),
      shallow
    );

  useEffect(() => {
    if (searchSlug && searchSlug !== currentKeyword) {
      clearResults();
    }
  }, [searchSlug, currentKeyword, clearResults]);

  const trackQuery = useSearchTopResults<Track>(searchSlug || "", "track", {
    enabled: !!searchSlug && searchSlug !== currentKeyword,
  });
  const artistQuery = useSearchTopResults<Artist>(searchSlug || "", "artist", {
    enabled: !!searchSlug && searchSlug !== currentKeyword,
  });
  const albumQuery = useSearchTopResults<Album>(searchSlug || "", "album", {
    enabled: !!searchSlug && searchSlug !== currentKeyword,
  });

  const loading =
    !!searchSlug &&
    (trackQuery.isLoading || artistQuery.isLoading || albumQuery.isLoading);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    if (searchSlug && !loading) {
      setResults({
        tracks: trackQuery.data || [],
        artists: artistQuery.data || [],
        albums: albumQuery.data || [],
      });
    }
  }, [
    searchSlug,
    loading,
    trackQuery.data,
    artistQuery.data,
    albumQuery.data,
    setResults,
  ]);

  const results = useSearchResultsStore((state) => state.results, shallow);
  const isLoading = useSearchResultsStore((state) => state.isLoading);

  return { results, isLoading };
};
