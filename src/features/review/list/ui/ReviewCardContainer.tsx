import { ReviewCard } from "@/shared/ui";
import { Review } from "@/shared/model/review";
import { useAuthStore } from "@/shared/stores";
import { ReviewActionButtons } from "./ReviewActionButtons";
import { ReviewLikeButton } from "./ReviewLikeButton";
import { BASE_IMAGE_URL } from "@/shared/constants/image";

interface ReviewCardContainerProps {
  review: Review;
  hasBorder?: boolean;
  hasEllipsis?: boolean;
}

export const ReviewCardContainer: React.FC<ReviewCardContainerProps> = ({
  review,
  hasBorder,
  hasEllipsis,
}) => {
  const { user } = useAuthStore();
  
  const userProfileImageUrl = review.user.profilePath ? `${BASE_IMAGE_URL}${review.user.profilePath}` : null;

  return (
    <ReviewCard
      userName={review.user.userName}
      userProfilePath={userProfileImageUrl}
      content={review.content}
      rating={review.rating}
      createdAt={review.createdAt}
      hasBorder={hasBorder}
      hasEllipsis={hasEllipsis}
      reviewActionButtons={
        user && review.user.id === user.id ? (
          <ReviewActionButtons
            reviewType={review.reviewType}
            reviewId={review.id}
            entityId={review.entityId}
            title={review.entityName || ""}
          />
        ) : null
      }
      reviewLikeButton={
        <ReviewLikeButton
          reviewType={review.reviewType}
          reviewId={review.id}
          entityId={review.entityId}
          isLiked={review.isLiked || false}
          likeCount={review.likeCount || 0}
          isOnlyIcon={false}
        />
      }
    />
  );
};
