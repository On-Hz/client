import React, { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { WriteReviewModal } from "@/shared/ui/modal/modal-review/WriteReviewModal";
import { ConfirmModal } from "./ConfirmModal";
import { ReviewData } from "../model/types";
import { useMutation } from "@tanstack/react-query";
import { postReview } from "../api/postReview";
import { ALERT_TYPES } from "@/shared/constants/alertTypes";

interface WriteReviewProps {
  data?: {
    reviewType?: string;
    entityId?: number;
    title?: string;
  };
}

type ConfirmOptions = {
  type: "content" | "rating";
  content: React.ReactNode;
};

export const WriteReview: React.FC<WriteReviewProps> = ({ data }) => {
  const { modals, openModal, closeModal } = useModalStore();

  // 상태 관리
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);
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

  // 별점 클릭 핸들러 (클릭 시 rating 상태 업데이트)
  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRating(newValue);
  };

  // 별점 Hover 핸들러 (이미 선택된 별점에 마우스가 올라가면 tooltip 표시)
  const handleRatingHover = (event: React.SyntheticEvent, newHover: number) => {
    setTooltipOpen(newHover === rating && rating !== null);
  };

  const getReviewData = (): ReviewData => ({
    content,
    rating: rating ?? 0,
    reviewType: (data?.reviewType as "ALBUM" | "ARTIST" | "TRACK") ?? "ALBUM",
    entityId: data?.entityId,
    title: data?.title || "",
  });

  const mutation = useMutation({
    mutationFn: (newReview: ReviewData) => postReview(newReview),
    onSuccess: () => {
      closeModal("writeReviewModal");
      openModal("alertModal", {
        type: ALERT_TYPES.SUCCESS,
        message: "리뷰가 작성되었습니다."
      });
    },
    onError: (error) => {
      console.error("리뷰 작성 중 에러 발생:", error);
    },
  });

  // 리뷰 제출 버튼 클릭 핸들러
  const handleSubmit = async () => {
    // 텍스트가 없으면 confirm 모달 띄움 (닫기만 있음)
    if (content.trim() === "") {
      setConfirmOptions({
        type: "content",
        content: <p className="text-[18px] mb-4">리뷰 내용을 입력해주세요.</p>,
      });
      return;
    }
    // 별점이 0인 경우 confirm 모달 띄워 "별점 없이 리뷰를 작성하시겠습니까?"라고 묻습니다.
    if (rating === null || rating === 0) {
      setConfirmOptions({
        type: "rating",
        content: (
          <p className="text-[18px] mb-4">별점 없이 리뷰를 작성하시겠습니까?</p>
        ),
      });
      return;
    }
    // 조건에 맞으면 POST 요청 실행
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
      <WriteReviewModal
        open={modals["writeReviewModal"] || false}
        title={data?.title || ""}
        content={content}
        rating={rating}
        maxLength={maxLength}
        tooltipOpen={tooltipOpen}
        onRatingChange={handleRatingChange}
        onRatingHover={handleRatingHover}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
        onClose={() => closeModal("writeReviewModal")}
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
