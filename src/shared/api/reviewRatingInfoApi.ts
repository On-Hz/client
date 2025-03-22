import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";
import { Rating } from "@/shared/model";

const getReviewRatingInfo = async (
  entityType: ReviewType,
  entityId: string
): Promise<Rating> => {
  const url = `/api/v1/reviews/${entityType}/${entityId}/ratings`;
  const response = await axiosInstance.get<Rating>(url);
  return response.data;
};

export const useReviewRatingInfo = (
  entityType: ReviewType,
  entityId: string
) => {
  return useQuery<Rating>({
    queryKey: [`ratingInfo_${entityType}`, entityId],
    queryFn: () => getReviewRatingInfo(entityType, entityId),
  });
};
