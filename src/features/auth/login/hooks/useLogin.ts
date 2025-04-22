import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useAuthModalStore } from "@/shared/stores";
import { authChannel, performLogin } from "@/shared/helpers";
import { login } from "../api/loginApi";
import { AuthResult } from "../../model/types";

interface LoginVariables {
  email: string;
  password: string;
}

export const useLogin = (queryClient:QueryClient) => {
  const { closeAuthModal } = useAuthModalStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<AuthResult, Error, LoginVariables>({
    mutationFn: async ({ email, password }) => await login(email, password),
    onSuccess: (data) => {
      if ("error" in data) {
        setErrorMessage(data.error);
        return;
      }
      performLogin(queryClient, data);
      authChannel.postMessage({ type: "LOGIN" });
      closeAuthModal();
    },
    onError: (error) => {
      setErrorMessage(error.message); //서버 에러메세지
    },
  });

  return { ...mutation, errorMessage }; //errorMessage를 반환하도록 추가
};
