import { axiosInstance } from "@/shared/api";
import { UpdateProfileParams } from "../model/types";
import { User } from "@/shared/model";

export const updateUserProfile = async (params: UpdateProfileParams): Promise<User> => {
    try {
        const response =await axiosInstance.patch("/api/v1/users/profile", params);
        return response.data;
    } catch (error: any) {
        console.error("프로필 수정 실패:", error);
        throw new Error(error?.error.message);
    }
};