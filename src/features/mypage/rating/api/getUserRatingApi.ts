import { axiosInstance } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getUserRating = async (userId: string) => {
  const url = `/api/v1/users/${userId}/ratings`;
  const response = await axiosInstance.get(url);
  console.log('getUserRating',response.data);
  return response.data;
};

export const useUserRating = (userId: string) => {
  return useQuery({
    queryKey: ["user_ratings"],
    queryFn: () => getUserRating(userId), 
    enabled: !!userId,
  });
};