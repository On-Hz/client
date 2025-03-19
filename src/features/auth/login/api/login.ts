import { axiosInstance } from "@/shared/api/axiosInstance";
import { LoginResponse, LoginResult } from "../model/types";

export const login = async (email: string, password: string): Promise<LoginResult> => {
  try {
      const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", { email, password });
      return response.data;
  } catch (error: any) {
      console.error("login 실패:", error.message);

      return { error: error.message }; //서버 메세지
  }
};