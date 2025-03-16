import { axiosInstance } from "@/shared/api/axiosInstance";
import { LoginResponse, LoginResult } from "../model/types";

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
      const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", { email, password });
      return response.data; // 정상 응답 (LoginResponse 타입 반환)
  } catch (error: any) {
      console.error("❌ API 요청 실패:", error.response?.data?.message || "로그인 실패");

      // ✅ `throw`를 사용하지 않고, `error` 객체를 반환하도록 변경
      return { error: error.response?.data?.message || "로그인에 실패했습니다." };
  }
};