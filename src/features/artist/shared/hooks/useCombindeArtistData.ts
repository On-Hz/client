import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks"; // 무한 스크롤 훅
import { UseQueryResult } from "@tanstack/react-query";

interface CombinedArtistDataProps<T> {
  artistId: string;
  useInfiniteScroll: boolean;
  regularQuery: UseQueryResult<T[], unknown>;
  infiniteQueryParams: {
    endpoint: string;
    limit: number;
    orderBy: string;
    queryKeyPrefix: string;
  };
}

export const useCombinedArtistData = <T extends { id: number }>({
  useInfiniteScroll,
  regularQuery,
  infiniteQueryParams,
}: CombinedArtistDataProps<T>) => {
  const infiniteQuery = useInfiniteScrollQuery<T>({
    endpoint: infiniteQueryParams.endpoint,
    limit: infiniteQueryParams.limit,
    orderBy: infiniteQueryParams.orderBy,
    enabled: useInfiniteScroll,
    queryKeyPrefix: infiniteQueryParams.queryKeyPrefix,
  });

  const data: T[] = useInfiniteScroll
    ? infiniteQuery.data?.pages.flat() ?? []
    : regularQuery.data ?? [];

  const isLoading = useInfiniteScroll
    ? infiniteQuery.isLoading
    : regularQuery.isLoading;

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (
      useInfiniteScroll &&
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [
    inView,
    useInfiniteScroll,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    infiniteQuery.fetchNextPage,
  ]);

  return {
    data,
    isLoading,
    ref,
    hasNextPage: useInfiniteScroll ? infiniteQuery.hasNextPage : undefined,
  };
};
