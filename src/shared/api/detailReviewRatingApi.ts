import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";
import { Rating } from "@/shared/model";

const getDetailReviewRatingInfo = async (
  entityType: ReviewType,
  entityId: string
): Promise<Rating> => {
  const url = `/api/v1/reviews/${entityType}/${entityId}/ratings`;
  const response = await axiosInstance.get<Rating>(url);
  return response.data;
};

export const useDetailReviewRatingInfo = (
  entityType: ReviewType,
  entityId: string
) => {
  const typeKey = `${entityType}`.toLowerCase();
  return useQuery<Rating>({
    queryKey: [`ratingInfo_${typeKey}`, entityId],
    queryFn: () => getDetailReviewRatingInfo(entityType, entityId),
  });
};
