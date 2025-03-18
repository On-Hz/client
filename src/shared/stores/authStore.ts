import { create } from "zustand";
import { Cookies } from "react-cookie";
import { User } from "../model/user";

const cookies = new Cookies();
export interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string | null, user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: cookies.get("token") || null,
  user: cookies.get("user") ? JSON.parse(cookies.get("user") as string) : null,

  setAuth: (token, user) => {
    set({ token, user });

    if (token && user) {
      cookies.set("token", token, { path: "/", maxAge: 3600 });
      cookies.set("user", JSON.stringify(user), { path: "/", maxAge: 3600 });
    } else {
      cookies.remove("token", { path: "/" });
      cookies.remove("user", { path: "/" });
    }
  },

  logout: () => {
    set({ token: null, user: null });
    cookies.remove("token", { path: "/" });
    cookies.remove("user", { path: "/" });
  },
}));

(window as any).authStore = useAuthStore;
