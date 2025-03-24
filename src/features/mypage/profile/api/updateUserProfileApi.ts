import { axiosInstance } from "@/shared/api";
import { UpdateProfileParams } from "../model/types";

export const updateUserProfile = async (params: UpdateProfileParams): Promise<void> => {
    try {
        await axiosInstance.patch("/api/v1/users/profile", params); 
    } catch (error: any) {
        console.error("프로필 수정 실패:", error);
        throw new Error(error?.error.message);
    }
};
