import { Link } from "react-router-dom";
import logo from "/public/logo_tmp_text.svg";
// import SearchIcon from "@mui/icons-material/Search";
import { useAuthModalStore } from "@/shared/stores";
import "../header/ui/style.css";

export const Header: React.FC = () => {
  const { openAuthModal } = useAuthModalStore();

  return (
    <header className="border-b border-gray3 hz-header">
      <div className="flex items-center justify-between px-[20px] py-5">
        <Link to="/">
          <img src={logo} alt="On-Hz" className="w-[80px]"/>
        </Link>
        <nav className="flex items-center">
          <div className="mr-[24px] px-[12px] bg-gray2 rounded-[5px] w-[360px] h-[40px] text-[14px] flex items-center">
            <input
              className="w-full h-full bg-transparent"
              type="text"
              placeholder="검색어를 입력해주세요."
            />
            <button>{/* <SearchIcon /> */}</button>
          </div>
          <button
            className="text-black py-[10px] px-[12px] mr-[5px] text-[14px] transform hover:text-point transition-colors"
            onClick={() => openAuthModal("login")}
          >
            로그인
          </button>
          <button
            className="bg-black text-white border rounded-[5px] text-[14px] py-[10px] px-[12px] transform hover:bg-point transition-colors"
            onClick={() => openAuthModal("signup")}
          >
            회원가입
          </button>
        </nav>
      </div>
    </header>
  );
};
