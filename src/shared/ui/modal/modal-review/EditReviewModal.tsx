import React from "react";
import { ModalLayout, ModalButton } from "@/shared/ui";
import { Rating, Tooltip } from "@mui/material";

export interface EditReviewModalProps {
  open: boolean;
  title?: string;
  content: string;
  rating: number | null;
  maxLength: number;
  tooltipOpen: boolean;
  onRatingChange: (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => void;
  onRatingHover: (event: React.SyntheticEvent, newHover: number) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  open,
  title,
  content,
  rating,
  maxLength,
  tooltipOpen,
  onRatingChange,
  onRatingHover,
  onContentChange,
  onSubmit,
  onClose,
}) => {
  return (
    <ModalLayout open={open} onClose={onClose} showCloseButton>
      <div className="py-[25px] px-[40px] w-[550px] max-500:w-[300px] max-500:p-0">
        <p className="text-[36px] pb-6 font-semibold max-500:text-[30px]">
          {title}
        </p>
        <Tooltip
          title="취소하기"
          followCursor
          open={tooltipOpen}
          placement="top"
        >
          <Rating
            value={rating}
            onChange={onRatingChange}
            onChangeActive={onRatingHover} // hover 이벤트 핸들러 연결
            precision={0.5}
            sx={{
              marginBottom: "15px",
              fontSize: "36px",
              fontWeight: "200",
              "& .MuiRating-iconFilled": { color: "#FFD231" },
              "& .MuiRating-iconEmpty": { color: "#a1a1a1" },
            }}
          />
        </Tooltip>
        <textarea
          value={content}
          onChange={onContentChange}
          className="resize-none h-[150px] border border-gray4 w-full p-4"
          placeholder="리뷰를 작성해주세요."
        ></textarea>
        <div className="pt-1 text-right pb-9 text-gray">
          {content.length} / {maxLength}자
        </div>
        <div className="text-center">
          <ModalButton text="리뷰 작성" onClick={onSubmit} />
        </div>
      </div>
    </ModalLayout>
  );
};
