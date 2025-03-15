import React from "react";
import { ModalLayout } from "@/shared/ui/modal/ModalLayout";

interface ConfirmModalProps {
  type: "content" | "rating";
  onConfirm?: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  type,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <ModalLayout open={true} onClose={onCancel} showCloseButton>
      <h2 className="mb-4 text-xl font-bold">알림</h2>
      <div className="py-[20px] px-[30px] w-[400px]">
        {children}
        <div className="flex justify-center mt-10 space-x-4">
          {type === "rating" ? (
            <>
              <button
                onClick={onConfirm!}
                className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px]"
              >
                예
              </button>
              <button
                onClick={onCancel}
                className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px]"
              >
                아니오
              </button>
            </>
          ) : (
            <button
              onClick={onCancel}
              className="w-16 bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px]"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
