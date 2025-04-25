import axios from "axios";

export const requestRefreshToken = async (deviceId: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`,
    null,
    {
      withCredentials: true,
      headers: {
        "Device-Id": deviceId,
      },
    }
  );

  return res.data;
};
