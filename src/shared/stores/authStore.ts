import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../model";
import { getAuthToken, getAuthUser, getDeviceId, setAuth, removeAuth } from "./authCookie";

export interface AuthState {
  token: string | null;
  user: User | null;
  deviceId: string | null;
  isInitialized: boolean;
  setAuth: (token: string | null, user: User | null, deviceId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: getAuthToken(),
      user: getAuthUser(),
      deviceId: getDeviceId(),
      isInitialized: !!getAuthToken(), 

      setAuth: (token, user, deviceId) => {
        set({ token, user, deviceId, isInitialized: true });
        setAuth(token, user, deviceId);
      },

      logout: () => {
        set({ token: null, user: null, deviceId:null, isInitialized: true });
        removeAuth();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user}),
    }
  )
);

(window as any).authStore = useAuthStore;
