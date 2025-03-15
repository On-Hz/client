import React from "react";
import { Button } from "@/shared/ui/button/Button";

interface ReviewEditButtonProps {
  onModify: () => void;
  onDelete: () => void;
}

export const ReviewEditButton: React.FC<ReviewEditButtonProps> = ({
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
