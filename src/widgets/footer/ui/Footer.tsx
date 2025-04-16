import { Link } from "react-router-dom";
import logo from "/public/logo_white_text.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]">
      <div className="px-[24px] py-[32px]">
        <img src={logo} alt="On-Hz" width="80px" className="mr-[15px]" />
        <div className="flex items-end">
          <Link
            to="/terms"
            className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors"
          >
            서비스 이용약관 |
          </Link>
          <Link
            to="/privacy"
            className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors"
          >
            개인정보 처리방침 |
          </Link>
          <a
            href=""
            className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors"
          >
            회사 안내
          </a>
        </div>
        <div className="flex items-end">
          <p className="text-gray5 text-[12px] mr-[4px]">고객센터 |</p>
          <a
            href="mailto:onhz.cs@gmail.com?subject=문의사항"
            className="text-gray5 text-[12px] hover:text-gray2 transition-colors"
          >
            onhz.cs@gmail.com
          </a>
        </div>
        <address className="not-italic flex items-center">
          <p className="text-gray5 text-[12px] mr-[4px]">On-Hz |</p>
          <p className="text-gray5 text-[12px] mr-[4px]">대표 웹얼라</p>
        </address>
        <p className="text-gray5 text-[12px]">사업자등록번호 : 310-23-02087</p>
        <p className="pt-[20px] text-gray5 text-[12px]">
          © 2025 by On-Hz, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
