import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../model";
import {
  getAuthToken,
  getAuthUser,
  getDeviceId,
  setAuthCookie,
  removeAuthCookie,
  getAuthRefreshToken,
  setUserCookie,
} from "./authCookie";
import { axiosInstance } from "../api";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  deviceId: string | null;
  isInitialized: boolean;
  setAuth: (
    token: string | null,
    refreshToken: string | null,
    deviceId: string
  ) => void;
  setUserProfile: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: getAuthToken(),
      refreshToken: getAuthRefreshToken(),
      user: getAuthUser(),
      deviceId: getDeviceId(),
      isInitialized: !!getAuthToken(),
      setAuth: (token, refreshToken, deviceId) => {
        set({ token, refreshToken, deviceId, isInitialized: true });
        setAuthCookie(token, refreshToken, deviceId);
      },
      setUserProfile: (user) => {
        set({ user });
        setUserCookie(user);
      },
      logout: async () => {
        const isSocial = getAuthUser()?.social;

        if (isSocial) {
          try {
            await axiosInstance.post("/api/v1/auth/logout", null, {
              withCredentials: true,
            });
          } catch (error) {
            console.warn("서버 로그아웃 실패:", error);
          }
        }

        set({
          token: null,
          refreshToken: null,
          user: null,
          deviceId: null,
          isInitialized: false,
        });
        removeAuthCookie();
        sessionStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);

(window as any).authStore = useAuthStore;
