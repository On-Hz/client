import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useCombinedSearch } from "../api/getSearchTopResults";
import { useSearchResultsStore } from "@/shared/stores";

export const useFetchSearchLanding = (searchSlug: string | undefined) => {
  const { setResults } = useSearchResultsStore(
    (state) => ({
      setResults: state.setResults,
    }),
    shallow
  );
  const { data: results = { tracks: [], artists: [], albums: [] }, isLoading } =
    useCombinedSearch(searchSlug!);

  useEffect(() => {
    setResults(results, searchSlug!);
  }, [results, searchSlug, setResults]);

  return { results, isLoading };
};
