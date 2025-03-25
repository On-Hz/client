import { axiosInstance } from "@/shared/api";

export const uploadUserProfileImage = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      await axiosInstance.post("/api/v1/users/profile-image", formData); 
    } catch (error: any) {
      console.error("프로필 이미지 업로드 실패:", error);
      throw new Error(error?.response?.data?.message || "이미지 업로드 중 문제가 발생했습니다.");
    }
  };
  