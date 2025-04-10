import { SiNaver } from "react-icons/si";
import { naverLogin } from "../api/naverLogin";

export const NaverLoginButton = () => {
  return (
    <button
      onClick={naverLogin}
      className="flex items-center justify-center w-[60px] h-[30px] text-white bg-green-500 rounded-[4px]"
    >
      <SiNaver size={"1rem"} />
    </button>
  );
};
