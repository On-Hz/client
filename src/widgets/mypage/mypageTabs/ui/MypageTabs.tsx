import { getNavLinkBlackClass } from "@/shared/helpers/getNavLinkBlackClass";
import { NavLink, useLocation, useParams } from "react-router-dom";


export const MypageTabs = () => {
    // const { mypageSlug } = useParams<{ mypageSlug: string }>();
    const location = useLocation();
    
    return (
        <div className="mb-10">
            <ul className="hz-tab flex items-center border-gray4 border-t border-b mt-14">
                <li>
                    <NavLink 
                    to={`/mypage/album`}
                    className={({ isActive }) => 
                        getNavLinkBlackClass(isActive || location.pathname === "/mypage")
                    }>
                        앨범
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={`/mypage/song`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        노래
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={`/mypage/artist`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        아티스트
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={`/mypage/like`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        좋아요
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
