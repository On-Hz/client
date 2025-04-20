import { useAuthStore } from "../stores";
import { setAuthCookie } from "../stores/authCookie";

export const syncAuth = (
    accessToken: string,
    refreshToken: string,
    deviceId: string
  ) => {
    setAuthCookie(accessToken, refreshToken, deviceId);
    useAuthStore.getState().setAuth(accessToken, refreshToken, deviceId);
  };
  