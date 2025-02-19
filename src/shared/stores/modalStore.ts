import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  // isModalOpen: boolean;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {}, // 모든 모달 상태를 초기화
  // isModalOpen: false,
  openModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: true, isModalOpen: true} })),
  closeModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: false, isModalOpen: false  } })),

}));
