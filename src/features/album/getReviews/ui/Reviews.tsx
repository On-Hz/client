import React, { useEffect, useState } from 'react';
import { mockReviews } from '../api/getReviews';
import { ReviewCard, ReviewCardSkeleton, RoundButton, SubTitle } from '@/shared/ui';
import { Review } from '@/shared/model';


const ReviewsSec = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    
    // 비동기 데이터 로딩
    useEffect(() => {
        const loadReviews = async () => {

        await new Promise(resolve => setTimeout(resolve, 1500)); // 2초 대기
        setReviews(mockReviews);
        setIsLoading(false); 
        };
    
        loadReviews();
    }, []);
    
    return (
        <div>
            <div className='flex justify-between pb-[20px]'>
                <SubTitle text="리뷰"></SubTitle>
                <RoundButton text="정렬" />
            </div>
            <div>
                {isLoading
                    ? Array.from({ length: mockReviews.length }).map((_, index) => (
                        <ReviewCardSkeleton key={`skeleton-${index}`} />
                        ))
                    : reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            userName={review.user.userName}
                            userProfilePath={review.user.profilePath}
                            content={review.content}
                            rating={review.rating}
                        />
                    ))}
            </div>
        </div>
    )
}

export const Reviews: React.FC = () => {
    return (
        <ReviewsSec />
    );
  };