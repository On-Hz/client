import React from "react";
import { ReviewCardSkeleton } from "@/shared/ui";
import { Review } from "@/shared/model";
import { ReviewCardContainer } from "../../list/ui/ReviewCardContainer";
interface ReviewDetailProps {
  isLoading: boolean;
  review: Review | undefined;
}

export const ReviewDetail: React.FC<ReviewDetailProps> = ({
  isLoading,
  review,
}) => {
  return isLoading || !review ? (
    <ReviewCardSkeleton />
  ) : (
    <ReviewCardContainer review={review} hasBorder={true} isDetailPage={true} />
  );
};
