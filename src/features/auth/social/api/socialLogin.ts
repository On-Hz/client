import { useAuthModalStore, useModalStore } from "@/shared/stores";
import { authChannel, performLogin } from "@/shared/helpers";
import { QueryClient } from "@tanstack/react-query";

export const socialLogin = (
  provider: "naver" | "kakao" | "google",
  queryClient: QueryClient) => {
  const width = 600;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
  const popup = window.open(
    authUrl,
    `${provider} Login`,
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );

  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    return;
  }

  const receiveMessage = (event: MessageEvent) => {
    const raw = import.meta.env.VITE_ALLOWED_ORIGINS || "";
    const allowedOrigins = raw.split(",").map((s: any) => s.trim());
    if (!allowedOrigins.includes(event.origin)) return;

    const { type, accessToken, user, error } = event.data;

    if (type === "oauth2Success") {
      if (!accessToken || !user) return;

      performLogin(queryClient, event.data);
      authChannel.postMessage({ type: "LOGIN" });
      useAuthModalStore.getState().closeAuthModal();
      useModalStore.getState().openModal("alertModal", {
        type: "success",
        message: "On-Hz 오신 것을 환영합니다!",
      });
    }

    if (type === "oauth2Error") {
      useModalStore.getState().openModal("alertModal", {
        type: "info",
        message: error.message,
      });
    }

    window.removeEventListener("message", receiveMessage);
  };

  window.addEventListener("message", receiveMessage);
};
