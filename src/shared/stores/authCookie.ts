import { Cookies } from "react-cookie";
import { User } from "../model";

const cookies = new Cookies();
const isSecure = window.location.protocol === "https:"; //개발환경 false

export const getAuthToken = (): string | null => cookies.get("token") || null;
export const getAuthRefreshToken = (): string | null => cookies.get("refresh-token") || null;
export const getDeviceId = (): string | null => cookies.get("device-id") || null;
export const getAuthUser = (): User | null => {
  const userCookie = cookies.get("user");
  // console.log("user 쿠키:", userCookie);
  if (typeof userCookie === "string") {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error("Invalid user cookie. Removing it.", error);
      removeAuthUser();
    }
  }
  if (typeof userCookie === "object") {
    return userCookie as User;
  }
  return null;
};
export const setAuth = (
  token: string | null, 
  refreshToken:string | null, 
  user: User | null, 
  deviceId:string
) => {
  if (token && refreshToken && user) {
    cookies.set("token", token, { path: "/", maxAge: 3600, sameSite: "lax", secure: isSecure });
    cookies.set("refresh-token", refreshToken, { path: "/", maxAge: 14 * 24 * 3600, sameSite: "lax", secure: isSecure });
    cookies.set("user", JSON.stringify(user), { path: "/", maxAge: 3600, sameSite: "lax", secure: isSecure });

    if (deviceId) {
      cookies.set("device-id", deviceId, { path: "/", maxAge: 3600, sameSite: "lax", secure: isSecure });
    }
  } else {
    removeAuth();
  }
};

export const removeAuth = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("refresh-token", { path: "/" });
  cookies.remove("user", { path: "/" });
  cookies.remove("device-id", { path: "/" });
};

export const removeAuthUser = () => cookies.remove("user", { path: "/" });
