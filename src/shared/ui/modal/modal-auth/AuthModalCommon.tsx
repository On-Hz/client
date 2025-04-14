import { SocialLoginButton } from "@/features/auth/social/ui/socialLoginButton";
import logo from "/public/logo_text.svg";

export function AuthCommon() {
  return (
    <div className="mb-6">
      <div className="px-8 mb-10 text-center">
        {/* 로고 영역 */}
        <img src={logo} alt="On-Hz" className="w-24 m-auto mb-1" />
      </div>
      {/* 소셜 로그인 버튼들 */}
      <div className="flex justify-center gap-2 items-center">
        <SocialLoginButton provider="naver" />
        <SocialLoginButton provider="kakao" />
        <SocialLoginButton provider="google" />
      </div>
    </div>
  );
}
