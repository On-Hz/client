import { ReviewCard } from "@/shared/ui";
import { Review } from "@/shared/model/review";
import { useAuthStore, useModalStore } from "@/shared/stores";
import { useLikeReview } from "../api/likeReviewApi";
import { ReviewActionButtons } from "./ReviewActionButtons";

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
  const { token, user } = useAuthStore();
  const openModal = useModalStore.getState().openModal;
  const { mutate: likeReview } = useLikeReview();

  const handleLikeReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!token || !user) {
      openModal("authInfoModal");
      return;
    }
    likeReview({
      reviewType: review.reviewType,
      entityId: review.entityId,
      reviewId: review.id,
    });
  };

  return (
    <ReviewCard
      userName={review.user.userName}
      userProfilePath={review.user.profilePath}
      content={review.content}
      rating={review.rating}
      createdAt={review.createdAt}
      isLiked={review.isLiked}
      handleLikeReview={handleLikeReview}
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
      likeCount={review.likeCount}
    />
  );
};
