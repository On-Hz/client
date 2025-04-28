import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface ReviewContentProps {
  content: string;
  hasEllipsis?: boolean;
  isDetailPage?: boolean;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ content, hasEllipsis, isDetailPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const updateHasMore = () => {
      const width = window.innerWidth;
      let limit = 400;

      if (width < 600) { //모바일
        limit = 60;
      } else if (width >= 600 && width < 800) { //모바일 ~ 태블릿
        limit = 150;
      } else if (width >= 800 && width < 1200) {//태블릿
        limit = 200;
      } else {//피시
        limit = 400;
      }

      setHasMore(content.length > limit);
    };

    updateHasMore(); // 초기 체크
    window.addEventListener("resize", updateHasMore); // 브라우저 크기 반응형 

    return () => {
      window.removeEventListener("resize", updateHasMore);
    };
  }, [content]);

  return (
    <div className="flex items-start">
        <div
            className={
            hasEllipsis
                ? "overflow-hidden line-clamp-4 h-[95px] review-text-box whitespace-pre-wrap flex-1"
                : ` max-h-[50px] whitespace-pre-wrap review-text-box flex-1 max-800:max-h-[40px] ${
                    hasMore && !isExpanded && !isDetailPage ? "overflow-hidden min-h-0" : "max-h-none max-800:max-h-none"
                }`
            }
        >
            {content}
        </div>
        <div className="text-right">
            {/* hasEllipsis가 false일 때만 더보기 버튼 */}
            {!hasEllipsis && hasMore && !isDetailPage  && (
                <button
                    className="text-point text-sm hover:underline"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleExpand();
                    }}
                    >
                    {isExpanded ? <ArrowDropUpIcon sx={{fontSize: "40px",color:"#000"}}/> : <ArrowDropDownIcon sx={{fontSize: "40px",color:"#000"}}/>}
                </button>
            )}
        </div>
    </div>
  );
};
