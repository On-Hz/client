import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosError,
} from "axios";
import { getDeviceId } from "../stores/authCookie";
import { refreshAccessToken } from "../helpers/refreshTokenHandler";
import { ensureAuthToken } from "../helpers/ensureAuthToken";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// --------------------- 요청 인터셉터 ---------------------
const requestHandler = async (
  request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = await ensureAuthToken(); // 여기서 토큰 여부
  const deviceId = getDeviceId();

  const headers =
    request.headers instanceof AxiosHeaders
      ? request.headers
      : new AxiosHeaders(request.headers);

  headers.set("Accept", "application/json");
  if (!(request.data instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (deviceId) {
    headers.set("Device-Id", deviceId);
  }

  request.headers = headers;
  return request;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => requestHandler(config),
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message || error.message;
    console.error(message);
    return Promise.reject(error);
  }
);

// ---------------------- 응답 인터셉터 + 토큰 재발급 ----------------------
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const addToQueue = (cb: (token: string) => void) => {
  refreshQueue.push(cb);
};

const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.data !== undefined) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    console.log("🔴 status:", error.response?.status);
    console.log("🔴 error.response.data:", error.response?.data);
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addToQueue((newToken: string) => {
            if (originalRequest.headers instanceof AxiosHeaders) {
              originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
            }
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      const newToken = await refreshAccessToken();
      
      if (newToken) {
        processQueue(newToken);

        if (originalRequest.headers instanceof AxiosHeaders) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        }

        return axiosInstance(originalRequest);
      }else {
        return Promise.reject("토큰 갱신 실패");
      }
    }
    const message = (error.response?.data as any)?.message || error.message || "알 수 없는 오류입니다.";
    return Promise.reject({ message });
  }
);