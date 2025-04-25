import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, useModalStore } from "@/shared/stores";
import { deleteUserAccount } from "../api/deleteUserAccountApi";
import { performLogout } from "@/shared/helpers";

export const useDeleteUserAccount = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalStore();

  return useMutation({
    mutationFn: () => deleteUserAccount(user!.id),
    onSuccess: () => {
      performLogout(queryClient);
      openModal("alertModal", {
        type: "success",
        message: "회원 탈퇴가 완료되었습니다.",
        closeCallback: () => {
          closeModal("profileModal");
        },
      });
    },
    onError: (error: any) => {
      openModal("alertModal", {
        type: "error",
        message: error.message || "회원 탈퇴 중 문제가 발생했습니다.",
      });
    },
  });
};
