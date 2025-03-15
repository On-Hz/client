// 예시: feature/mypage/manageReview/ui/ReviewActionsContainer.tsx
import React from "react";
import { useModalStore } from "@/shared/stores";
import { openModalWithAuthCheck } from "@/shared/helpers/modalAuthChkHelper";
import { ReviewEditButton } from "@/shared/ui/reviewCard/ReviewEditButton";
import { useDeleteReview } from "@/features/manageReview/deleteReview";
import { ReviewType } from "@/shared/constants";

interface ReviewEditContainerProps {
  reviewType: ReviewType;
  reviewId: number;
  entityId: number;
}

export const ReviewEditContainer: React.FC<ReviewEditContainerProps> = ({
  reviewType,
  reviewId,
  entityId,
}) => {
  const { openModal } = useModalStore();
  const { mutate: deleteReviewMutate } = useDeleteReview();

  const handleModify = () => {
    openModal("alertModal", {
      type: "info",
      message: "해당 리뷰를 수정하시겠습니까?",
      onConfirm: () => {
        openModalWithAuthCheck("modifyReviewModal", {
          reviewType,
          entityId,
          reviewId,
        });
      },
    });
  };

  const handleDelete = () => {
    openModal("alertModal", {
      type: "warning",
      message: "해당 리뷰를 삭제하시겠습니까?",
      onConfirm: () => {
        deleteReviewMutate({ reviewType, entityId, reviewId });
      },
    });
  };

  return <ReviewEditButton onModify={handleModify} onDelete={handleDelete} />;
};
