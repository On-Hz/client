import React, { useEffect, useState } from 'react';
import { ReviewCard } from '@/shared/ui/reviewCard';
import { Review } from '@/shared/model';
import { ReviewCardSkeleton } from '@/shared/ui/reviewCard';
import { fetchReview } from '../api/getReview';


const ReviewSec = () => {
    const [review, setReview] = useState<Review | null>(null);
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
                            userName={review!.user.userName}
                            userProfilePath={review!.user.profilePath}
                            content={review!.content}
                            rating={review!.rating}
                            createdAt={review!.createdAt}
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