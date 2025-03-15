import Rating from "@mui/material/Rating"
import { useEffect, useState } from "react";
import { fetchUserLikesData } from "../api/getUserLikes";
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
                    <div className="flex gap-7 pt-10 flex-wrap hz-like-wrap">
                        {Likes?.map((like, idx) => (
                            <div className="like-box relative w-[23%] h-[400px]">
                                <div className="like-cover rounded-lg h-[200px] w-full overflow-hidden">
                                    <img src={like.artist.avatar} alt={like.artist.name} className="w-full h-full object-cover"/>
                                </div>
                                <div className="like-text m-auto absolute bottom-0 left-1/2 translate-x-[-50%] w-[84%] rounded-lg p-5 border border-gray3 bg-white">
                                    <p className="text-gray5 text-[14px]">{like.creatTime}</p>
                                    <p className="text-gray py-2">{like.reviewer}</p>
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
                                    <p className="text-gray line-clamp-2 my-5 min-h-10">
                                        {like.body}
                                    </p>
                                    <button className="text-point underline">리뷰 보기</button>
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
