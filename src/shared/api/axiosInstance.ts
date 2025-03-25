import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getAuthToken, getDeviceId } from "../stores/authCookie";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAuthToken();
  const deviceId = getDeviceId();
  const headers =
    request.headers instanceof AxiosHeaders
      ? request.headers
      : new AxiosHeaders(request.headers);
  headers.set("Accept", "application/json");
  // headers.set("Content-Type", "application/json");
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

  // console.log("Request Headers:", request.headers);
  // console.log("token:", token);
  // console.log("Device-Id:", deviceId);

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

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.data !== undefined) {
      return response.data;
    }
    // 그렇지 않으면 전체 응답 데이터를 반환
    return response;
  },
  (error: AxiosError) => {
    const data = error.response?.data as { message?: string };
    const message =
      data?.message ?? error.message ?? "예기치 않은 오류가 발생했습니다.";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);
