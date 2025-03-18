
export const naverLogin = () => {
  //   const setAuth = useAuthStore((state) => state.setAuth);

  const width = 800;
  const height = 800;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  // const naverApi = "http://220.116.96.179:9000/oauth2/authorization/naver";
  const naverUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`;

  const popup = window.open(
      naverUrl, 
      "Naver Login",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,noopener,noreferrer`
  );

  console.log("네이버 로그인 요청 URL 1.:", `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`);
  console.log("네이버 로그인 요청 URL 2.:", naverUrl);

  // popup을 사용하여 오류 방지
  if (!popup || popup.closed || typeof popup.closed === "undefined") {
      console.log("팝업이 차단 ? ");
  } else {
      popup.focus();
  }
  
  // const receiveMessage = (event: MessageEvent) => {
  //   if (event.origin !== window.location.origin) return;

  //   const { accessToken, user } = event.data;
  //   if (accessToken && user) {
  //     console.log("네이버 로그인 성공! JWT:", accessToken);

  //     // ✅ JWT & 유저 정보 저장
  //     setAuth(accessToken, user);
  //   }

  //   window.removeEventListener("message", receiveMessage);
  // };

  // window.addEventListener("message", receiveMessage);
};
