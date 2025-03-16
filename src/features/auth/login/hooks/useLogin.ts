import { useState } from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "@/shared/stores/authModalStore"; 
import { login } from "../api/login";
import { LoginResult } from "../model/types";
import { useMutation } from "@tanstack/react-query";

interface LoginVariables {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const { closeAuthModal } = useAuthModalStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<LoginResult, Error, LoginVariables>({
    mutationFn: async ({ email, password }) => await login(email, password),
    onSuccess: (data) => {
      if ("error" in data) {
        console.warn("로그인 실패:", data.error);
        setErrorMessage(data.error); // error 상태 업데이트
        return;
      }

      setAuth(data.accessToken, data.user);
      closeAuthModal();
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.message);
      setErrorMessage(error.message || "로그인에 실패했습니다."); //error 상태 업데이트
    },
  });

  return { ...mutation, errorMessage }; //errorMessage를 반환하도록 추가
};