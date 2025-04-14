import { SiNaver } from "react-icons/si";
import { socialLogin } from "../api/socialLogin";
import { FcGoogle } from "react-icons/fc";

interface SocialLoginButtonProps {
  provider: "kakao" | "naver" | "google";
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider }) => {
  const handleLogin = () => socialLogin(provider);

  if (provider === "naver") {
    return (
      <button
        onClick={handleLogin}
        className="w-[60px] h-[30px] bg-green-500 text-white rounded-[4px] flex items-center justify-center"
      >
        <SiNaver size={"1rem"} />
      </button>
    );
  }
  if (provider === "kakao") {
    return (
      <button onClick={handleLogin}>
        <img src="/kakao_login_small.png" alt="kakaoLogin" />
      </button>
    );
  }
  if (provider === "google") {
    return (
      <button
        onClick={handleLogin}
        className="flex items-center justify-center w-[60px] h-[30px] bg-white border rounded-[4px] border-gray4"
      >
        <FcGoogle size={"1.6rem"} />
      </button>
    );
  }

  return null;
};
