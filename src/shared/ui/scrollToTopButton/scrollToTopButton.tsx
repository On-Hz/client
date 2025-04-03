import React, { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  //모션
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 w-10 h-10 overflow-hidden border-2 border-black rounded-full bg-white shadow-lg z-50 hover:border-point transition-colors hover:text-point"
        aria-label="Scroll to top"
      >
        <ExpandLessIcon 
            sx={{
                fontSize: "30px"
            }}
        />
      </button>
    )
  );
};
