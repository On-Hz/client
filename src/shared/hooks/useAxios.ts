/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axiosInstance from "@/shared/api/axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useErrorHandler } from "react-error-boundary";

export interface UseAxiosHook {
  <T = unknown>(url: string, config?: AxiosRequestConfig): {
    data: T | null;
    loading: boolean;
  };
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): { data: T | null; loading: boolean };
  post<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): { data: T | null; loading: boolean };
  put<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): { data: T | null; loading: boolean };
  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): { data: T | null; loading: boolean };
}

function useAxios<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .request<T, AxiosResponse<T>>({
        url,
        ...config,
      })
      .then((response) => {
        if (isMounted) {
          setData(response.data);
        }
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, config, handleError]);

  return { data, loading };
}

// 타입 단언을 사용하여 useAxios를 확장합니다.
const useAxiosWrapper = useAxios as unknown as UseAxiosHook;

useAxiosWrapper.get = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return useAxios<T>(url, { ...config, method: "GET" });
};

useAxiosWrapper.post = <T = unknown>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return useAxios<T>(url, { ...config, method: "POST", data });
};

useAxiosWrapper.put = <T = unknown>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return useAxios<T>(url, { ...config, method: "PUT", data });
};

useAxiosWrapper.delete = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return useAxios<T>(url, { ...config, method: "DELETE" });
};

export default useAxiosWrapper;

// GET 요청
// const { data, loading } = useAxios.get("/endpoint");

// POST 요청
// const { data, loading } = useAxios.post("/endpoint", { key: "value" });
