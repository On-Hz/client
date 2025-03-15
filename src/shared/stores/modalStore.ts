import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  modalData: Record<string, any>; // 항상 초기화된 객체로 존재함
  openModal: (modalName: string, data?: any) => void;
  closeModal: (modalName: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},
  modalData: {},
  openModal: (modalName, data) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
      modalData: { ...state.modalData, [modalName]: data },
    })),
  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
      modalData: { ...state.modalData, [modalName]: undefined },
    })),
}));
(window as any).modalStore = useModalStore;