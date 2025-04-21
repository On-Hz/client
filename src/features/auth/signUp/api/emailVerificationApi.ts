import { axiosInstance } from "@/shared/api/axiosInstance";

export const emailVerification = async (email: string): Promise<{ message: string } | { error: string }> => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/email-verification", { email });
      return { message: response.data.message }; 
    } catch (error: any) {
      return { error: error.message};  
    }
  };
  