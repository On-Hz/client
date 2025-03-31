import { AuthResponse, AuthResult } from "@/features/auth/model/types";
import { axiosInstance } from "@/shared/api/axiosInstance";

export const signUp = async (email: string, password: string): Promise<AuthResult> => {
    try {
        const response = await axiosInstance.post<AuthResponse>("/api/v1/auth/signup", {
            email,
            password,
        });
        return response.data; //JWT 토큰 반환
    } catch (error: any) {
        // console.log('signUp 에러:'+error.message)
        return { error: error.message};  //서버 메세지
    }
};
