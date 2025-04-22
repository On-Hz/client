import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
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
import { refreshAccessToken } from "../helpers";
import { axiosInstance } from "../api";
interface JwtPayload {
  exp: number;
}
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  deviceId: string | null;
  isInitialized: boolean;
  sessionExpired: boolean;
  setSessionExpired: (v: boolean) => void;
  setAuth: (
    token: string | null,
    refreshToken: string | null,
    deviceId: string
  ) => void;
  setUserProfile: (user: User) => void;
  removeAuth: () => void;
}

let accessRefreshTimer: number | null = null;
let refreshExpireTimer: number | null = null;

function clearAllTimers() {
  if (accessRefreshTimer !== null) {
    clearTimeout(accessRefreshTimer);
    accessRefreshTimer = null;
  }
  if (refreshExpireTimer !== null) {
    clearTimeout(refreshExpireTimer);
    refreshExpireTimer = null;
  }
}

/** 액세스 토큰 만료 1분 전에 silent refresh 예약 */
export function scheduleAccessRefresh(accessToken: string) {
  const { exp } = jwtDecode<JwtPayload>(accessToken);
  const expiresAt = exp * 1000;
  const msBefore = expiresAt - Date.now() - 60_000;
  if (msBefore > 0 && !useAuthStore.getState().sessionExpired) {
    accessRefreshTimer = window.setTimeout(async () => {
      await refreshAccessToken();
    }, msBefore);
  }
}

/** 리프레시 토큰 만료 시점에 세션 만료 플래그 예약 */
export function scheduleRefreshExpire(refreshToken: string) {
  const { exp } = jwtDecode<JwtPayload>(refreshToken);
  const expiresAt = exp * 1000;
  const msLeft = expiresAt - Date.now();
  if (msLeft > 0) {
    refreshExpireTimer = window.setTimeout(() => {
      useAuthStore.getState().setSessionExpired(true);
    }, msLeft);
  } else {
    useAuthStore.getState().setSessionExpired(true);
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: getAuthToken(),
      refreshToken: getAuthRefreshToken(),
      user: getAuthUser(),
      deviceId: getDeviceId(),
      isInitialized: !!getAuthToken(),
      sessionExpired: false,
      setSessionExpired: (v) => set({ sessionExpired: v }),
      setAuth: (token, refreshToken, deviceId) => {
        set({ token, refreshToken, deviceId, isInitialized: true });
        setAuthCookie(token, refreshToken, deviceId);

        clearAllTimers();

        scheduleAccessRefresh(token!);
        scheduleRefreshExpire(refreshToken!);
      },
      setUserProfile: (user) => {
        set({ user });
        setUserCookie(user);
      },
      removeAuth: () => {
        delete axiosInstance.defaults.headers.common["Authorization"];
        removeAuthCookie();
        clearAllTimers();
        set({
          token: null,
          refreshToken: null,
          user: null,
          deviceId: null,
          isInitialized: false,
          sessionExpired: false,
        });
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
