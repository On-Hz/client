import { useAuthStore, useAuthModalStore, useModalStore } from "@/shared/stores";

export const socialLogin = (provider: "naver" | "kakao" | "google") => {
  const width = 600;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${provider}`;
  console.log('소셜 authUrl :',authUrl);

  const popup = window.open(
    authUrl,
    `${provider} Login`,
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );

  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    console.log("팝업 차단?");
    return;
  }

  const receiveMessage = (event: MessageEvent) => {
    // 보안 체크: 서버 도메인도 허용 (로컬테스트를 위해 필요)
    const allowedOrigins = ["http://localhost:5173", "https://onhz.co.kr"];
    if (!allowedOrigins.includes(event.origin)) return;
    if (event.data.type !== "oauth2Success") return;

    const { accessToken, refreshToken, deviceId, user } = event.data;
    if (!accessToken || !refreshToken || !user) return;

    console.log(`${provider} 로그인 성공`, user);
    useAuthStore.getState().setAuth(accessToken, refreshToken, deviceId);
    useAuthStore.getState().setUserProfile(user);

    useAuthModalStore.getState().closeAuthModal();
    useModalStore.getState().openModal("alertModal", {
      type: "success",
      message: "On-Hz 오신 것을 환영합니다!"
    });

    window.removeEventListener("message", receiveMessage);
  };

  window.addEventListener("message", receiveMessage);
};
