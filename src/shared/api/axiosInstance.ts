import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
});

const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // const authToken = store.getState().auth.user_info.apikey;
  // request.baseURL = "https://example.com/api/data";

  const headers =
    request.headers instanceof AxiosHeaders
      ? request.headers
      : new AxiosHeaders(request.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  // if (authToken) {
  //     headers.set('Authorization', authToken);
  // }
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

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message || error.message;
    console.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
