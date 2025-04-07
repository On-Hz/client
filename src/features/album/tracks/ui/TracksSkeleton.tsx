import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';

const TrackItem = styled.li`
    &:hover .track-num,
    &:hover .track-title {
        color:#395EA1;
    }
`;

const TrackListSecSkeleton = () => {
    return (
        <ul className='bg-[#F5F5F5] rounded-[5px] p-[28px]'>
        {Array(7).fill(0).map((_, idx) => (
            <TrackItem key={idx} className='cursor-pointer flex items-center justify-between border-gray2 border-b p-[12px]'>
                <div className='flex items-center hz-item-left'>
                    <Skeleton width={25} height={20} className='mr-5' />
                    <Skeleton width="80%" height={20} />
                </div>
                <div className='flex items-center justify-end hz-item-info'>
                    <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                    <Skeleton width={40} height={20} />
                </div>
            </TrackItem>
        ))}
    </ul>
    )
}


export const TracksSkeleton: React.FC = () => {
    return (
        <TrackListSecSkeleton />
    );
  };