import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Track, Artist, Album } from "@/shared/model";
import { ORDER_BY, LowerCaseReviewType } from "@/shared/constants";

interface CombinedResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}

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

export function useCombinedSearch(keyword: string) {
  const queryClient = useQueryClient();
  const queryKey = ["search_landing", keyword] as const;
  const hasCache = Boolean(queryClient.getQueryData<CombinedResults>(queryKey));

  return useQuery<CombinedResults, Error>({
    queryKey,
    queryFn: async () => {
      if (!keyword) {
        return { tracks: [], artists: [], albums: [] };
      }
      const [tracks, artists, albums] = await Promise.all([
        getSearchTopResults<Track>(keyword, "track"),
        getSearchTopResults<Artist>(keyword, "artist"),
        getSearchTopResults<Album>(keyword, "album"),
      ]);
      return { tracks, artists, albums };
    },
    enabled: Boolean(keyword) && !hasCache,
  });
}
