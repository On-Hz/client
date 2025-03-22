import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const MypageUserInfoSkeleton = () => {
    return (
        <div>
            <div className="flex justify-between items-center hz-top">
                <div className="flex items-center">
                    <div className="pr-[24px] text-center">
                        <Skeleton variant="circular" width={182} height={182} />
                        <button className="text-point text-[13px] mt-5">
                            프로필 수정
                        </button>
                    </div>
                    <div>
                        <Skeleton width={150} height={24} />  {/* 사용자 이름 스켈레톤 */}
                        <Skeleton width={200} height={20} />  {/* 이메일 스켈레톤 */}
                    </div>
                </div>
                <div className="hz-ratings">
                    <div className="flex items-end">
                        <div className="text-center">
                            <Skeleton variant="circular" width={60} height={60} />
                            <p className="pt-[4px]">평균 평점</p>
                        </div>
                        <div className="mx-[42px] w-px bg-gray4 h-[100px]"></div>
                        <div className="text-center">
                            <Skeleton variant="circular" width={60} height={60} />
                            <p className="pt-[4px]">내 별점</p>
                        </div>
                    </div>
                    <div className="hz-ra-box w-[450px] mt-6 border border-gray4 rounded-[10px] p-1">
                        <div style={{ width: "100%", height: "100px"}}>
                        <Skeleton variant="rectangular" width="100%" height={100} />
                        </div>               
                    </div>
                </div>
            </div>
        </div>
    ) 
}