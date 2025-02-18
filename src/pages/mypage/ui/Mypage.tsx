import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getNavLinkBlackClass } from "@/shared/helpers/getNavLinkBlackClass";
import { RoundButton } from "@/shared/ui/roundButton/RoundButton";
import { ReviewCard } from "@/shared/ui/review/Review";
import styled from "styled-components";

const ConTitle = styled.p`
    font-size:20px;
    font-weight:600;
    padding-bottom:20px;
`;
//
interface User {
    user_id: number,
    user_name: string,
    user_img?: string,
    email: string,
    password: string
}
interface ReviewItem {
    id: number;
    reviewer: string; // 리뷰어 이름
    avatar: string; // 리뷰어 아바타
    rating: number; // 별점 (0~5)
    body: string; // 리뷰 내용 (본문만)
}
//
const mockUser: User[] = [
    {
        "user_id": 1,
        "user_name": "강동원",
        "user_img":"",
        "email":"user@example.com",
        "password":"************"
    }
]
const ratingData = [
    { rating: "1★", count: 1 },
    { rating: "1.5★", count: 0 },
    { rating: "2★", count: 4 },
    { rating: "2.5★", count: 1 },
    { rating: "3★", count: 5 },
    { rating: "3.5★", count: 2 },
    { rating: "4★", count: 1 },
    { rating: "4.5★", count: 3 },
    { rating: "5★", count: 7 },
];
const mockReviews: ReviewItem[] = Array(6)
.fill(null)
.map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    body: `Review body ${
    i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
}));

//
const ProfileUi = () => {
    const user = mockUser[0];
    return (
        <div>
            <div className="flex items-center">
                <div className="pr-[24px] text-center">
                    <div className="w-[182px] h-[182px] border border-gray3 rounded-[50%] flex items-center justify-center">
                        { user.user_img ? (
                            <img src={user.user_img} alt={user.user_name} style={{width:"100%",height:"100%"}} />
                        ) : (
                            <PersonIcon style={{width:"100%",height:"100%"}} className="text-gray3"/>
                        )}
                    </div>
                    <button className="text-point text-[13px] mt-5">프로필 수정</button>
                </div>
                <div>
                    <p className="pb-[14px] text-[24px] font-semibold">{user.user_name}</p>
                    <p className="text-[14px] text-gray">{user.email}</p>
                </div>
            </div>
        </div>
    ) 
}
const RatingsUi = () => {
    return (
        <div>
            <div className="flex items-end">
                <div className="text-center">
                    <div className="text-[48px] text-yellow font-bold">3.5</div>
                    <p className="pt-[4px]">평균 평점</p>
                </div>
                <div className="mx-[42px] w-px bg-gray4 h-[100px]"></div>
                <div className="text-center">
                    <StarIcon className="text-yellow" style={{width:"60px",height:"60px"}}/>
                    <p className="pt-[4px]">내 별점</p>
                </div>
            </div>
            <div className="w-[450px] mt-6 border border-gray4 rounded-[10px] p-1">
                <div style={{ width: "100%", height: "100px"}}>

                <ResponsiveContainer>
                    <BarChart data={ratingData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis 
                            tick={{ fill: "#FFD231", fontSize: 14 }}
                            dataKey="rating" 
                            label={{ value: "", position: "insideBottom", dy: 10,}}
                            stroke="#fff"
                        />
                        {/* <Tooltip /> */}
                        <Bar dataKey="count" fill="#FFD231" barSize={50} radius={2} />
                    </BarChart>
                </ResponsiveContainer>    
                </div>               
            </div>
        </div>
    )
}
const TabMenuUi = () => {
    const { mypageSlug } = useParams<{ mypageSlug: string }>();
    return (
        <div>
            <ul className="flex items-center border-gray4 border-t border-b mt-14">
                <li>
                    <NavLink to={`/mypage/${mypageSlug}`} end
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        앨범
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/mypage/${mypageSlug}/song`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        노래
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/mypage/${mypageSlug}/artist`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        아티스트
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/mypage/${mypageSlug}/like`}
                    className={({ isActive }) => getNavLinkBlackClass(isActive)}>
                        좋아요
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
const ReviewsUi = () => {
    return (
        <div className="mt-16">
            <div className='flex justify-between pb-[20px]'>
                <ConTitle>Reviews</ConTitle>
                <RoundButton text="정렬" />
            </div>
            <div>
                {mockReviews.map((review) => (
                    <ReviewCard key={review.id} userName={review.reviewer} userImage={review.avatar} reviewText={review.body} rating={review.rating} />
                ))}
            </div>
        </div>
    )
}

export const MyPage: React.FC = () => {
    return (
       <div>
            <div className="flex justify-between items-center">
                <ProfileUi />
                <RatingsUi />
            </div>
            <div>
                <TabMenuUi />
                <Outlet /> {/*확인 중 */}
                <ReviewsUi />
            </div>
       </div>
    )
}