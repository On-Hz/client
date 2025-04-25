import { Cookies } from "react-cookie";
import { User } from "../model";

const cookies = new Cookies();
const isSecure = window.location.protocol === "https:"; //개발환경 false

export const getAuthToken = (): string | null => cookies.get("token") || null;
export const getDeviceId = (): string | null =>
  cookies.get("device-id") || null;
export const getAuthUser = (): User | null => {
  const userCookie = cookies.get("user");

  if (typeof userCookie === "object") {
    return userCookie as User;
  }
  if (typeof userCookie === "string") {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error("Invalid user cookie. Removing it.", error);
      removeAuthUserCookie();
    }
  }

  return null;
};

export const setAuthCookie = (token: string | null, deviceId: string) => {
  if (token && deviceId) {
    cookies.set("token", token, {
      path: "/",
      maxAge: 3600,
      sameSite: "lax",
      secure: isSecure,
    });
    cookies.set("device-id", deviceId, {
      path: "/",
      maxAge: 3600,
      sameSite: "lax",
      secure: isSecure,
    });
  } else {
    removeAuthCookie();
  }
};

export const setUserCookie = (user: User | null) => {
  if (user) {
    cookies.set("user", JSON.stringify(user), {
      path: "/",
      maxAge: 3600,
      sameSite: "lax",
      secure: isSecure,
    });
  } else {
    removeAuthUserCookie();
  }
};

export const removeAuthCookie = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("device-id", { path: "/" });
  removeAuthUserCookie();
};

export const removeAuthUserCookie = () => cookies.remove("user", { path: "/" });
