import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface ReviewContentProps {
  content: string;
  hasEllipsis?: boolean;
  isDetailPage?: boolean;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ content, hasEllipsis, isDetailPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = content.length > 270; //기본 270
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex items-start">
        <div
            className={
            hasEllipsis
                ? "overflow-hidden line-clamp-4 h-[95px] review-text-box whitespace-pre-wrap flex-1"
                : `min-h-[70px] whitespace-pre-wrap review-text-box flex-1 max-800:min-h-[60px] ${
                    hasMore && !isExpanded && !isDetailPage ? "overflow-hidden line-clamp-3" : ""
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
