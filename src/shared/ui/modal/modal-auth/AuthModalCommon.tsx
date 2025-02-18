import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "/public/logo_tmp_text.svg";

export function AuthCommon() {
  return (
    <div className="mb-6 text-center">
      {/* 로고 영역 */}
      <img src={logo} alt="On-Hz" className="w-24 h-24 mx-auto mb-4" />
      {/* 소셜 로그인 버튼들 */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600">
          <TwitterIcon fontSize="small" />
        </button>
        <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600">
          <GoogleIcon fontSize="small" />
        </button>
        <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-blue-700 rounded-full hover:bg-blue-800">
          <FacebookIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
