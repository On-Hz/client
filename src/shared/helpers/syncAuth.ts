import { User } from "../model";
import { useAuthStore } from "../stores";
import { setAuth } from "../stores/authCookie";

export const syncAuth = (
    accessToken: string,
    refreshToken: string,
    user: User,
    deviceId: string
  ) => {
    setAuth(accessToken, refreshToken, user, deviceId);
    useAuthStore.getState().setAuth(accessToken, refreshToken, user, deviceId);
  };
  