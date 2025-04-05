import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ORDER_BY, LowerCaseReviewType } from "@/shared/constants";

const getSearchTopResults = async <T>(
  keyword: string,
  type: LowerCaseReviewType,
  limit: number = 5,
  orderBy: string = ORDER_BY.CREATED_AT
): Promise<T[]> => {
  const url = "/api/v1/search";
  const response = await axiosInstance.get<T[]>(url, {
    params: {
      keyword,
      type,
      limit,
      orderBy,
    },
  });
  return response.data;
};

// 공통화된 검색 훅
export const useSearchTopResults = <T>(
  keyword: string,
  type: LowerCaseReviewType,
  options?: { enabled?: boolean }
) => {
  return useQuery<T[], Error>({
    queryKey: [`${type}s_search_home`, keyword],
    queryFn: () => getSearchTopResults<T>(keyword, type),
    enabled: options?.enabled ?? true,
  });
};
