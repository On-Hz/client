import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { CodeType } from "@/shared/constants";

export const getCommonCode = async <T>(codeType: CodeType): Promise<T> => {
  const endpoint = `/api/v1/common/code/${codeType}`;
  const response = await axiosInstance.get<T>(endpoint);
  return response.data;
};

export const useCommonCode = <T>(codeType: CodeType) => {
  return useQuery({
    queryKey: [`code_${codeType}`],
    queryFn: () => getCommonCode<T>(codeType),
    enabled: !!codeType,
  });
};
