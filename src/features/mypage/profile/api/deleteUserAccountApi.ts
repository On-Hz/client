import { axiosInstance } from "@/shared/api";

export const deleteUserAccount = async (userId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/users/${userId}`);
  } catch (error: any) {
    console.error("회원 탈퇴 실패:", error);
    throw new Error(error?.error.message || "회원 탈퇴 중 문제가 발생했습니다.");
  }
};
