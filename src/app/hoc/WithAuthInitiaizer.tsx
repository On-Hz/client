import React, { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { useAuthStore, useModalStore } from "@/shared/stores";
import {
  getAuthUser,
  getAuthToken,
  getAuthRefreshToken,
  getDeviceId,
} from "@/shared/stores/authCookie";
import {
  refreshAccessToken,
  authChannel,
  performLogout,
  performLogin,
} from "@/shared/helpers";

export const WithAuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [removeAuth, sessionExpired, isInitialized] =
    useStoreWithEqualityFn(
      useAuthStore,
      (s) => [
        s.removeAuth,
        s.sessionExpired,
        s.isInitialized,
      ],
      shallow
    );
  const { openModal } = useStoreWithEqualityFn(
    useModalStore,
    (m) => ({ openModal: m.openModal }),
    shallow
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    const token = getAuthToken();
    const refreshToken = getAuthRefreshToken();
    const deviceId = getDeviceId();
    if (token && refreshToken && deviceId) {
      performLogin(queryClient, { accessToken: token, refreshToken, deviceId });
    } else if (refreshToken) {
      (async () => {
        await refreshAccessToken();
      })();
    }
  }, [isInitialized, queryClient]);

  const prevExpiredRef = useRef(sessionExpired);
  useEffect(() => {
    if (!prevExpiredRef.current && sessionExpired) {
      openModal("alertModal", {
        type: "info",
        message: "세션이 만료되어 자동으로 로그아웃되었습니다.",
      });
      performLogout(queryClient);
    }
    prevExpiredRef.current = sessionExpired;
  }, [sessionExpired, openModal, queryClient]);

  useEffect(() => {
    const handler = (ev: MessageEvent<{ type: string }>) => {
      if (ev.data.type === "LOGIN" && !isInitialized) {
        const token = getAuthToken();
        const refreshToken = getAuthRefreshToken();
        const deviceId = getDeviceId();
        const user = getAuthUser();
        if (token && refreshToken && deviceId && user) {
          performLogin(queryClient, {
            accessToken: token,
            refreshToken,
            deviceId,
            user,
          });
        }
      } else if (ev.data.type === "LOGOUT") {
        openModal("alertModal", {
          type: "info",
          message: "다른 탭에서 로그아웃되었습니다.",
        });
        performLogout(queryClient);
      }
    };
    authChannel.addEventListener("message", handler);
    return () => {
      authChannel.removeEventListener("message", handler);
    };
  }, [removeAuth, openModal, isInitialized, queryClient]);

  return <>{children}</>;
};
