import { axiosInstance } from "@/shared/api";
import { ReviewSubmitData } from "../../shared/model/reviewSubmitSchema";

export const createReview = async (review: ReviewSubmitData): Promise<ReviewSubmitData> => {
  const { reviewType, entityId, content, rating } = review;

  // reviewType과 entityId가 반드시 존재해야 합니다.
  if (!reviewType || !entityId) {
    throw new Error("reviewType과 entityId는 필수입니다.");
  }

  // URL 경로에 reviewType과 entityId를 포함합니다.
  const url = `/api/v1/reviews/${reviewType}/${entityId}`;

  // request body에는 text와 rating을 전송합니다.
  const response = await axiosInstance.post<ReviewSubmitData>(url, {
    content,
    rating,
  });
  return response.data;
};
