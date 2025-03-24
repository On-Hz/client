import { useAuthStore, useModalStore } from "@/shared/stores";
import { modalRegistry } from "@/shared/ui/modal/config/modalRegistry";

// 토큰 상태와 모달 오픈 함수를 직접 가져와서 처리하는 방식
export const openModalWithAuthCheck = (modalName: string, data?: any) => {
  const token = useAuthStore.getState().token;
  const openModal = useModalStore.getState().openModal;
  const modalDef = modalRegistry[modalName];

  if (!modalDef) return;

  // authCheck 플래그가 true이고 토큰이 없다면 authCheckModal 열기
  if (modalDef.authCheck && !token) {
    openModal("authInfoModal");
  } else {
    openModal(modalName, data);
  }
};
