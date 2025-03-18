import React from "react";
import { SiNaver } from "react-icons/si";
import { naverLogin } from "../api/naverLogin";

export const NaverLoginButton = () => {
  return (
    <button
      onClick={naverLogin}
      className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full"
    >
      <SiNaver size={"1rem"} />
    </button>
  );
};
