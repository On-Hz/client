import { LoginResponse } from "@/features/auth/login/model/types";
import { axiosInstance } from "@/shared/api/axiosInstance";


export const signUp = async (userName: string, email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/signup", {
            userName,
            email,
            password,
        });
        return response.data; //JWT 토큰 반환
    } catch (error: any) {
        console.error("회원가입:", error.response?.data?.message || "회원가입에 실패했습니다.");
        return Promise.reject(new Error(error.response?.data?.message || "회원가입에 실패했습니다."));
    }
};
