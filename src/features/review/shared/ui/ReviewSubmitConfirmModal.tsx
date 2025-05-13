import React from "react";
import { ModalLayout } from "@/shared/ui";

interface ReviewSubmitConfirmModalProps {
  type: "content" | "rating";
  onConfirm?: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export const ReviewSubmitConfirmModal: React.FC<ReviewSubmitConfirmModalProps> = ({
  type,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <ModalLayout open={true} onClose={onCancel} showCloseButton>
      <h2 className="mb-4 text-xl font-bold max-500:text-[18px]">알림</h2>
      <div className="py-[20px] px-[30px] w-[400px] max-500:w-[250px] max-500:px-[15px] max-500:pb-0">
        {children}
        <div className="flex justify-center mt-10 space-x-2">
          {type === "rating" ? (
            <>
              <button
                onClick={onConfirm!}
                className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px] max-500:py-[5px]"
              >
                예
              </button>
              <button
                onClick={onCancel}
                className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px] max-500:py-[5px]"
              >
                아니오
              </button>
            </>
          ) : (
            <button
              onClick={onCancel}
              className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px] max-500:py-[5px]"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
