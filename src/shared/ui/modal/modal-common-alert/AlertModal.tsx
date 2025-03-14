import React from "react";
import { ModalLayout } from "../ModalLayout";
import { useModalStore } from "@/shared/stores/modalStore";
import { ALERT_TYPES, AlertType } from "@/shared/constants/alertTypes";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

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

  if (!data) return null;

  const { type, message, confirmText = "확인", onConfirm } = data;

  const renderIcon = () => {
    switch (type) {
      case ALERT_TYPES.SUCCESS:
        return <AiOutlineCheckCircle size={50} className="text-point" />;
      case ALERT_TYPES.ERROR:
        return <AiOutlineCloseCircle size={50} className="text-red-500" />;
      case ALERT_TYPES.WARNING:
        return (
          <AiOutlineExclamationCircle size={50} className="text-yellow-500" />
        );
      case ALERT_TYPES.INFO:
      default:
        return <AiOutlineInfoCircle size={50} className="text-green-500" />;
    }
  };

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
          {renderIcon()}
          <p className="mb-10 text-lg font-bold text-center text-gray5">{message}</p>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 mt-6 text-white transition-colors bg-black rounded hover:bg-point"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};
