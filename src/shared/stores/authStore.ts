import { create } from "zustand";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export interface AuthState {
  token: string | null;
  user: { id: number; email: string; userName: string; } | null;
  setAuth: (token: string | null, user: { id: number; email: string; userName:string; } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: cookies.get("token") || null,
  user: cookies.get("user") || null,
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