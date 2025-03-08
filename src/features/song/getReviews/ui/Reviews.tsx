import React, { useEffect, useState } from 'react';
import { mockReviews } from '../api/getFetchReviews';
import { SubTitle } from '@/shared/ui/subTitle/SubTitle';
import { ReviewCard } from '@/shared/ui/reviewCard/ReviewCard';
import { RoundButton } from '@/shared/ui/roundButton/RoundButton';
import { ReviewItem } from '../model/types';
import { ReviewCardSkeleton } from '@/shared/ui/reviewCard/ReviewCardSkeleton';


const ReviewsSec = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<ReviewItem[]>([]);

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
                <SubTitle text="Reviews"></SubTitle>
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
                            userName={review.reviewer}
                            userImage={review.avatar}
                            reviewText={review.body}
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