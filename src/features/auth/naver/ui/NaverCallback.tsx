import { useEffect } from "react";

const NaverCallback = () => {
  useEffect(() => {
    // 현재 URL에서 `code`와 `state` 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (!code || !state) {
      console.error("네이버 로그인 code 또는 state 없음");
      window.close();
      return;
    }

    console.log("백엔드에 네이버 OAuth 요청 시작:", code, state);

    //프론트는 네이버에서 받은 `code`를 백엔드로 전달
    fetch(`${import.meta.env.VITE_API_URL}/login/oauth2/code/naver?code=${code}&state=${state}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드에서 받은 JWT:", data);

        if (window.opener) {
          window.opener.postMessage(data, window.location.origin);
          window.close();
        }
      })
      .catch((error) => {
        console.error("네이버 로그인 실패:", error);
        window.close();
      });
  }, []);

  return null;
};

export default NaverCallback;
