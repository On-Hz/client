import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosError,
} from "axios";
import { getDeviceId } from "../stores/authCookie";
import { ensureAuthToken } from "../helpers/ensureAuthToken";
import { useAuthStore } from "../stores";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// --------------------- 요청 인터셉터 ---------------------
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // 인증 로직
      const token = await ensureAuthToken();
      // 헤더 셋팅
      const headers = config.headers instanceof AxiosHeaders
        ? config.headers
        : new AxiosHeaders(config.headers);
      headers.set("Accept", "application/json");
      if (!(config.data instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      const deviceId = getDeviceId();
      if (deviceId) {
        headers.set("Device-Id", deviceId);
      }
      config.headers = headers;
      return config;
    } catch (err) {
      useAuthStore.getState().setSessionExpired(true);
      return Promise.reject(err);
    }
  },
  (error: AxiosError) => Promise.reject(error)
);

// ---------------------- 응답 인터셉터 + 토큰 재발급 ----------------------
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.data !== undefined) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    const message = (error.response?.data as any)?.message || error.message || "알 수 없는 오류입니다.";
    return Promise.reject({ ...(error.response?.data || {}), message });
  }
);