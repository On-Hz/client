import React from 'react';
import { Button } from '@/shared/ui';
import { Skeleton } from '@mui/material';


const RatingSecSkeleton = () => {

    return (
        <div className='flex-1 min-w-0 pl-[30px] hz-right'>
            <ul className='flex items-center justify-center border border-gray4 rounded-[10px] gap-10 py-[40px]'>
                <li className='text-center'>
                    <Skeleton variant="text" width={80} height={30} className='m-auto'/>
                    <span className="hz-rating-text text-gray text-[14px]">총 별점 수</span>
                </li>
                <li className='text-center'>
                    <Skeleton variant="text" width={80} height={30} className='m-auto'/>
                    <span className="hz-rating-text  text-gray text-[14px]">평균 별점</span>
                </li>
                <li className='text-center'>
                    <Skeleton variant="text" width={80} height={30} className='m-auto'/>
                    <span className="hz-rating-text  text-gray text-[14px]">내 별점</span>
                </li>
            </ul>
            <div className='flex justify-end mt-[18px]'>
                <Button
                    text="리뷰 작성"
                />
            </div>
        </div>
    )
}


export const RatingsSkeleton: React.FC = () => {
    return (
        <RatingSecSkeleton />
    );
  };