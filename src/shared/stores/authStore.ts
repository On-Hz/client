import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../model";
import { getAuthToken, getAuthUser, getDeviceId, setAuth, removeAuth, getAuthRefreshToken } from "./authCookie";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  deviceId: string | null;
  isInitialized: boolean;
  setAuth: (token: string | null, refreshToken:string | null, user: User | null, deviceId: string) => void;
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

      setAuth: (token, refreshToken, user, deviceId) => {
        set({ token, refreshToken, user, deviceId, isInitialized: true });
        setAuth(token, refreshToken, user, deviceId);
      },

      logout: () => {
        set({ token: null, refreshToken: null, user: null, deviceId: null, isInitialized: false });
        removeAuth();
        sessionStorage.removeItem("auth-storage");
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user}),
    }
  )
);

(window as any).authStore = useAuthStore;
