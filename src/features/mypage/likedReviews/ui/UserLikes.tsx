import Rating from "@mui/material/Rating"
import { useEffect } from "react";
import { UserLikeSecSkeleton } from "./UserLikesSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { ORDER_BY } from "@/shared/constants";
import { Review } from "@/shared/model";
import { useUserLikeReviews } from "../api/getUserLikedReviewsApi";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { useInView } from "react-intersection-observer";
import { formatDate } from "@/shared/helpers";
import AlbumSharpIcon from '@mui/icons-material/AlbumSharp';

export const UserLikeSec = () => {
    const { userId } = useParams<{ userId: string }>() as { userId: string };
    const navigate = useNavigate(); 
    const infiniteMode = true;

    const regularQuery = useUserLikeReviews(userId, {
        enabled: !infiniteMode
    });

    const infiniteQuery = useInfiniteScrollQuery<Review>({
        endpoint: `/api/v1/users/${userId}/likes`,
        limit: 10,
        orderBy: ORDER_BY.CREATED_AT_DESC,
        enabled: infiniteMode,
        queryKeyPrefix: "user_like_review",
    });

    const likeReviews = infiniteMode
        ? infiniteQuery.data?.pages.flat() ?? []
        : regularQuery.data ?? [];

    const isLoading = infiniteMode
        ? infiniteQuery.isLoading
        : regularQuery.isLoading;

    const { ref, inView } = useInView({ threshold: 0 });
    
    useEffect(() => {
        if (
        infiniteMode &&
        inView &&
        infiniteQuery.hasNextPage &&
        !infiniteQuery.isFetchingNextPage
        ) {
        infiniteQuery.fetchNextPage();
        }
    }, [inView, infiniteMode, infiniteQuery]);  
    
    return( 
        <div className="">
            {isLoading ? (
                <UserLikeSecSkeleton />
                ) : likeReviews.length === 0 ? (
                    <p className="py-28 text-center">좋아요한 항목이 없습니다.</p>
                ) : (
                    <div className="flex flex-wrap pt-10 gap-7 hz-like-wrap">
                        {likeReviews?.map((like) => (
                            <div className="like-box relative w-[23%] h-[400px]" key={like.id}>
                                <div className="like-cover rounded-lg relative h-[200px] w-full overflow-hidden">
                                    <span className="absolute top-2 left-2 z-40 p-2 bg-white text-sm border border-transparent rounded-lg">{like.reviewType}</span>
                                    {like.entityFilePath ? (
                                        <img src={like.entityFilePath} alt={like.reviewType} className="object-cover w-full h-full"/>
                                    ) : (
                                        <div className="w-full h-full bg-black">
                                            <AlbumSharpIcon sx={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'block',
                                                objectFit: 'cover',
                                                color: '#a1a1a1',
                                            }}/>
                                        </div>
                                    )}
                                </div>
                                <div className="like-text m-auto absolute bottom-0 left-1/2 translate-x-[-50%] w-[84%] rounded-lg p-5 border border-gray3 bg-white">
                                    <p className="text-gray5 text-[14px]">{formatDate(like.createdAt || "")}</p>
                                    <p className="py-2 text-gray">{like.entityName}</p>
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
                                        {like.content}
                                    </p>
                                    <button 
                                        className="underline text-black hover:text-point"
                                        onClick={() => navigate(`/review/${like.id}`)}
                                    >리뷰 보기</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {infiniteMode && infiniteQuery.hasNextPage && (
                <div ref={ref} style={{ height: "1px" }} />
            )}
        </div>
    )
}

export const UserLikes: React.FC = () => {
    return (
        <UserLikeSec />
    );
};
