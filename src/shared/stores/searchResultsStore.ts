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
  isLoading: boolean;
  setResults: (results: SearchResults) => void;
  setCurrentKeyword: (keyword: string) => void;
  setLoading: (loading: boolean) => void;
  clearResults: () => void;
}

export const useSearchResultsStore = createWithEqualityFn(
  persist<SearchResultsStore>(
    (set) => ({
      currentKeyword: "",
      results: { tracks: [], artists: [], albums: [] },
      isLoading: false,
      setResults: (results) => set({ results }),
      setCurrentKeyword: (keyword: string) =>
        set((state) => {
          if (state.currentKeyword === keyword) return {};
          return { currentKeyword: keyword };
        }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      clearResults: () =>
        set({
          isLoading: true,
          currentKeyword: "",
          results: { tracks: [], artists: [], albums: [] },
        }),
    }),
    {
      name: "search-results",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
