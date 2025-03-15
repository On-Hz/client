import React from "react";
import { useModalStore, useAuthModalStore } from "@/shared/stores";
import { modalRegistry } from "./config/modalRegistry";
import { AuthModal } from "./modal-auth/AuthModal";

export const ModalProvider: React.FC = () => {
  const modals = useModalStore((state) => state.modals);
  const modalData = useModalStore((state) => state.modalData);
  const { isModalOpen: isAuthModalOpen } = useAuthModalStore();

  return (
    <>
      {Object.entries(modals)
        .filter(([modalName, isOpen]) => isOpen && modalRegistry[modalName])
        .map(([modalName]) => {
          const Component = modalRegistry[modalName].component;
          return <Component key={modalName} data={modalData[modalName]} />;
        })}
      {isAuthModalOpen && <AuthModal />}
    </>
  );
};
