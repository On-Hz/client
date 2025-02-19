import React from "react";
import { useModalStore } from "@/shared/stores";
import ModalLayout from "../modalLayout";


export const ProfileModal: React.FC = () => {
  const { modals, closeModal } = useModalStore();

    return (
      <ModalLayout
          open={modals["profileModal"] || false}
          onClose={() => closeModal("profileModal")}
          showCloseButton={false}
        >
        dd
        </ModalLayout>
    )
}