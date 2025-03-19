import { Cookies } from "react-cookie";
import { User } from "../model";

const cookies = new Cookies();
const isSecure = window.location.protocol === "https:";

export const getAuthToken = (): string | null => cookies.get("token") || null;

export const getAuthUser = (): User | null => {
  const userCookie = cookies.get("user");
  if (typeof userCookie === "string") {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error("Invalid user cookie. Removing it.", error);
      removeAuthUser();
      return null;
    }
  }
  return null;
};

export const setAuth = (token: string | null, user: User | null) => {
  if (token && user) {
    cookies.set("token", token, { path: "/", maxAge: 3600, sameSite: "lax", secure: isSecure });
    cookies.set("user", JSON.stringify(user), { path: "/", maxAge: 3600, sameSite: "lax", secure: isSecure });
  } else {
    removeAuth();
  }
};

export const removeAuth = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("user", { path: "/" });
};

export const removeAuthUser = () => cookies.remove("user", { path: "/" });
