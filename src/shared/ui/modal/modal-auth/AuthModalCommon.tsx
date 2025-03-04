import logo from "/public/logo_tmp_text.svg";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa6";

interface AuthCommonProps {
  localMode: "login" | "signup";
}

export function AuthCommon({ localMode }: AuthCommonProps) {
  return (
    <div className="mb-6">
      <div className="px-8 mb-10 text-center">
        {/* 로고 영역 */}
        <img src={logo} alt="On-Hz" className="w-24 m-auto mb-1" />
      </div>
        {/* 로그인 / 회원가입 타이틀 
          <h1 className="mb-6 text-[14px] text-gray">
            {localMode === "login" ? "로그인" : "회원가입"}
          </h1>
        */}
        {/* 소셜 로그인 버튼들 */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
            <FaTwitter size={"1.4rem"} />
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
