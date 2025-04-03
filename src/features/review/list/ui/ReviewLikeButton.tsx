import { useAuthStore, useModalStore } from "@/shared/stores";
import { ReviewType } from "@/shared/constants";
import { useLikeReview } from "../api/likeReviewApi";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ReviewLikeButtonProps {
  reviewType: ReviewType;
  reviewId: number;
  entityId: number;
  isLiked: boolean;
  likeCount: number;
  isOnlyIcon: boolean;
}

export const ReviewLikeButton: React.FC<ReviewLikeButtonProps> = ({
  reviewType,
  reviewId,
  entityId,
  isLiked,
  likeCount,
  isOnlyIcon,
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
      reviewType: reviewType,
      entityId: entityId,
      reviewId: reviewId,
    });
  };
  return (
    <>
      <button onClick={handleLikeReview}>
        <FavoriteIcon
          className={
            isLiked ? "text-red" : "text-white stroke-black stroke-[2px]"
          }
        />
      </button>
      {(likeCount || likeCount === 0) && (
        <p className={`text-black text-[14px] pt-[2px] ${!isOnlyIcon ? "pl-[10px]" : "pl-[8px]"}`}>
          {!isOnlyIcon ? `좋아요 ${likeCount}` : likeCount}
        </p>
      )}
    </>
  );
};
