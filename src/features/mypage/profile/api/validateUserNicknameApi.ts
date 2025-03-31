import { axiosInstance } from "@/shared/api/axiosInstance";

export const nicknameCheck = async (userName: string): Promise<{ available: boolean } | { error: string }> => {
    try {
      const url = `/api/v1/users/exists/username/${userName}`;
      const response = await axiosInstance.get(url);
      //console.log("닉네임",response.data);
      return response.data;
    } catch (error: any) {
        return { error: error.message};
    }
};
