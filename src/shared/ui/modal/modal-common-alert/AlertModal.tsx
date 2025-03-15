import React from "react";
import { ModalLayout } from "../ModalLayout";
import { useModalStore } from "@/shared/stores/modalStore";
import { AlertType } from "@/shared/constants/alertTypes";
import { Button } from "@/shared/ui/button/Button";
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
      <div className="py-[25px] px-[60px] max-500:p-0">
        <div className="flex flex-col items-center">
          <RenderIcon type={type} />
          <p className="mt-4 mb-10 text-lg font-bold text-center text-gray5">
            {message}
          </p>
          {onConfirm ? (
            <div className="flex gap-4">
              <Button onClick={handleConfirm} text="예" />
              <Button onClick={() => closeModal("alertModal")} text="아니오" />
            </div>
          ) : (
            <Button
              onClick={() => closeModal("alertModal")}
              text={confirmText}
            />
          )}
        </div>
      </div>
    </ModalLayout>
  );
};
