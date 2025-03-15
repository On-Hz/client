import { ReviewCard, ReviewCardSkeleton } from '@/shared/ui';
import { mockReviews } from "../api/getUserArtistReviews";
import { useEffect, useState } from "react";
import { Review } from "@/shared/model";
import { EditReviewButtonContainer } from "@/features/review/editReview";

export const UserArtistReviews = () => {
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
            <ReviewCard
              key={review.id}
              myReviewEditButton={
                <EditReviewButtonContainer
                  reviewType={review.reviewType}
                  reviewId={review.id}
                  entityId={review.entityId}
                />
              }
              userName={review.user.userName}
              userProfilePath={review.user.profilePath}
              content={review.content}
              rating={review.rating}
            />
          ))}
    </div>
  );
};
