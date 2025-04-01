import { requestRefreshToken } from "@/shared/api/refreshTokenApi";
import { syncAuth } from "./syncAuth";
import { getAuthRefreshToken, getAuthUser, getDeviceId } from "../stores/authCookie";
import { useAuthStore } from "../stores";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getAuthRefreshToken();
  const deviceId = getDeviceId();
  const existingUser = getAuthUser();

  if (!refreshToken || !deviceId || !existingUser) return null;

  try {
    const res = await requestRefreshToken(refreshToken, deviceId);
    const {
      accessToken: newToken,
      refreshToken: newRefreshToken,
      deviceId: newDeviceId,
    } = res;

    syncAuth(newToken, newRefreshToken, existingUser, newDeviceId);

    return newToken;

  } catch (err) {
    console.error('err 실패',err);
    useAuthStore.getState().logout();
    return null;
  }
};
