// feature/ui/ReviewModalContainer.tsx
import React, { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { EditReviewModal } from "@/shared/ui/modal/modal-review/EditReviewModal";
import { ConfirmModal } from "./ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import { ReviewData } from "../model/types";

interface ReviewModalContainerProps {
  modalName: string;
  initialData?: Partial<ReviewData>; // 수정 시 미리 조회한 데이터를 넣어줍니다.
  submitReview: (review: ReviewData) => Promise<any>;
  alertMessage: string;
}

type ConfirmOptions = {
  type: "content" | "rating";
  content: React.ReactNode;
};

export const ReviewModalContainer: React.FC<ReviewModalContainerProps> = ({
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

  // 텍스트 입력 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setContent(e.target.value);
    }
  };

  // 별점 클릭 핸들러
  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRating(newValue);
  };

  // 별점 Hover 핸들러
  const handleRatingHover = (event: React.SyntheticEvent, newHover: number) => {
    setTooltipOpen(newHover === rating && rating !== null);
  };

  const getReviewData = (): ReviewData => ({
    content,
    rating: rating ?? 0,
    reviewType:
      (initialData?.reviewType as "ALBUM" | "ARTIST" | "TRACK") ?? "ALBUM",
    entityId: initialData?.entityId,
    reviewId: initialData?.reviewId,
    title: initialData?.title || "",
  });

  // React Query mutation (API 호출 함수는 prop으로 전달)
  const mutation = useMutation({
    mutationFn: (newReview: ReviewData) => submitReview(newReview),
    onSuccess: () => {
      setReviewModalFlag(false)
      openModal("alertModal", {
        type: "success",
        message: alertMessage,
        onConfirm: () => closeModal(modalName),
      });
    },
    onError: (error) => {
      console.error("리뷰 제출 중 에러 발생:", error);
    },
  });

  // 리뷰 제출 버튼 핸들러
  const handleSubmit = async () => {
    // 텍스트가 없으면 confirm 모달 띄움
    if (content.trim() === "") {
      setConfirmOptions({
        type: "content",
        content: <p className="text-[18px] mb-4">리뷰 내용을 입력해주세요.</p>,
      });
      return;
    }
    // 별점이 0인 경우 confirm 모달 띄움
    if (rating === null || rating === 0) {
      setConfirmOptions({
        type: "rating",
        content: (
          <p className="text-[18px] mb-4">별점 없이 리뷰를 작성하시겠습니까?</p>
        ),
      });
      return;
    }
    // 조건 충족 시 API 호출
    mutation.mutate(getReviewData());
  };

  // ConfirmModal 결과 핸들러
  const handleConfirmModal = async (shouldSubmit: boolean) => {
    if (shouldSubmit && confirmOptions?.type === "rating") {
      mutation.mutate(getReviewData());
    }
    setConfirmOptions(null);
  };

  return (
    <>
      <EditReviewModal
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
        onClose={() => {setReviewModalFlag(false); closeModal(modalName)}}
      />
      {confirmOptions && (
        <ConfirmModal
          type={confirmOptions.type}
          onConfirm={() => handleConfirmModal(true)}
          onCancel={() => handleConfirmModal(false)}
        >
          {confirmOptions.content}
        </ConfirmModal>
      )}
    </>
  );
};
