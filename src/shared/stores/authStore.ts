import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../model";
import { getAuthToken, getAuthUser, setAuth, removeAuth } from "./authCookie";

export interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string | null, user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: getAuthToken(),
      user: getAuthUser(),

      setAuth: (token, user) => {
        set({ token, user });
        setAuth(token, user);
      },

      logout: () => {
        set({ token: null, user: null });
        removeAuth();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }), //`user` 정보만 저장
    }
  )
);

(window as any).authStore = useAuthStore;
