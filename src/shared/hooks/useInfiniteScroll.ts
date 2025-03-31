import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";

interface InfiniteScrollParams {
  endpoint: string;
  limit: number;
  orderBy: string;
  enabled?: boolean;
  queryKeyPrefix?: string;
}

interface PageParam {
  lastId: number | null;
  lastOrderValue: string | number | null;
}

/**
 * @template T - API 응답의 데이터 항목 타입. 각 항목은 최소 { id: number }를 포함해야 합니다.
 */
export function useInfiniteScroll<T extends { id: number }>({
  endpoint,
  limit,
  orderBy,
  enabled = true,
  queryKeyPrefix = "infiniteData",
}: InfiniteScrollParams) {
  const queryKey = [queryKeyPrefix, endpoint, limit, orderBy];

  return useInfiniteQuery<T[], Error>({
    queryKey,
    // v5의 useInfiniteQuery에서는 queryFn 매개변수로 { pageParam } 을 받습니다.
    queryFn: async ({ pageParam = { lastId: null, lastOrderValue: null } }) => {
      const { lastId, lastOrderValue } = pageParam as PageParam;
      const res = await axiosInstance.get<T[]>(endpoint, {
        params: {
          lastId,
          lastOrderValue,
          limit,
          orderBy,
        },
      });
      return res.data;
    },
    // API 응답의 마지막 아이템을 기준으로 다음 페이지 커서를 계산합니다.
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length > 0) {
        const lastItem = lastPage[lastPage.length - 1];
        return {
          lastId: lastItem.id,
          lastOrderValue: (lastItem as any)[orderBy],
        };
      }
      return undefined;
    },
    initialPageParam: { lastId: null, lastOrderValue: null },
    enabled,
  });
}
