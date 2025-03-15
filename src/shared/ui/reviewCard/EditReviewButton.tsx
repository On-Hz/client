import React from "react";
import { Button } from "@/shared/ui";

interface EditReviewButtonProps {
  onModify: () => void;
  onDelete: () => void;
}

export const EditReviewButton: React.FC<EditReviewButtonProps> = ({
  onModify,
  onDelete,
}) => {
  return (
    <div className="flex gap-2">
      <Button text="수정" onClick={onModify} />
      <Button text="삭제" onClick={onDelete} />
    </div>
  );
};
