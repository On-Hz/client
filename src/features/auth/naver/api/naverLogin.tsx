import { syncAuth } from "@/shared/helpers/syncAuth";
import { useAuthModalStore, useModalStore } from "@/shared/stores";

export const naverLogin = () => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
  
    //const loginUrl = `http://220.116.96.179:9000/oauth2/authorization/naver`;
    const naverUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`;
    console.log('naverUrl',naverUrl);

    const popup = window.open(
      naverUrl,
      "Naver Login",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      console.log("팝업 차단 확인해보기");
      return;
    }
  
    const receiveMessage = (event: MessageEvent) => {
      // 보안 체크: 서버 도메인도 허용 (로컬테스트를 위해 필요)
      const allowedOrigins = ["http://localhost:5173", `${import.meta.env.VITE_API_URL}`];
      if (!allowedOrigins.includes(event.origin)) return;
      //메세지 타입 확인
      if (event.data.type !== "oauth2Success") return;
      
      const { accessToken, refreshToken, deviceId, user } = event.data;
      if (!accessToken || !refreshToken || !user) return;
    
      console.log("네이버 로그인 성공", user);
      syncAuth(accessToken, refreshToken, user, deviceId);

      //로그인 모달 닫기
      useAuthModalStore.getState().closeAuthModal();

      //네이버로그인 성공 메세지
      useModalStore.getState().openModal("alertModal", {
        type: "success",
        message: "On-Hz 오신 것을 환영합니다!"
      });
      window.removeEventListener("message", receiveMessage);
    };
    
    window.addEventListener("message", receiveMessage);
  };
  