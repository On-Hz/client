import React from 'react';
import { Skeleton } from '@mui/material';


const InformationSecSkeleton = () => {
    return (
        <div>
            <ul className='border border-gray4 rounded-[10px] p-[10px]'>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex'>
                    <span className='text-gray5 pr-[10px]'>발매일</span>
                    <Skeleton width="80px" height="20px" />
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex'>
                    <span className='text-gray5 pr-[10px]'>아티스트</span>
                    <Skeleton width="80px" height="20px" />
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex'>
                    <span className='text-gray5 pr-[10px]'>장르</span>
                    <Skeleton width="80px" height="20px" />
                </li>
                <li className='py-[14px] text-[14px] flex'>
                    <span className='text-gray5 pr-[10px]'>길이</span>
                    <Skeleton width="80px" height="20px" />
                </li>
            </ul>
        </div>
    )
}
export const AlbumInfoSkeleton: React.FC = () => {
    return (
        <InformationSecSkeleton />
    );
  };