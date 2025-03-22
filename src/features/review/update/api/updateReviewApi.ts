import { axiosInstance } from "@/shared/api";
import { ReviewSubmitData } from "../../shared/model/reviewSubmitSchema";

export const updateReview = async (review: ReviewSubmitData): Promise<ReviewSubmitData> => {
  const { reviewType, entityId, reviewId, content, rating } = review;
  if (!reviewType || !entityId || !reviewId) {
    throw new Error("reviewType과 entityId, reviewId는 필수입니다.");
  }

  const url = `/api/v1/reviews/${reviewType}/${entityId}/${reviewId}`;
  const response = await axiosInstance.put<ReviewSubmitData>(url, {
    content,
    rating,
  });
  return response.data;
};
