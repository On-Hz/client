import React from "react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalLayoutProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  open,
  onClose,
  children,
  showCloseButton = true,
}: ModalLayoutProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] pt-[25px] pb-[40px] pl-[25px] pr-[25px] max-500:px-5">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 focus:outline-none"
          >
            <CloseIcon className="text-gray-600" />
          </button>
        )}
        {children}
      </div>
    </Modal>
  );
};
