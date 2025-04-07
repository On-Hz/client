import { useAuthModalStore } from "@/shared/stores/authModalStore"; 
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { AuthResult } from "@/features/auth/model/types";
import { signUp } from "../api/signUpApi";

interface SignupVariables {
  email: string;
  password: string;
}

export const useSignUp = () => {
  const { openAuthModal } = useAuthModalStore();
  const { openModal } = useModalStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<AuthResult, Error, SignupVariables>({
    mutationFn: async ({email, password }) => {
      const result = await signUp(email, password);
 
      if (result && "error" in result) { 
        //console.error("useSignUp - 에러 발생:", result.error);
        setErrorMessage(result.error); //서버 에러메세지
        return result; //에러페이지 x
      }

      return result; // 성공 시 반환
    },
    onSuccess: (data) => {
      //console.log('data',data);
      if (data && "error" in data) {
        return; // 에러가 있으면 성공 처리 안함
      }

      openAuthModal("login");
      openModal("alertModal", {
        type: "success",
        message:"On-Hz 회원가입에 성공하셨습니다."
      });
    },
    onError: (error) => {
      //console.error("useSignUp - 네트워크 에러:", error.message);
      setErrorMessage(error.message);
    },
  });

  return { ...mutation, errorMessage };
};
