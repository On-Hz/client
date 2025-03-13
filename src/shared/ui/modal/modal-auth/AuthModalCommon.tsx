import logo from "/public/logo_text.svg";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

export function AuthCommon() {
  return (
    <div className="mb-6">
      <div className="px-8 mb-10 text-center">
        {/* 로고 영역 */}
        <img src={logo} alt="On-Hz" className="w-24 m-auto mb-1" />
      </div>
      {/* 소셜 로그인 버튼들 */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full">
          <SiNaver size={"1rem"} />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow text-amber-950">
          <RiKakaoTalkFill size={"1.8rem"} />
        </button>
        <button className="flex items-center justify-center w-8 h-8 bg-white border rounded-full border-gray4">
          <FcGoogle size={"1.6rem"} />
        </button>
      </div>
    </div>
  );
}
