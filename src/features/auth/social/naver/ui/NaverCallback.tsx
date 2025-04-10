import { useEffect } from "react";

const NaverCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");

    // console.log('re',redirect);
    if (redirect) {
      // 백엔드 콜백 URL로 이동
      window.location.href = redirect;
    } else {
      console.log('에러',redirect)
      window.close(); // 에러 처리
    }
  }, []);

  return null;
};

export default NaverCallback;
