import { useEffect } from "react";

const OAuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");

    if (redirect) {
      window.location.href = redirect;
    } else {
      console.error("redirect 파라미터가 없습니다.");
      window.close();
    }
  }, []);

  return null;
};

export default OAuthCallback;
