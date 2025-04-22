import { QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { useModalStore, useAuthStore } from "@/shared/stores";
import { isReviewQuery } from "@/shared/helpers";
import { User } from "@/shared/model";

/**
 * @param queryClient  React‑Query 클라이언트 인스턴스
 * @param keepModals   로그아웃 후에도 닫지 않을 모달 이름 배열
 */
export async function performLogout(
  queryClient: QueryClient,
  keepModals: string[] = ["alertModal", "authInfoModal"]
) {
  if (useAuthStore.getState()?.user?.social) {
    await axiosInstance
      .post("/api/v1/auth/logout", null, { withCredentials: true })
      .catch((error: any) => console.warn("서버 로그아웃 실패:", error));
  }
  useAuthStore.getState().removeAuth();
  useModalStore.getState().closeAllExcept(keepModals);

  invalidateSpecificQueries(queryClient);
}

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
  user?: User;
}

export function performLogin(queryClient: QueryClient, payload: AuthPayload) {
  const { accessToken, refreshToken, deviceId, user } = payload;
  const authStore = useAuthStore.getState();
  authStore.setAuth(accessToken, refreshToken, deviceId);

  if (user) {
    authStore.setUserProfile(user);
  }

  invalidateSpecificQueries(queryClient);
}

function invalidateSpecificQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    predicate: (query) => {
      const key0 = query.queryKey[0];
      return (
        isReviewQuery(query) ||
        (typeof key0 === "string" && key0.startsWith("ratingInfo_"))
      );
    },
    refetchType: "all",
  });
}
