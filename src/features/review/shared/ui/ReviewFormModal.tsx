// feature/ui/ReviewModalContainer.tsx
import React, { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { ReviewModal } from "@/shared/ui";
import { ReviewSubmitConfirmModal } from "./ReviewSubmitConfirmModal";
import { useSubmitReview } from "../hooks/useSubmitReview";
import { ReviewSubmitData } from "../model/reviewSubmitSchema";

interface ReviewFormModalProps {
  modalName: string;
  initialData?: Partial<ReviewSubmitData>;
  submitReview: (review: ReviewSubmitData) => Promise<any>;
  alertMessage: string;
}

type ConfirmOptions = {
  type: "content" | "rating";
  content: React.ReactNode;
};

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  modalName,
  initialData,
  submitReview,
  alertMessage,
}) => {
  const { openModal, closeModal } = useModalStore();
  const [reviewModalFlag, setReviewModalFlag] = useState(true);
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState<number | null>(
    initialData?.rating ?? null
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(
    null
  );

  const maxLength = 10000;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setContent(e.target.value);
    }
  };

  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRating(newValue);
  };

  const handleRatingHover = (event: React.SyntheticEvent, newHover: number) => {
    setTooltipOpen(newHover === rating && rating !== null);
  };

  const getReviewData = (): ReviewSubmitData => ({
    content,
    rating: rating ?? 0,
    reviewType:
      (initialData?.reviewType as "ALBUM" | "ARTIST" | "TRACK") ?? "ALBUM",
    entityId: initialData?.entityId,
    reviewId: initialData?.reviewId,
    title: initialData?.title || "",
  });

  const mutation = useSubmitReview(submitReview, {
    onSuccessCallback: () => {
      setReviewModalFlag(false);
      openModal("alertModal", {
        type: "success",
        message: alertMessage,
        onConfirm: () => closeModal(modalName),
      });
    },
  });

  const handleSubmit = async () => {
    if (content.trim() === "") {
      setConfirmOptions({
        type: "content",
        content: <p className="text-[18px] mb-4">리뷰 내용을 입력해주세요.</p>,
      });
      return;
    }
    if (rating === null || rating === 0) {
      setConfirmOptions({
        type: "rating",
        content: (
          <p className="text-[18px] mb-4">별점 없이 리뷰를 작성하시겠습니까?</p>
        ),
      });
      return;
    }

    mutation.mutate(getReviewData());
  };

  const handleConfirmModal = async (shouldSubmit: boolean) => {
    if (shouldSubmit && confirmOptions?.type === "rating") {
      mutation.mutate(getReviewData());
    }
    setConfirmOptions(null);
  };

  return (
    <>
      <ReviewModal
        open={reviewModalFlag}
        title={initialData?.title || ""}
        content={content}
        rating={rating}
        maxLength={maxLength}
        tooltipOpen={tooltipOpen}
        onRatingChange={handleRatingChange}
        onRatingHover={handleRatingHover}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
        onClose={() => {
          setReviewModalFlag(false);
          closeModal(modalName);
        }}
      />
      {confirmOptions && (
        <ReviewSubmitConfirmModal
          type={confirmOptions.type}
          onConfirm={() => handleConfirmModal(true)}
          onCancel={() => handleConfirmModal(false)}
        >
          {confirmOptions.content}
        </ReviewSubmitConfirmModal>
      )}
    </>
  );
};
