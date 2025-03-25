import { useAuthStore } from "@/shared/stores";
import { useQuery } from "@tanstack/react-query";

export const useUserInfoQuery = () => {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => user,
    enabled: isInitialized,
    staleTime: Infinity,
  });
};
