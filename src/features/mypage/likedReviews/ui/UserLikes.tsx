import Rating from "@mui/material/Rating"
import { useEffect, useState } from "react";
import { fetchUserLikesData } from "../api/getUserLikedReviewsApi";
import { LikeType } from "../model/types";
import { UserLikeSecSkeleton } from "./UserLikesSkeleton";

export const UserLikeSec = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [Likes, setLikes] = useState<LikeType[] | null>(null);
    
     useEffect(() => {
       // API 호출
       const fetchData = async () => {
         const { Likes, isLoading } = await fetchUserLikesData();
         setLikes(Likes); // 데이터 저장
         setIsLoading(isLoading); // 로딩 상태 설정
       };
   
       fetchData(); // 데이터가져오기
     }, []);

    return( 
        <div className="">
            {isLoading ? (
                <UserLikeSecSkeleton />
                ) : (
                    <div className="flex flex-wrap pt-10 gap-7 hz-like-wrap">
                        {Likes?.map((like) => (
                            <div className="like-box relative w-[23%] h-[400px]">
                                <div className="like-cover rounded-lg h-[200px] w-full overflow-hidden">
                                    <img src={like.artist.avatar} alt={like.artist.name} className="object-cover w-full h-full"/>
                                </div>
                                <div className="like-text m-auto absolute bottom-0 left-1/2 translate-x-[-50%] w-[84%] rounded-lg p-5 border border-gray3 bg-white">
                                    <p className="text-gray5 text-[14px]">{like.creatTime}</p>
                                    <p className="py-2 text-gray">{like.reviewer}</p>
                                    <div>
                                    <Rating
                                        value={like.rating}
                                        precision={0.5}
                                        readOnly
                                        sx={{
                                            "& .MuiRating-iconFilled": {
                                            color: "#FFD231", // 채워진 별 색상
                                            },
                                            "& .MuiRating-iconEmpty": {
                                            color: "#a1a1a1", // 비어있는 별 색상
                                            },
                                        }}
                                        />
                                    </div>
                                    <p className="my-5 text-gray line-clamp-2 min-h-10">
                                        {like.body}
                                    </p>
                                    <button className="underline text-point">리뷰 보기</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export const UserLikes: React.FC = () => {
    return (
        <UserLikeSec />
    );
};
