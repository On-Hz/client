import { useAuthStore, useModalStore } from "@/shared/stores";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileParams } from "../model/types";
import { updateUserProfile } from "../api/updateUserProfileApi";
import { User } from "@/shared/model";

export const useUpdateProfile = () => {
    const { token, refreshToken, deviceId, setAuth } = useAuthStore();
    const { openModal, closeModal } = useModalStore();

    const mutation = useMutation<User, Error, UpdateProfileParams>({
      mutationFn: updateUserProfile,
      onSuccess: (updatedUser) => {
        setAuth(token, refreshToken, updatedUser, deviceId || "");

        closeModal("profileModal");
        openModal("alertModal", {
          type: "success",
          message: "프로필 정보가 변경되었습니다."
        });

      },
      onError: (error) => {
        console.error("프로필 수정 실패:", error.message);
      },
    });
  
    return mutation;
  };
  