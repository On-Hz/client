import { useMutation } from "@tanstack/react-query";
import { useAuthStore, useModalStore } from "@/shared/stores";
import { deleteUserAccount } from "../api/deleteUserAccountApi";

export const useDeleteUserAccount = () => {
  const { user, logout } = useAuthStore();
  const { openModal } = useModalStore();


  return useMutation({
    mutationFn: () => deleteUserAccount(user!.id),
    onSuccess: () => {
      logout();
      openModal("alertModal", {
        type: "success",
        message: "회원 탈퇴가 완료되었습니다.",
      });
    },
    onError: (error: any) => {
      openModal("alertModal", {
        type: "error",
        message: error.message || "회원 탈퇴 중 문제가 발생했습니다.",
      });
    }
  });
};
