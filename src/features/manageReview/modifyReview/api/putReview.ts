import axiosInstance from "@/shared/api/axiosInstance";
import { ReviewData } from "../../model/types";

export const putReview = async (review: ReviewData): Promise<ReviewData> => {
  const { reviewType, entityId, reviewId, content, rating } = review;
  if (!reviewType || !entityId || !reviewId) {
    throw new Error("reviewType과 entityId, reviewId는 필수입니다.");
  }

  const url = `/api/v1/reviews/${reviewType}/${entityId}/${reviewId}`;
  const response = await axiosInstance.put<ReviewData>(url, {
    content,
    rating,
  });
  return response.data;
};
