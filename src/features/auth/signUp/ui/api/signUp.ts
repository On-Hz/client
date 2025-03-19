import { LoginResponse, LoginResult } from "@/features/auth/login/model/types";
import { axiosInstance } from "@/shared/api/axiosInstance";

export const signUp = async (userName: string, email: string, password: string): Promise<LoginResult> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/signup", {
            userName,
            email,
            password,
        });
        return response.data; //JWT 토큰 반환
    } catch (error: any) {
        // console.log('signUp 에러:'+error.message)
        return { error: error.message};  //서버 메세지
    }
};
