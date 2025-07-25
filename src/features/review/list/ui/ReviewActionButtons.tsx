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
  userId?: string;
  title: string;
}

export const ReviewActionButtons: React.FC<ReviewActionButtonsProps> = ({
  reviewType,
  reviewId,
  entityId,
  userId,
  title,
}) => {
  const { openModal } = useModalStore();
  const { mutate: deleteReviewMutate } = useDeleteReview();
  const { pageType } = usePageInfo();

  const handleUpdateReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal("alertModal", {
      type: "info",
      message: "해당 리뷰를 수정하시겠습니까?",
      onConfirm: () => {
        openModalWithAuthCheck("updateReviewModal", {
          reviewId,
          title,
          pageType,
          userId,
        });
      },
    });
  };

  const handleDeleteReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal("alertModal", {
      type: "warning",
      message: "해당 리뷰를 삭제하시겠습니까?",
      onConfirm: () => {
        deleteReviewMutate({ reviewType, entityId, reviewId, userId: userId! });
      },
    });
  };

  return (
    <div className="flex gap-2 absolute top-2 right-2 z-40 text-[12px]">
      <Button text="수정" onClick={handleUpdateReview} />
      <Button text="삭제" onClick={handleDeleteReview} />
    </div>
  );
};
