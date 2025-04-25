import { axiosInstance } from "@/shared/api/axiosInstance";

export const findPassword = async (
    email: string, userName: string
): Promise<{ error: string }> => {
    // console.log("비밀번호 찾기 요청:", email, userName);
    try {
        const response = await axiosInstance.post("/api/v1/auth/forgot-password", null,
          {
            params: { email, userName }
          }
        );
  
      return response.data;
    } catch (error: any) {
        return { error: error.message }; //서버 메세지
    }
  };
  

  