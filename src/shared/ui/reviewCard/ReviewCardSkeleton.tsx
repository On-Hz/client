import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const ReviewCardSkeleton: React.FC = () => {
  return (
    <div className="mb-[24px] px-[24px] py-[18px] bg-white border border-gray3 rounded-[8px]">
      {/* 상단: 사용자 정보 및 버튼 자리 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <span className="w-[64px] h-[64px] rounded-[50%] overflow-hidden border border-gray3">
            <Skeleton variant="circular" width="100%" height="100%" />
          </span>
          <div className="pl-[12px]">
            <Skeleton variant="text" width={100} height={24} />
          </div>
        </div>
      </div>

      {/* 평점 영역 */}
      <div className="py-[15px]">
        <Skeleton variant="text" width={120} height={24} />
      </div>

      {/* 리뷰 텍스트 영역 */}
      <div className="min-h-[70px]">
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginTop: 8 }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={16}
          style={{ marginTop: 8 }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={16}
          style={{ marginTop: 8 }}
        />
      </div>

      {/* 좋아요 버튼 영역 */}
      <div className="pt-[15px]">
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    </div>
  );
};
