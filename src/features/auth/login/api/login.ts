import { axiosInstance } from "@/shared/api/axiosInstance";
import { LoginResponse, LoginResult } from "../model/types";

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
      const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", { email, password });
      return response.data;
  } catch (error: any) {
      console.error("❌ API 요청 실패:", error.response?.data?.message || "로그인 실패");

      return { error: error.response?.data?.message || "로그인에 실패했습니다." };
  }
};