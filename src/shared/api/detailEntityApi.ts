import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";

/**
 * entityType에 따라 엔티티 상세 정보를 가져오는 API 함수
 *
 * @param reviewType - "ALBUM", "ARTIST", "TRACK" 중 하나
 * @param entityId - 엔티티의 고유 ID
 * @returns Promise<T> - 호출 시 지정한 타입의 데이터 반환 (예: Album, Artist, Track)
 */
export const getDetailEntityInfo = async <T>(
  entityType: ReviewType,
  entityId: string
): Promise<T> => {
  const endpoint = `/api/v1/${(
    entityType as string
  ).toLowerCase()}s/${entityId}`;
  const response = await axiosInstance.get<T>(endpoint);
  return response.data;
};

export const useDetailEntityInfo = <T>(
  entityType: ReviewType,
  entityId: string
) => {
  const typeKey = `${entityType}`.toLowerCase();
  return useQuery({
    queryKey: [`info_${typeKey}`, entityId],
    queryFn: () => getDetailEntityInfo<T>(entityType, entityId),
    enabled: !!entityType && !!entityId, 
  });
};
