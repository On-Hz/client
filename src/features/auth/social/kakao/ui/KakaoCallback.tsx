// src/features/auth/kakao/KakaoCallback.tsx

import { useEffect } from "react";

const KakaoCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");

    if (redirect) {
      // ✅ 백엔드 콜백 URL로 리디렉션
      window.location.href = redirect;
    } else {
      console.error("❌ redirect 파라미터가 없습니다.");
      window.close(); // 에러 시 팝업 닫기
    }
  }, []);

  return null;
};

export default KakaoCallback;
