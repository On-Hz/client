import React, { useEffect, useState } from 'react';
import { ReviewCard } from '@/shared/ui/reviewCard/ReviewCard';
import { ReviewItem } from '../model/types';
import { ReviewCardSkeleton } from '@/shared/ui/reviewCard/ReviewCardSkeleton';
import { fetchReview } from '../api/getReview';


const ReviewSec = () => {
    const [review, setReview] = useState<ReviewItem | null>(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            const {review, isLoading } = await fetchReview();
            setReview(review); 
            setIsLoading(isLoading); 
        };

        fetchData();
    }, []);
    
    return (
       <div>
            <div>
                {isLoading ? (
                        <ReviewCardSkeleton key="1" />
                    ) : (
                        <ReviewCard
                            key={review!.id}
                            userName={review!.reviewer}
                            userImage={review!.avatar}
                            reviewText={review!.body}
                            rating={review!.rating}
                            createTime={review!.createTime}
                            hasBorder={true}
                        />
                    )}
            </div>
        </div>
    )
}

export const ReviewDetail: React.FC = () => {
    return (
        <ReviewSec />
    );
  };