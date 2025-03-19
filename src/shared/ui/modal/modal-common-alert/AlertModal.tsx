import React from "react";
import { useModalStore } from "@/shared/stores";
import { AlertType } from "@/shared/constants";
import { ModalLayout, Button, ModalButton } from "@/shared/ui";
import { RenderIcon } from "./RenderAlertIcon";

interface AlertModalData {
  type: AlertType;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export const AlertModal: React.FC = () => {
  const { modals, modalData, closeModal } = useModalStore();
  const open = modals["alertModal"] || false;
  const data: AlertModalData = modalData["alertModal"] || {};

  // 데이터가 없으면 렌더링하지 않습니다.
  if (!data) return null;

  const { type, message, confirmText = "확인", onConfirm } = data;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal("alertModal");
  };

  return (
    <ModalLayout open={open} onClose={() => closeModal("alertModal")}>
      <div className="py-[20px] px-[30px] max-500:p-0">
        <div className="flex flex-col items-center">
          <RenderIcon type={type}/>
          <p className="mt-4 mb-10 text-lg text-center text-black">
            {message}
          </p>
          {onConfirm ? (
            <div className="flex gap-4">
              <Button onClick={handleConfirm} text="예" />
              <Button onClick={() => closeModal("alertModal")} text="아니오" />
            </div>
          ) : (
             <ModalButton
              text={confirmText}
              width="100%"
              py="5px"
              px="40px"
              onClick={() => closeModal("alertModal")}
            />
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
