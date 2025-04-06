import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from "zustand/middleware";

interface SearchHistoryStore {
  recentSearches: string[];
  addSearch: (search: string) => void;
  removeSearch: (search: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = createWithEqualityFn(
  persist<SearchHistoryStore>(
    (set, get) => ({
      recentSearches: [],
      addSearch: (search: string) => {
        const filtered = get().recentSearches.filter((item) => item !== search);
        const updated = [search, ...filtered].slice(0, 12);
        set({ recentSearches: updated });
      },
      removeSearch: (search: string) =>
        set({
          recentSearches: get().recentSearches.filter(
            (item) => item !== search
          ),
        }),
      clearHistory: () => set({ recentSearches: [] }),
    }),
    { name: "search-history" }
  )
);
