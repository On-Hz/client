import { useAuthStore, useModalStore } from "@/shared/stores";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileParams } from "../model/types";
import { updateUserProfile } from "../api/updateUserProfileApi";

export const useUpdateProfile = () => {
    const { user, token, deviceId, setAuth } = useAuthStore();
    const { openModal, closeModal } = useModalStore();
    
    const mutation = useMutation<void, Error, UpdateProfileParams>({
      mutationFn: updateUserProfile,
      onSuccess: (data, variables) => {
        //닉네임 변경된 경우
        if (user && variables.user_name && variables.user_name !== user.userName) {
          setAuth(token, { ...user, userName: variables.user_name }, deviceId || "");
        }

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
  