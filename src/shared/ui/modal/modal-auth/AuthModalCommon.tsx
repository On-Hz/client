import logo from "/public/logo_text.svg";
import { FcGoogle } from "react-icons/fc";
import { NaverLoginButton } from "@/features/auth/social/naver/ui/NaverLoginButton";
import { KakaoLoginButton } from "@/features/auth/social/kakao/ui/KakaoLoginButton";

export function AuthCommon() {
  return (
    <div className="mb-6">
      <div className="px-8 mb-10 text-center">
        {/* 로고 영역 */}
        <img src={logo} alt="On-Hz" className="w-24 m-auto mb-1" />
      </div>
      {/* 소셜 로그인 버튼들 */}
      <div className="flex justify-center gap-2 items-center">
        <NaverLoginButton />
        <KakaoLoginButton />
        <button className="flex items-center justify-center w-[60px] h-[30px] bg-white border rounded-[4px] border-gray4">
          <FcGoogle size={"1.6rem"} />
        </button>
      </div>
    </div>
  );
}
