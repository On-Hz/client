import { requestRefreshToken } from "@/shared/api/refreshTokenApi";
import { getDeviceId } from "../stores/authCookie";
import { useAuthStore } from "../stores";

export const refreshAccessToken = async (): Promise<string | null> => {
  const deviceId = getDeviceId();

  if (!deviceId) return null;

  try {
    const res = await requestRefreshToken(deviceId);
    const {
      accessToken: newToken,
      deviceId: newDeviceId,
    } = res;
    useAuthStore.getState().setAuth(newToken, newDeviceId)

    return newToken;
  } catch {
    useAuthStore.getState().setSessionExpired(true);
    return null;
  }
};
