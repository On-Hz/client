import { kakaoLogin } from "../api/kakaoLogin";

export const KakaoLoginButton = () => {
  return (
    <button
      onClick={kakaoLogin}
      className="flex items-center justify-center"
    >
      <img src="/public/kakao_login_small.png" alt="kakaoLogin" /> {/*카카오 로그인 디자인가이드에서 제공해주는 이미지(축약형)*/}
    </button>
  );
};
