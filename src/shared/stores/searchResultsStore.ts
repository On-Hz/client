import { createWithEqualityFn } from "zustand/traditional";
import { persist, createJSONStorage } from "zustand/middleware";
import { Track, Artist, Album } from "@/shared/model";

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}

interface SearchResultsStore {
  currentKeyword: string;
  results: SearchResults;
  setResults: (results: SearchResults, keyword: string) => void;
  clearResults: () => void;
}

export const useSearchResultsStore = createWithEqualityFn(
  persist<SearchResultsStore>(
    (set) => ({
      currentKeyword: "",
      results: { tracks: [], artists: [], albums: [] },
      setResults: (results: SearchResults, keyword) =>
        set((state) => ({
          results,
          ...(state.currentKeyword !== keyword
            ? { currentKeyword: keyword }
            : {}),
        })),
      clearResults: () => {
        set({
          currentKeyword: "",
          results: { tracks: [], artists: [], albums: [] },
        });
      },
    }),
    {
      name: "search-results",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
