import { useEffect, useState } from "react";
import { mockReviews } from "../api/getUserTrackReviewsApi";
import { ReviewCardContainer } from "@/features/review";
import { Review } from "@/shared/model";
import { ReviewCardSkeleton } from "@/shared/ui";

export const UserTrackReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  // 비동기 데이터 로딩
  useEffect(() => {
    const loadReviews = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 2초 대기
      setReviews(mockReviews);
      setIsLoading(false);
    };

    loadReviews();
  }, []);

  return (
    <div>
      {isLoading
        ? Array.from({ length: mockReviews.length }).map((_, index) => (
            <ReviewCardSkeleton key={`skeleton-${index}`} />
          ))
        : reviews.map((review) => (
            <ReviewCardContainer key={review.id} review={review} />
          ))}
    </div>
  );
};
