import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { mockTracks } from '../api/getFetchTracks';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styled from 'styled-components';
import { TracksSkeleton } from './TracksSkeleton';

const TrackItem = styled.li`
    &:hover .track-num,
    &:hover .track-title {
        color:#395EA1;
    }
`;

const TrackListSec = () => {

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 2초 후에 로딩 상태를 false로 변경
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <div className='w-[700px] hz-list'>
            {isLoading ? (
                    <TracksSkeleton />
                ) : (
                    <>
                    <ul className='bg-[#F5F5F5] rounded-[5px] p-[28px]'>
                        {mockTracks.map((track, idx) => (
                            <TrackItem key={track.id} 
                                className='cursor-pointer flex items-center justify-between border-gray2 border-b p-[12px]'>
                                <div className='flex items-center hz-item-left'>
                                    <span className='text-[14px] pr-5 track-num'>{idx + 1}</span>
                                    <p className='hz-track-title overflow-hidden w-[90%] whitespace-nowrap text-ellipsis'> dddddddddfsldfjdslfjdslfjldskjflsdjflsdjldfs{track.title} </p>
                                </div>
                                <div className='flex items-center justify-end w-[150px] hz-item-info'>
                                    <button> <PlayCircleIcon /> </button>
                                    <div className='pl-10'>
                                        <StarIcon className='text-yellow' style={{width:'18px',height:'18px'}} />
                                        <span className='text-gray text-[14px]'> {track.rating} / 5</span>
                                    </div>
                                </div>
                            </TrackItem>
                        ))}
                    </ul>                        
                    </>
                )
            }
        </div>
    )
}


export const Tracks: React.FC = () => {
    return (
        <TrackListSec />
    );
  };