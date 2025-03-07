import { useModalStore } from '@/shared/stores';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import { MypageUserInfoSkeleton } from './MypageUserInfoSkeleton';
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { mockUser } from '@/features/mypage/getUserProfile/api/getUser';
import { ratingData } from '@/features/mypage/getUserRating/api/getRating';
import { MypageTabs } from '../../mypageTabs';
import { useEffect, useState } from 'react';

export const MypageUserInfo = () => {
    const { openModal } = useModalStore();
    const user = mockUser[0];
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 2초 후에 로딩 상태 변경
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <div>
            {isLoading ? (
                <MypageUserInfoSkeleton />
            ) : (
                <div className="flex justify-between items-center hz-top">
                    <div className="flex items-center">
                        <div className="pr-[24px] text-center">
                            <div className="hz-user-img w-[182px] h-[182px] border border-gray3 rounded-[50%] flex items-center justify-center">
                                {user.user_img ? (
                                    <img src={user.user_img} alt={user.user_name} style={{ width: "100%", height: "100%" }} />
                                ) : (
                                    <PersonIcon style={{ width: "100%", height: "100%" }} className="text-gray3" />
                                )}
                            </div>
                            <button 
                                className="text-point text-[13px] mt-5"
                                onClick={() => openModal("profileModal")}>
                                프로필 수정
                            </button>
                        </div>
                        <div>
                            <p className="pb-[14px] text-[24px] font-semibold">{user.user_name}</p>
                            <p className="text-[14px] text-gray">{user.email}</p>
                        </div>
                    </div>
                    <div className="hz-ratings">
                        <div className="flex items-end">
                            <div className="text-center">
                                <div className="hz-ra-text text-[48px] text-yellow font-bold">3.5</div>
                                <p className="pt-[4px]">평균 평점</p>
                            </div>
                            <div className="mx-[42px] w-px bg-gray4 h-[100px]"></div>
                            <div className="text-center">
                                <StarIcon className="text-yellow hz-star-icon" style={{ width: "60px", height: "60px" }} />
                                <p className="pt-[4px]">내 별점</p>
                            </div>
                        </div>
                        <div className="hz-ra-box w-[450px] mt-6 border border-gray4 rounded-[10px] p-1">
                            <div style={{ width: "100%", height: "100px" }}>
                                <ResponsiveContainer>
                                    <BarChart data={ratingData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <XAxis
                                            tick={{ fill: "#FFD231", fontSize: 14 }}
                                            dataKey="rating"
                                            label={{ value: "", position: "insideBottom", dy: 10 }}
                                            stroke="#fff"
                                        />
                                        <Bar dataKey="count" fill="#FFD231" barSize={50} radius={2} />
                                    </BarChart>
                                </ResponsiveContainer>    
                            </div>
                        </div>
                    </div>
                </div>
           )}
        <MypageTabs />
        </div>
    );
};
