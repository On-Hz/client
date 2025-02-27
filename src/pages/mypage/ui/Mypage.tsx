import React from "react";
import { MypageInfo } from "../info/ui/MypageInfo";
import { Outlet } from "react-router-dom";
import './style.css'

export const MyPage: React.FC = () => {
    return (
       <div id="my-page">
            <MypageInfo />
            <div>
                <Outlet />
            </div>
       </div>
    )
}
