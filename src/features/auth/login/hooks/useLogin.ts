import { useAuthStore } from "@/shared/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "@/shared/stores/authModalStore"; 
import { login } from "../api/login";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const { setAuth } = useAuthStore();
    const { closeAuthModal } = useAuthModalStore();
    const navigate = useNavigate();
  
    const handleLogin = async (email: string, password: string) => {
      setError(null);
      try {
        const { accessToken, user } = await login(email, password);
        setAuth(accessToken, user);
        closeAuthModal();
        navigate("/");
        console.log("로그인 성공");
        return null; // 에러가 없음
      } catch (err) {
        console.log('err',err);
        return err instanceof Error ? err.message : "로그인에 실패했습니다.";
      }
    };
  
    return { handleLogin, error };
  };