import { QueryClient } from "@tanstack/react-query";
import { useModalStore, useAuthStore } from "@/shared/stores";
import { isReviewQuery } from "@/shared/helpers";
import { User } from "@/shared/model";

/**
 * @param queryClient  React‑Query 클라이언트 인스턴스
 * @param keepModals   로그아웃 후에도 닫지 않을 모달 이름 배열
 */
export function performLogout(
  queryClient: QueryClient,
  type: "logout" | "removeAuth" = "logout",
  keepModals: string[] = ["alertModal", "authInfoModal"]
) {
  if (type === "logout") {
    useAuthStore.getState().logout();
  } else if (type === "removeAuth") {
    useAuthStore.getState().removeAuth();
  }
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
