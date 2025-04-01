import { refreshAccessToken } from "@/shared/helpers/refreshTokenHandler";
import { getAuthToken } from "@/shared/stores/authCookie";


export const initAuth = async () => {
    const accessToken = getAuthToken();
  
    if (!accessToken) {
      await refreshAccessToken(); // 내부에서 조건 검사함
    }
  };