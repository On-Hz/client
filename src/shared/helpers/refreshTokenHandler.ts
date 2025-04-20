import { requestRefreshToken } from "@/shared/api/refreshTokenApi";
import { getAuthRefreshToken, getDeviceId } from "../stores/authCookie";
import { useAuthStore } from "../stores";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getAuthRefreshToken();
  const deviceId = getDeviceId();

  if (!refreshToken || !deviceId) return null;

  try {
    const res = await requestRefreshToken(refreshToken, deviceId);
    const {
      accessToken: newToken,
      refreshToken: newRefreshToken,
      deviceId: newDeviceId,
    } = res;
    useAuthStore.getState().setAuth(newToken, newRefreshToken, newDeviceId)

    return newToken;

  } catch (err) {
    console.error('err 실패',err);
    useAuthStore.getState().logout();
    return null;
  }
};
