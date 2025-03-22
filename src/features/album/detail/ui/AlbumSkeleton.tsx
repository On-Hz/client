import React from 'react';
import { Skeleton } from '@mui/material';


const AlbumSecSkeleton = () => {
    return (
        <div className='w-[700px] hz-left'>
            <div className='flex items-end'>
                {/* 앨범 커버 */}
                <div className='hz-cover flex items-center justify-center rounded-[10px] w-[324px] h-[324px] overflow-hidden'>
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </div>
                 {/* 앨범, 아티스트 정보 */}
                <div className='pl-[18px] hz-ab-info'>
                    <div className='flex items-center'>
                        <span className='w-[64px] h-[64px] rounded-[50%] overflow-hidden'>
                            <Skeleton variant="circular" width={64} height={64} />
                        </span>
                        <p className='pl-[5px]'><Skeleton width="80px" /></p>
                    </div>
                    <p className='mt-[15px] mb-[17px] text-[36px] font-bold'><Skeleton width="200px" /></p>
                    <div>
                        <span className='text-[14px]'><Skeleton width="50px" /></span>
                        <span className='text-[13px] font-light flex items-center'>
                            <i className='w-[5px] h-[5px] bg-gray5 rounded-[50%] mr-[4px]'></i>
                            <Skeleton width="60px" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const AlbumSkeleton: React.FC = () => {
    return (
        <AlbumSecSkeleton />
    );
  };