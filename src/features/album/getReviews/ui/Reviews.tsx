import React from 'react';
import { mockReviews } from '../api/getReviews';
import { SubTitle } from '@/shared/ui/subTitle/SubTitle';
import { ReviewCard } from '@/shared/ui/reviewCard/ReviewCard';
import { RoundButton } from '@/shared/ui/roundButton/RoundButton';


const ReviewsSec = () => {
    return (
        <div>
            <div className='flex justify-between pb-[20px]'>
                <SubTitle text="Reviews"></SubTitle>
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

export const Reviews: React.FC = () => {
    return (
        <ReviewsSec />
    );
  };