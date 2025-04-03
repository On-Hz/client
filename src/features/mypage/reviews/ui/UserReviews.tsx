
import { useParams } from "react-router-dom";
import { ReviewType } from "@/shared/constants";
import { Review } from "@/shared/model";
import { useUserReviews } from "@/features/mypage/reviews/api/userReviewApi";
import { ReviewCardContainer } from "@/features/review";
import { ReviewCardSkeleton } from "@/shared/ui";

interface Props {
  type: ReviewType;
}

export const UserReviews = ({ type }: Props) => {
  const { userId } = useParams<{ userId: string }>() as { userId: string };
  const { data: reviews = [], isLoading } = useUserReviews(userId, type);

  return (
    <div>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <ReviewCardSkeleton key={`review-skeleton-${i}`} />
        ))
      ) : reviews.length === 0 ? (
        <p className="py-28 text-center">작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review: Review) => (
          <ReviewCardContainer key={review.id} review={review} />
        ))
      )}
  </div>
  );
};
