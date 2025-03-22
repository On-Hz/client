import React from "react";
import { useParams } from "react-router-dom";
import {
  ReviewBanner,
  ReviewDetail,
  useDetailReviewInfo,
} from "@/features/review";
import "./style.css";

export const ReviewPage: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { data: review, isLoading } = useDetailReviewInfo(reviewId || "");
  if (isLoading || !review) return;
  return (
    <div id="rv-page">
      <ReviewBanner
        reviewType={review.reviewType}
        entityId={review.entityId.toString()}
      />
      <ReviewDetail isLoading={isLoading} review={review} />
    </div>
  );
};
