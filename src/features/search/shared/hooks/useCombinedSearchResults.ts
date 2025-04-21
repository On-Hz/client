import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteScroll } from "@/shared/hooks";
import { decodeSlug } from "@/shared/helpers";
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
  const infiniteQuery = useInfiniteScroll<T>({
    endpoint: "/api/v1/search",
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    additionalParams: { keyword: decodeSlug(searchSlug), type },
    enabled: !hasShowMoreTab && Boolean(decodeSlug(searchSlug)),
    queryKeyPrefix: `${type}s_search_${decodeSlug(searchSlug)}`,
  });

  const data: T[] = hasShowMoreTab
    ? initialData ?? []
    : infiniteQuery.data?.pages.flat() ?? [];

  const isLoading =
    hasShowMoreTab && initialData ? false : infiniteQuery.isLoading;

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
