import { axiosInstance } from "@/shared/api/axiosInstance";

export const emailCheck = async (email: string): Promise<{ available: boolean } | { error: string }> => {
    try {
      const url = `/api/v1/users/exists/email/${email}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
        return { error: error.message};
    }
};
