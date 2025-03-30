import { axiosInstance } from "@/shared/api";
import { User } from "@/shared/model";

export const uploadUserProfileImage = async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstance.post("/api/v1/users/profile-image", formData); 
      return response.data;
    } catch (error: any) {
      console.error("프로필 이미지 업로드 실패:", error);
      throw new Error(error?.response?.data?.message || "이미지 업로드 중 문제가 발생했습니다.");
    }
  };
  