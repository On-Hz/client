import axios from "axios";

export const requestRefreshToken = async (refreshToken: string, deviceId: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`, {
      refreshToken,
      deviceId,
    }, {
      withCredentials: true,
    });
  
    return res.data;
};
  