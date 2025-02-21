import logo from "/public/logo_tmp_text_white.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]">
      <div className="px-[24px] py-[32px]">
      <img src={logo} alt="On-Hz" width="80px" className="mr-[15px]"/>
        <div className="flex items-end">
          <a href="" className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors">서비스 이용약관 | </a>
          <a href="" className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors" > 개인정보 처리방침 | </a>
          <a href="" className="text-gray5 text-[12px] mr-[4px] transform hover:text-gray2 transition-colors"> 회사 안내</a>
        </div>
        <address className="not-italic pt-[50px] flex items-center">
            <p className="text-gray5 text-[12px] mr-[4px]">On-Hz |</p>
            <p className="text-gray5 text-[12px] mr-[4px]">대표 웹얼라 </p>
        </address>
        <p className="pt-[20px] text-gray5 text-[12px]">© 2025 by On-Hz, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
