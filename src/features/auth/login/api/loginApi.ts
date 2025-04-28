import { axiosInstance } from "@/shared/api/axiosInstance";
import { AuthResponse, AuthResult } from "../../model/types";

export const login = async (email: string, password: string): Promise<AuthResult> => {
  try {
      const response = await axiosInstance.post<AuthResponse>("/api/v1/auth/login",
        { email, password }
      );
      return response.data;
  } catch (error: any) {
      return { error: error.message }; //서버 메세지
  }
};