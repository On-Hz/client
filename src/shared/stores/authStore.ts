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
  setUserCookie,
} from "./authCookie";
import { refreshAccessToken } from "../helpers";
import { axiosInstance } from "../api";
interface JwtPayload {
  exp: number;
}
export interface AuthState {
  token: string | null;
  user: User | null;
  deviceId: string | null;
  isInitialized: boolean;
  sessionExpired: boolean;
  setSessionExpired: (v: boolean) => void;
  setAuth: (
    token: string | null,
    deviceId: string
  ) => void;
  setUserProfile: (user: User) => void;
  removeAuth: () => void;
}

let accessRefreshTimer: number | null = null;

function clearAllTimers() {
  if (accessRefreshTimer !== null) {
    clearTimeout(accessRefreshTimer);
    accessRefreshTimer = null;
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


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: getAuthToken(),
      user: getAuthUser(),
      deviceId: getDeviceId(),
      isInitialized: !!getAuthToken(),
      sessionExpired: false,
      setSessionExpired: (v) => set({ sessionExpired: v }),
      setAuth: (token, deviceId) => {
        set({ token, deviceId, isInitialized: true });
        setAuthCookie(token, deviceId);

        clearAllTimers();

        scheduleAccessRefresh(token!);
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
