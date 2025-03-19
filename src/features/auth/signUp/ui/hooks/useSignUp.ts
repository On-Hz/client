import { useAuthModalStore } from "@/shared/stores/authModalStore"; 
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { signUp } from "../api/singUp";

interface SignupVariables {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export const useSignUp = () => {
  const { openAuthModal } = useAuthModalStore();
  const { openModal } = useModalStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<void, Error, SignupVariables>({
    mutationFn: async ({ name, email, password, termsAccepted }) => {
        if (!termsAccepted) {
            throw new Error("약관에 동의해야 가입이 가능합니다.");
        }
        await signUp(name, email, password);
    },
    onSuccess: () => {
      openAuthModal("login");
      openModal("alertModal", {
        type: "success",
        message: "On-Hz 오신 것을 환영합니다!"
        });
    },
    onError: (error) => {
      console.error("useSignUp:", error.message);
      setErrorMessage(error.message || "회원가입에 실패했습니다.");
    },
  });

  return { ...mutation, errorMessage };
};
