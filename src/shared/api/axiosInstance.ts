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
type QueueCb = (token: string | null, error?: any) => void;
let refreshQueue: QueueCb[] = [];

const addToQueue = (cb: QueueCb) => {
  refreshQueue.push(cb);
};

const processQueue = (token: string | null, error?: any) => {
  refreshQueue.forEach(cb => cb(token, error));
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
    const origReq = error.config as any;
    if (error.response?.status === 401 && !origReq._retry) {
      origReq._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addToQueue((token, err) => {
            if (err) return reject(err);
            origReq.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(origReq));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(newToken, null);
        origReq.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(origReq);
      } catch (err) {
        processQueue(null, err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    const message = (error.response?.data as any)?.message || error.message || "알 수 없는 오류입니다.";
    return Promise.reject({ ...error.response?.data,message });
  }
);