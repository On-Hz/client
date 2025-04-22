import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  modalData: Record<string, any>; // 항상 초기화된 객체로 존재함
  openModal: (modalName: string, data?: any) => void;
  closeModal: (modalName: string) => void;
  closeAllExcept: (keep: string[]) => void;
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
  closeAllExcept: (keep) =>
    set((state) => {
      const nextModals = { ...state.modals };
      const nextModalData = { ...state.modalData };
      Object.keys(nextModals).forEach((name) => {
        if (!keep.includes(name)) {
          nextModals[name] = false;
          nextModalData[name] = undefined;
        }
      });
      return { modals: nextModals, modalData: nextModalData };
    }),
}));
(window as any).modalStore = useModalStore;
