import { getAuthToken } from "@/shared/stores/authCookie";
import { refreshAccessToken } from "./refreshTokenHandler";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

let isEnsuring = false;
let tokenQueue: ((token: string | null) => void)[] = [];

export const ensureAuthToken = async (): Promise<string | null> => {
  const accessToken  = getAuthToken();

  // 액세스 토큰이 유효하면 바로 반환
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

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

        resolve(newToken!);
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
