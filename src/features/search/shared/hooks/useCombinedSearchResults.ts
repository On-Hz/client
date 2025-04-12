import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchTopResults } from "../api/getSearchTopResults";
import { useInfiniteScroll } from "@/shared/hooks";
import { ORDER_BY } from "@/shared/constants";

interface UseCombinedSearchResultsProps<T> {
  searchSlug: string;
  type: "track" | "album" | "artist";
  hasShowMoreTab: boolean;
  initialData?: T[];
}

export const useCombinedSearchResults = <T extends { id: number }>({
  searchSlug,
  type,
  hasShowMoreTab,
  initialData,
}: UseCombinedSearchResultsProps<T>) => {
  const regularQuery = useSearchTopResults<T>(searchSlug, type, {
    enabled: hasShowMoreTab && !initialData,
  });

  const infiniteQuery = useInfiniteScroll<T>({
    endpoint: "/api/v1/search",
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    additionalParams: { keyword: searchSlug, type },
    enabled: !hasShowMoreTab,
    queryKeyPrefix: `${type}s_search_${searchSlug}`,
  });

  const data: T[] = hasShowMoreTab
    ? initialData ?? regularQuery.data ?? []
    : infiniteQuery.data?.pages.flat() ?? [];

  const isLoading = hasShowMoreTab
    ? initialData
      ? false
      : regularQuery.isLoading
    : infiniteQuery.isLoading;

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (
      !hasShowMoreTab &&
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [
    inView,
    hasShowMoreTab,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    infiniteQuery.fetchNextPage,
  ]);

  return {
    data,
    isLoading,
    ref,
    hasNextPage: hasShowMoreTab ? undefined : infiniteQuery.hasNextPage,
  };
};
