import { SocialLoginButton } from "@/features/auth/social/ui/socialLoginButton";
import logo from "/public/logo_text.svg";

interface AuthCommonProps {
  showSocial?: boolean;
}

export function AuthCommon({ showSocial = true }: AuthCommonProps) {
  return (
    <div className="mb-6">
      <div className="px-8 mb-10 text-center">
        {/* 로고 영역 */}
        <img src={logo} alt="On-Hz" className="w-24 m-auto mb-1" />
      </div>

      {/* 소셜 로그인 버튼은 조건부 렌더링 (로그인, 회원가입만) */}
      {showSocial && (
        <div className="flex justify-center gap-2 items-center">
          <SocialLoginButton provider="naver" />
          <SocialLoginButton provider="kakao" />
          <SocialLoginButton provider="google" />
        </div>
      )}
    </div>
  );
}
