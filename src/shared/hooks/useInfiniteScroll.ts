import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";

interface InfiniteScrollParams<T, K extends keyof T> {
  endpoint: string;
  limit: number;
  orderBy: K;
  enabled?: boolean;
  queryKeyPrefix?: string;
}

interface PageParam {
  lastId: number | null;
  lastOrderValue: string | number | null;
}

/**
 * @template T - API 응답의 데이터 항목 타입. 각 항목은 최소 { id: number }를 포함해야 합니다.
 * @template K - orderBy로 사용할 T의 키. 이 필드는 API 응답 데이터에 반드시 존재해야 합니다.
 */
export function useInfiniteScroll<T extends { id: number }, K extends keyof T>({
  endpoint,
  limit,
  orderBy,
  enabled = true,
  queryKeyPrefix = "infiniteData",
}: InfiniteScrollParams<T, K>) {
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
          lastOrderValue: lastItem[orderBy] as string | number,
        };
      }
      return undefined;
    },
    initialPageParam: { lastId: null, lastOrderValue: null },
    enabled,
  });
}
