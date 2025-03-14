import { create } from "zustand";
import { Cookies } from "react-cookie";
import { devtools } from "zustand/middleware";

const cookies = new Cookies();

export interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token: cookies.get("token") || null,
    setToken: (token: string | null) => {
      set({ token });
      if (token) {
        cookies.set("token", token, { path: "/", maxAge: 3600 });
      } else {
        cookies.remove("token", { path: "/" });
      }
    },
    removeToken: () => {
      set({ token: null });
      cookies.remove("token", { path: "/" });
    },
  }))
);
(window as any).authStore = useAuthStore;
