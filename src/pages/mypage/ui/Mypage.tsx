import React, { useEffect } from "react";
import { MypageInfo } from "../info/ui/MypageInfo";
import { Outlet, useNavigate } from "react-router-dom";
import './style.css'
import { useAuthStore } from "@/shared/stores/authStore";

export const MyPage: React.FC = () => {
    const { user } = useAuthStore(); //로그인한 사용자 정보 가져오기
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate(`/mypage/${user.id}`, { replace: true }); //사용자꺼
      }
    }, [user, navigate]);
    return (
       <div id="my-page">
            <MypageInfo />
            <div>
                <Outlet />
            </div>
       </div>
    )
}
