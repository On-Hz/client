import React from "react";
import { Button } from "@/shared/ui";
import { useModalStore } from "@/shared/stores";
import { openModalWithAuthCheck } from "@/shared/helpers";
import { useDeleteReview } from "../../delete/api/deleteReviewApi";
import { ReviewType } from "@/shared/constants";
import { usePageInfo } from "../../shared/hooks/usePageInfo";

interface ReviewActionButtonsProps {
  reviewType: ReviewType;
  reviewId: number;
  entityId: number;
}

export const ReviewActionButtons: React.FC<ReviewActionButtonsProps> = ({
  reviewType,
  reviewId,
  entityId,
}) => {
  const { openModal } = useModalStore();
  const { mutate: deleteReviewMutate } = useDeleteReview();
  const { pageType } = usePageInfo();

  const handleUpdate = () => {
    openModal("alertModal", {
      type: "info",
      message: "해당 리뷰를 수정하시겠습니까?",
      onConfirm: () => {
        openModalWithAuthCheck("updateReviewModal", {
          reviewId,
          pageType
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

  return (
    <div className="flex gap-2">
      <Button text="수정" onClick={handleUpdate} />
      <Button text="삭제" onClick={handleDelete} />
    </div>
  );
};
