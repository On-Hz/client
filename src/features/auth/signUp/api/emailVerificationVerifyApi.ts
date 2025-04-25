import { axiosInstance } from "@/shared/api/axiosInstance";

export const emailVerificationVerify = async (
  email: string,
  code: string
): Promise<{ success: boolean; message: string } | { error: string }> => {
  try {
    const response = await axiosInstance.post( "/api/v1/auth/email-verification/verify", { email, code });
    return response.data
  } catch (error: any) {
    return { error: error.message};  
  }
};
