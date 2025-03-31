import { useState } from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import { useAuthModalStore } from "@/shared/stores/authModalStore"; 
import { login } from "../api/loginApi";
import { AuthResult } from "../../model/types";
import { useMutation } from "@tanstack/react-query";

interface LoginVariables {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const { closeAuthModal } = useAuthModalStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<AuthResult, Error, LoginVariables>({
    mutationFn: async ({ email, password }) => await login(email, password),
    onSuccess: (data) => {
      if ("error" in data) {
       // console.warn("로그인 실패:", data.error);
        setErrorMessage(data.error);
        return;
      }

      setAuth(data.accessToken, data.user, data.deviceId);
      closeAuthModal();
    },
    onError: (error) => {
      //console.error("로그인 실패:", error.message);
      setErrorMessage(error.message); //서버 에러메세지
    },
  });

  return { ...mutation, errorMessage }; //errorMessage를 반환하도록 추가
};