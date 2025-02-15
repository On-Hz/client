import { useState, useEffect } from "react";
import axiosInstance from "@/shared/api/axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useErrorHandler } from "react-error-boundary";

function useAxios<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get<T, AxiosResponse<T>>(url, options)
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
  }, [url, options, handleError]);

  return { data, loading };
}

export default useAxios;
