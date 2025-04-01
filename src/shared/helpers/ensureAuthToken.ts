import { getAuthToken } from "@/shared/stores/authCookie";
import { refreshAccessToken } from "./refreshTokenHandler";

let isEnsuring = false;
let tokenQueue: ((token: string | null) => void)[] = [];

export const ensureAuthToken = async (): Promise<string | null> => {
  const existingToken = getAuthToken();
  if (existingToken) return existingToken;

  return new Promise((resolve, reject) => {
    // 이미 토큰 재발급 중이면 큐에 추가
    if (isEnsuring) {
      tokenQueue.push(resolve);
      return;
    }

    isEnsuring = true;

    (async () => {
      try {
        const newToken = await refreshAccessToken(); // 내부에서 쿠키 & zustand 갱신

        tokenQueue.forEach((cb) => cb(newToken));
        tokenQueue = [];

        resolve(newToken || null);
      } catch (err) {
        tokenQueue.forEach((cb) => cb(null));
        tokenQueue = [];
        reject(err);
      } finally {
        isEnsuring = false;
      }
    })();
  });
};
